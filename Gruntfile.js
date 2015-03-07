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
        },
        connect: {
            server: {
                options: {
                    base: "test/www/",
                    port: 9955
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-execute");
    grunt.loadNpmTasks("grunt-contrib-connect");

    grunt.registerTask("default", ["ts", "execute:generate_definition"]);
    grunt.registerTask('test', ["default", "connect"]);
};
