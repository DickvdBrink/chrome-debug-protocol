var chrome = require("chrome-debug-protocol");

chrome.getTabs("http://localhost:9222/json", function (tabs) {
    var chromeTab = chrome.createDebugger(tabs[0]);
    chromeTab.Console.enable(function () {
        console.log("Enabled");
    });
    chromeTab.Console.on("messageAdded", function (m) {
        console.log(m.message.source);
    });
    chromeTab.on("Console.messageAdded", function (m) {
        console.log(m.message.source);
    });
});
