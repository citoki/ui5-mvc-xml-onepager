module.exports = function(grunt) {

    grunt.initConfig({
        // read project settings from package.json file
        pkg: grunt.file.readJSON("package.json"),

        // configure connect module
        connect: {
            server: {
                options: {
                    protocol: "https",
                    port: 8000,
                    useAvailablePort: true,
                    livereload: 9000
                }
            }
        },
        // configure openUI5 connect module
        // it autmotically invokes grunt-contrib-connect module
        "openui5_connect": {
            server: {
                options: {
                    appresources: ["webapp"],
                    resources: "resources",
                }
            }
        },
        // watch certain files or directories
        watch: {
            webapp: {
                files: ["webapp/**/*"],
                options: {
                    livereload: {
                        host: "localhost",
                        port: 9000,
                        key: grunt.file.read("node_modules/grunt-contrib-connect/tasks/certs/server.key"),
                        cert: grunt.file.read("node_modules/grunt-contrib-connect/tasks/certs/server.crt")
                    }
                }
            },
            configFiles: {
                files: ["Gruntfile.js", "package.json"],
                options: {
                    reload: true
                }
            }
        }
    }); // grunt init-config

    Object.keys(grunt.config.get("pkg").devDependencies).forEach(function(dependency) {
        if (/^grunt(?!(-cli)?$)/.test(dependency)) {  // ignore grunt and grunt-cli
          grunt.loadNpmTasks(dependency);
        }
    });

    // Default task(s).
    grunt.registerTask("default", ["openui5_connect", "watch"]);
};
