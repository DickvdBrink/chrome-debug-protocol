/// <reference path="../typings/chrome-debug-protocol/chrome-debug-protocol.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="mocha.d.ts" />

import * as chrome from "chrome-debug-protocol";
import * as main from "../src/main";
import  * as assert from "assert";
import  * as child_process from "child_process";

describe("chrome", function () {
    before((done) => {
        var chromeProcess = child_process.spawn(process.env.CHROME_BIN, ["--no-sandbox", "--remote-debugging-port=9222", "about:blank"]);
        setTimeout(() => done(), 1500);
    });

    var tab: chrome.ChromeDebugger;
    describe("#getTabs()", function () {
        it("should return an array of tabs", function (done) {
            main.getTabs("http://localhost:9222/json",(tabs) => {
                assert.ok(Array.isArray(tabs), "Tabs is an array");
                // On startup, chromes show an extra tab for google_now
                assert.ok(tabs.length >= 1, "Found tabs");
                tab = <any>main.createDebugger(tabs[0]);
                done();
            });
        });
    });
    describe("#navigate()", function () {
        it("should navigate to the page", function (done) {
            tab.Page.navigate({ url: "http://localhost:9955/test.html" },() => {
                done();
            });
        });
    });
    describe("Console Events", function () {
        it("should enable Console events", function (done) {
            tab.Console.enable(() => done());
        });
        it("should register messageAdded event", function (done) {
            tab.Console.on("messageAdded",(evt: chrome.Console.IMessageAddedEvent) => {
                assert.equal("Message from JS", evt.message.text);
                done();
            });
            tab.Page.navigate({ url: "http://localhost:9955/test2.html" });
        });
    });
});
