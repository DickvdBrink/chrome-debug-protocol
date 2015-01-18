import fs = require("fs");
var protocol = require("../protocol.json");

var domains = protocol.domains;
var str = "";

for (var i = 0; i < domains.length; i++) {
    str += "\t\t" + domains[i].domain + ": any;\r\n";
}

var maindts = fs.readFileSync("../main.d.ts", "utf8");
str = maindts.replace(/(class ChromeDebugger (?:.+) {)([\s\S]+?)([ ]+)}/g, "$1$2" + str + "$3}")

//for (var i = 0; i < domains.length; i++) {
//    emitInterface(domains[i]);
//}

//function emitInterface(domain: any) {
//    str += "interface I" + domain.domain + " {\r\n"
//    var commands: any[] = domain.commands;
//    if (commands && commands.length > 0) {
//        for (var i = 0; i < commands.length; i++) {
//            emitCommand(commands[i]);
//        }
//    }
//    str += "}\r\n";
//}

//function emitCommand(command: any) {
//    if (command.description) {
//        str += "    /**\r\n";
//        str += "     * " + command.description + "\r\n";
//        str += "     */\r\n";
//    }
//    str += "    " + command.name;
//    str += "(";
//    var parameters: any[] = command.parameters;
//    if (parameters && parameters.length > 0) {
//        for (var j = 0; j < parameters.length; j++) {
//            str += parameters[j].name;
//            if (j < parameters.length - 1) {
//                str += ",";
//            }
//        }
//    }
//    str += ");\r\n";
//}

if (!fs.existsSync("bin")) {
    fs.mkdirSync("bin");
}

fs.writeFileSync("../chrome-interfaces.d.ts", str);
