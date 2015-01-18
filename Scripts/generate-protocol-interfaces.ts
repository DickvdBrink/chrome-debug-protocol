import fs = require("fs");
var protocol = require("../protocol.json");

var domains = protocol.domains;
var str = "";

str += "declare module Chrome {\r\n";
str += "\tinterface ChromeDomains {\r\n";
for (var i = 0; i < domains.length; i++) {
    str += "\t\t" + domains[i].domain + ": I" + domains[i].domain + ";\r\n";
}
str += "\t}\r\n";
str += "}\r\n";


for (var i = 0; i < domains.length; i++) {
    emitInterface(domains[i]);
}

function emitInterface(domain: any) {
    str += "interface I" + domain.domain + " {\r\n"
    var commands: any[] = domain.commands;
    if (commands && commands.length > 0) {
        for (var i = 0; i < commands.length; i++) {
            emitCommand(commands[i]);
        }
    }
    str += "}\r\n";
}

function emitCommand(command: any) {
    if (command.description) {
        str += "    /**\r\n";
        str += "     * " + command.description + "\r\n";
        str += "     */\r\n";
    }
    str += "    " + command.name;
    str += "(";
    var parameters: any[] = command.parameters;
    if (parameters && parameters.length > 0) {
        for (var j = 0; j < parameters.length; j++) {
            str += parameters[j].name;
            if (j < parameters.length - 1) {
                str += ",";
            }
        }
    }
    str += ");\r\n";
}

fs.writeFileSync("../chrome-interfaces.d.ts", str);
