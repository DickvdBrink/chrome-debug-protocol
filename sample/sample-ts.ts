/// <reference path="../Scripts/typings/chrome-debug-protocol/chrome-debug-protocol.d.ts" />

import chrome = require("chrome-debug-protocol");

chrome.getTabs("http://localhost:9222/json",(tabs) => {
    var chromeTab: chrome.ChromeDebugger = chrome.createDebugger(tabs[0]);
    chromeTab.Console.enable(() => {
        console.log("Enabled");
    });
    chromeTab.Console.on("messageAdded",(m: chrome.Console.IMessageAddedEvent) => {
        console.log(m.message.source);
    });
    chromeTab.on("Console.messageAdded",(m: chrome.Console.IMessageAddedEvent) => {
        console.log(m.message.source);
    });
});
