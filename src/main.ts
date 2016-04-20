import * as http from 'http';
import * as WebSocket from "ws";
import * as util from "util";
import * as event from "events";

const protocol = require("./protocol.json");

module Chrome {
    export interface ChromeTab {
        description: string;
        devtoolsFrontendUrl: string;
        id: string;
        title: string;
        type: string;
        url: string;
        webSocketDebuggerUrl: string;
    }

    export interface ChromeCallBack<T> {
        (result: T, error: ChromeError ): void;
    }

    export interface ChromeError {
        code: number;
        message: string;
    }

    export function createDebugger(tab: string|ChromeTab) {
        if (typeof tab === "string") {
            return new Chrome.ChromeDebugger(tab);
        } else {
            return new Chrome.ChromeDebugger(tab.webSocketDebuggerUrl);
        }
    }

    export function getTabs(options, callback: (tabs: ChromeTab[]) => void) {
        var req = http.request(options, function (res) {
            var body = "";
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                callback(JSON.parse(body));
            });
        });
        req.end();
    }

    export class ChromeDebugger extends event.EventEmitter {
        private webSocket: WebSocket;

        private callbackId: number = 0;
        private callbacks: { [id: string]: Function; } = {};

        constructor(websocketUrl: string) {
            super();
            this.addProtocol();
            var webSocket = this.webSocket = new WebSocket(websocketUrl);
            webSocket.on("message", this.messageRecieved);
            webSocket.on("error", (error) => {
                this.emit("error", error);
            });
        }

        public close() {
            this.webSocket.close();
        }

        public send<T>(method: string, params: any, callback: ChromeCallBack<T>) {
            if (this.webSocket.readyState == WebSocket.CONNECTING) {
                this.webSocket.on("open",() => {
                    this.sendInternal(method, params, callback);
                });
            } else {
                this.sendInternal(method, params, callback);
            }
        }

        private sendInternal<T>(method: string, params: any, callback: ChromeCallBack<T>) {
            this.webSocket.send(JSON.stringify({ method, params, id: this.callbackId }));
            this.callbacks[this.callbackId] = callback;
            this.callbackId++;
        }

        private messageRecieved = (data: any, flags: any) => {
            var obj = JSON.parse(data);
            if (typeof obj.id !== "undefined") {
                // When an id is present, this means it is the return value from a method
                var cb = this.callbacks[obj.id];
                if (cb) {
                    if (obj.error) {
                        cb(null, obj.error);
                    } else {
                        cb(obj.result, null);
                    }
                    delete this.callbacks[this.callbackId];
                }
            } else {
                // This is an event
                this.emit(obj.method, obj.params);
            }
        }

        private addProtocol() {
            const domains = protocol.domains;
            for (const domain of domains) {
                const domainObject = this[domain.domain] = <any>{};
                domainObject.on = (event: string, args: any) => {
                    this.on.call(this, `${domain.domain}.${event}`, args);
                };
                const commands: any[] = domain.commands;
                if (commands && commands.length > 0) {
                    for (const command of commands) {
                        this.implementCommand(domain, domainObject, command);
                    }
                }
            }
        }

        private implementCommand(domain: any, object: Object, command: any) {
            const that = this;
            object[command.name] = function (args: Object) {
                let callback: ChromeCallBack<any>;
                if (arguments.length == 1 && typeof arguments[0] == "function") {
                    callback = arguments[0];
                    args = null;
                } else {
                    callback = arguments[1];
                }
                that.send(`${domain.domain}.${command.name}`, args, callback);
            };
        }
    }
}

export = Chrome;
