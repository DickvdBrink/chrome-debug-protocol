/// <reference path="../Scripts/typings/chrome-debug-protocol/chrome-debug-protocol.d.ts" />
/// <reference path="../Scripts/typings/node/node.d.ts" />
/// <reference path="mocha.d.ts" />

import chrome = require("chrome-debug-protocol");
import main = require("../main");
import assert = require("assert");

import child_process = require("child_process");
var chromeProcess = child_process.spawn("chrome", ["--remote-debugging-port=9222"]);

describe("chrome", function () {
    var tab: chrome.ChromeDebugger;
    describe("#getTabs()", function () {
        it("should return an array of tabs", function (done) {
            main.getTabs("http://localhost:9222/json",(tabs) => {
                assert.equal(1, tabs.length);
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
