import chrome = require("chrome-debug-protocol");
import main = require("../main");

main.getTabs("http://localhost:9444/json",(tabs) => {
    var chromeTab: chrome.ChromeDebugger = <any>main.createDebugger(tabs[0]);
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
