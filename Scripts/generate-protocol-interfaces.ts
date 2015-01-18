import fs = require("fs");
import path = require("path");
var protocol = require("../protocol.json");

var domains = protocol.domains;

class Emitter {
    private buffer: string[] = [];
    private level: number = 0;
    private newline: string;
    private isInComment: boolean = false;

    constructor(startLevel?: number) {
        this.newline = "\r\n";
        this.level = startLevel;
    }

    public indent() {
        this.level++;
    }

    public unindent() {
        this.level--;
    }

    public writeIndent() {
        this.buffer.push(this.createIndentString());
    }

    public write(str: string) {
        this.buffer.push(str);
    }

    public writenewline() {
        this.buffer.push(this.newline);
    }

    public writeline(str: string) {
        if (this.isInComment) {
            this.buffer.push(`${this.createIndentString()} * ${str}${this.newline}`);
        } else {
            this.buffer.push(`${this.createIndentString()}${str}${this.newline}`);
        }
    }

    public writeStartMultilineComment() {
        this.isInComment = true;
        this.buffer.push(`${this.createIndentString()} /**${this.newline}`);
    }

    public writeEndMultilineComment() {
        this.buffer.push(`${this.createIndentString()} */${this.newline}`);
        this.isInComment = false;
    }

    public writeJsDocParameter(name: string, description: string) {
        if (!this.isInComment) {
            throw new Error("Not in a comment block")
        }
        this.buffer.push(` * @param ${name} ${description}`);
    }

    private createIndentString(level?: number) {
        level = typeof level === "undefined" ? this.level : level;
        return Array((level * 4) + 1).join(" ")
    }

    public toString() {
        return this.buffer.join("");
    }
}

// Write "domain" properties for the ChromeDebugger class
var domainEmitter = new Emitter(2);
for (var i = 0; i < domains.length; i++) {
    var domain = domains[i];
    if (domain.description) {
        domainEmitter.writeStartMultilineComment();
        domainEmitter.writeline(domain.description);
        domainEmitter.writeEndMultilineComment();
    }
    domainEmitter.writeline(`${domain.domain}: I${domain.domain};`);
}

// Write a module wit the parameter interfaces
var moduleEmitter = new Emitter(1);
for (var i = 0; i < domains.length; i++) {
    var domain = domains[i];

    moduleEmitter.writeline(`module ${domain.domain} {`);
    var commands: any[] = domain.commands;
    if (commands && commands.length > 0) {
        moduleEmitter.indent();
        for (var j = 0; j < commands.length; j++) {
            var command = commands[j];
            var parameters: any[] = command.parameters;
            if (parameters && parameters.length > 0) {
                var optional = containsOptionalParameters(parameters);
                var commandName = command.name.replace(/(.)/,(val) => val.toUpperCase());
                var name = `I${commandName}Params`;
                emitParameterInterface(name, parameters);
            }
        }
        moduleEmitter.unindent();
    }
    moduleEmitter.writeline("}");
}

function emitParameterInterface(name: string, parameters: any[]) {
    moduleEmitter.writeline(`export interface ${name} {`);
    moduleEmitter.indent();
    for (var i = 0; i < parameters.length; i++) {
        var p = parameters[i];
        if (p.description) {
            moduleEmitter.writeStartMultilineComment();
            moduleEmitter.writeline(p.description);
            moduleEmitter.writeEndMultilineComment();
        }

        moduleEmitter.writeline(`${p.name}${(p.optional ? "?" : "")}: ${getTypeScriptTypeFromParameter(p)};`);
    }
    moduleEmitter.unindent();
    moduleEmitter.writeline("}");
}

// Write the actual implementation interfaces with methodes, parameters and callbacks
var domainInterfaceEmitter = new Emitter(1);
for (var i = 0; i < domains.length; i++) {
    var domain = domains[i];
    domainInterfaceEmitter.writeline(`interface I${domain.domain} {`);
    var commands: any[] = domain.commands;
    domainInterfaceEmitter.indent();
    if (commands && commands.length > 0) {
        for (var j = 0; j < commands.length; j++) {
            var command = commands[j];
            var parameters: any[] = command.parameters;
            if (command.description) {
                domainInterfaceEmitter.writeStartMultilineComment();
                domainInterfaceEmitter.writeline(command.description);
                domainInterfaceEmitter.writeEndMultilineComment();
            }
            domainInterfaceEmitter.writeIndent();
            domainInterfaceEmitter.write(`${command.name}(`);
            if (parameters && parameters.length > 0) {
                var optional = containsOptionalParameters(parameters);
                var commandName  = command.name.replace(/(.)/,(val) => val.toUpperCase());
                var name = `I${commandName}Params`;
                domainInterfaceEmitter.write(`params${(optional ? "?" : "")}: ${domain.domain}.${name}`);
                domainInterfaceEmitter.write(", ");
            }
            domainInterfaceEmitter.write("cb?: Function);");
            domainInterfaceEmitter.writenewline();
        }
    }
    domainInterfaceEmitter.unindent();
    domainInterfaceEmitter.writeline("}")
}

function getTypeScriptTypeFromParameter(parameter: any) {
    switch (parameter.type) {
        case "boolean":
        case "string":
            return parameter.type;
        case "integer":
            return "number";
        case "array":
            return "any[]";
        default:
            return "any";
    }
}

function containsOptionalParameters(params: any[]) {
    for (var i = 0; i < params.length; i++) {
        if (params[i].optional) {
            return true;
        }
    }
    return false;
}

var maindts = fs.readFileSync(path.join(__dirname, "../main.d.ts"), "utf8");

var importsEmitter = new Emitter(1);
var importRegex = /import (?:.+;)/g;
var match: RegExpExecArray;
while ((match = importRegex.exec(maindts)) != null) {
    importsEmitter.writeline(match[0]);
}

var header = `// Type definitions for ws
// Project: https://github.com/DickvdBrink/chrome-debug-protocol
// Definitions by: Dick van den Brink <https://github.com/DickvdBrink>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />
`;

maindts = header + maindts.replace(/import (?:.+;)/g, "")
    .replace(
        /(class ChromeDebugger (?:.+) {)([\s\S]+?)([ ]+)}/g,
        `$1$2${domainEmitter.toString()}$3}\r\n${domainInterfaceEmitter.toString()}${moduleEmitter.toString()}`
    ).replace(/declare module Chrome {/, "declare module \"chrome-debug-protocol\" {\r\n" + importsEmitter .toString())
    .replace("export = Chrome;", "");

fs.writeFileSync(path.join(__dirname, "typings/chrome-debug-protocol/chrome-debug-protocol.d.ts"), maindts);
