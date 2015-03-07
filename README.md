[![Build Status](https://travis-ci.org/DickvdBrink/chrome-debug-protocol.svg?branch=master)](https://travis-ci.org/DickvdBrink/chrome-debug-protocol)
[![npm version](https://badge.fury.io/js/chrome-debug-protocol.svg)](http://badge.fury.io/js/chrome-debug-protocol)

# chrome-debug-protocol

This module helps executing commands and listening to events emitted by the chrome debugger-protocol.
More information about this protocol can be found on this page: [debugger-protocol](https://developer.chrome.com/devtools/docs/debugger-protocol)

## Install

> npm install chrome-debug-protocol

## Getting Started

First of all, for this to works, the Chrome browsers needs to be started with the `--remote-debugging-port` parameter. For example:

>chrome.exe --remote-debugging-port=9222

Below are some code samples for consuming the library with JavaScript and TypeScript. For a more complete documentation look at the [TypeScript definition](/Scripts/typings/chrome-debug-protocol/chrome-debug-protocol.d.ts) or the [protocol.json](/protocol.json). 

**JavaScript**

```JavaScript
var chrome = require("chrome-debug-protocol");

chrome.getTabs("http://localhost:9222/json",(tabs) => {
    var chromeTab = main.createDebugger(tabs[0]);
    chromeTab.Console.enable(() => {
        console.log("Enabled");
    });
    chromeTab.Console.on("messageAdded", function(evt) {
        console.log(evt.message.source);
    });
    // This is exactly the same as above but called directly on chromeTab
    chromeTab.on("Console.messageAdded", function(evt) => {
        console.log(evt.message.source);
    });
});
```

**TypeScript**

This module is written in TypeScript and can also be consumed by TypeScript using a definition file.
The definition file can be found [here](/Scripts/typings/chrome-debug-protocol/chrome-debug-protocol.d.ts).

The definition contains all methods exposed by the chrome-debug-protocol as defined in the protocol.json and it will help during development with autocompletion, documentation and compile time checking.

```TypeScript
import chrome = require("chrome-debug-protocol");

chrome.getTabs("http://localhost:9222/json",(tabs) => {
    var chromeTab = main.createDebugger(tabs[0]);
    chromeTab.Console.enable(() => {
        console.log("Enabled");
    });
    chromeTab.Console.on("messageAdded",(evt: chrome.Console.IMessageAddedEvent) => {
        console.log(evt.message.source);
    });
    // This is exactly the same as above but called directly on chromeTab
    chromeTab.on("Console.messageAdded",(evt: chrome.Console.IMessageAddedEvent) => {
        console.log(evt.message.source);
    });
});
```

## Building from source

### Using Visual Studio

**Requirements**
 * Visual Studio 2013
 * [Node.js Tools for Visual Studio](https://nodejstools.codeplex.com/)
 * [TypeScript 1.4](http://www.typescriptlang.org/)

### Using Grunt

Install Grunt globally by calling `npm install grunt-cli -g` and run `npm install` to download the dependencies.
Now execute `grunt` to build chrome-debug-protocol
