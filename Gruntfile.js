module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            scripts: {
                tsconfig: './scripts/tsconfig.json'
            },
            src: {
                tsconfig: './src/tsconfig.json'
            },
            test: {
                tsconfig: './test/tsconfig.json'
            }
        },
        execute: {
            generate_definition: {
                src: ['scripts/generate-protocol-interfaces.js']
            }
        },
        connect: {
            server: {
                options: {
                    base: "test/www/",
                    port: 9955
                }
            }
        },
        mochacli: {
            options: {
                files: "test/*.js"
            },
            spec: {
                options: {
                    reporter: "spec"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-execute");
    grunt.loadNpmTasks("grunt-mocha-cli");

    grunt.registerTask("default", ["ts:scripts", "ts:src", "execute:generate_definition"]);
    grunt.registerTask('test', ["default", "ts:test", "connect", "mochacli:spec"]);
};
