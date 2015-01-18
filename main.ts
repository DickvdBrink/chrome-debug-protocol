import http = require("http");
import WebSocket = require("ws");
import util = require("util");
import event = require("events");
var protocol = require("./protocol.json");

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
        private ws: WebSocket;

        private callbackId: number = 0;
        private callbacks: { [id: string]: Function; } = {};

        constructor(websocketUrl: string) {
            super();
            this.addProtocol();
            var ws = this.ws = new WebSocket(websocketUrl);
            ws.on("message", this.messageRecieved);
            ws.on("error", (error) => {
                console.log("Error: " + error);
                this.emit("error", error);
            });
        }

        public close() {
            this.ws.close();
        }

        public send(method: string, params: any[], callback: Function) {
            if (this.ws.readyState == WebSocket.CONNECTING) {
                this.ws.on("open",() => {
                    this.sendInternal(method, params, callback);
                });
            } else {
                this.sendInternal(method, params, callback);
            }
        }

        private sendInternal(method: string, params: any[], callback: Function) {
            console.log("Send command: " + method);
            // TODO: parameters
            this.ws.send(JSON.stringify({ method: method, id: this.callbackId }));
            this.callbacks[this.callbackId] = callback;
            this.callbackId++;
        }

        private messageRecieved = (data: any, flags: any) => {
            console.log(data);
            var obj = JSON.parse(data);
            if (typeof obj.id !== "undefined") {
                // When an id is present, this means it is the return value from a method
                var cb = this.callbacks[obj.id];
                if (cb) {
                    cb();
                    delete this.callbacks[this.callbackId];
                }
            } else {
                // This is an event
                this.emit(obj.method);
            }
        }

        private addProtocol() {
            var domains = protocol.domains;
            for (var i = 0; i < domains.length; i++) {
                var domain = domains[i];
                var domainObject = this[domain.domain] = <any>{};
                domainObject.on = function () {
                    this.on.apply(this, arguments);
                };
                var commands: any[] = domain.commands;
                if (commands && commands.length > 0) {
                    for (var j = 0; j < commands.length; j++) {
                        this.implementCommand(domain, domainObject, commands[j]);
                    }
                }
            }
        }

        private implementCommand(domain: any, object: Object, command: any) {
            object[command.name] = () => {
                var args: any[] = Array.prototype.slice.call(arguments);
                var callback: Function;
                if (args.length > 0 && typeof args[args.length - 1] == "function") {
                    callback = args.splice(args.length - 1)[0];
                }
                this.send(`${domain.domain}.${command.name}`, args, callback);
            };
        }
    }
}

export = Chrome;
