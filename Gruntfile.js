module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            default: {
                src: ["**/*.ts", "!node_modules/**/*.ts"],
                options: {
                    compiler: "./node_modules/typescript/bin/tsc",
                    module: "commonjs",
                    target: "es5",
                    declaration: true
                }
            }
        },
        execute: {
            generate_definition: {
                src: ['Scripts/generate-protocol-interfaces.js']
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-execute");
    grunt.registerTask("default", ["ts", "execute:generate_definition"]);
};
