import fs = require("fs");
var protocol = require("../protocol.json");

function indent(level: number) {
    return Array((level * 4) + 1).join(" ")
}


var domains = protocol.domains;
var chromeDomains = "";

for (var i = 0; i < domains.length; i++) {
    chromeDomains += indent(2) + domains[i].domain + ": I" + domains[i].domain + ";\r\n";
}

var interfaces = "";
for (var i = 0; i < domains.length; i++) {
    emitInterface(domains[i]);
}

function emitInterface(domain: any) {
    interfaces += indent(1) + "interface I" + domain.domain + " {\r\n"
    var commands: any[] = domain.commands;
    if (commands && commands.length > 0) {
        for (var i = 0; i < commands.length; i++) {
            emitCommand(commands[i]);
        }
    }
    interfaces += indent(1) + "}\r\n";
}

function emitCommand(command: any) {
    if (command.description) {
        interfaces += indent(2) + " /**\r\n";
        interfaces += indent(2) + " * " + command.description + "\r\n";
        interfaces += indent(2) + " */\r\n";
    }
    interfaces += indent(2) + command.name;
    interfaces += "(";
    var parameters: any[] = command.parameters;
    if (parameters && parameters.length > 0) {
        for (var j = 0; j < parameters.length; j++) {
            interfaces += parameters[j].name;
            if (j < parameters.length - 1) {
                interfaces += ", ";
            }
        }
    }
    interfaces += ");\r\n";
}

if (!fs.existsSync("bin")) {
    fs.mkdirSync("bin");
}

var maindts = fs.readFileSync("../main.d.ts", "utf8");
maindts = maindts.replace(/(class ChromeDebugger (?:.+) {)([\s\S]+?)([ ]+)}/g, "$1$2" + chromeDomains + "$3}\r\n" + interfaces);

fs.writeFileSync("../chrome-interfaces.d.ts", maindts);
