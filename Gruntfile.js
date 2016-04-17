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
        },
        copy: { // copy all files needed for the deployment into the build/release folder
            "sap.ui.core": {
    			files: [
    				{
    					cwd: "bower_components/openui5-sap.ui.core/resources",
    					src: [ "**/*" ],
    					dots: true,
    					expand: true,
    					dest: "resources/"
    				}
    			]
    		},
    		"sap.m": {
    			files: [
    				{
    					cwd: "bower_components/openui5-sap.m/resources",
    					src: [ "**/*" ],
    					dots: true,
    					expand: true,
    					dest: "resources/"
    				}
    			]
    		},
    		"bluecrystal": {
    			files: [
    				{
    					cwd: "bower_components/openui5-bluecrystal/resources",
    					src: [ "**/*" ],
    					dots: true,
    					expand: true,
    					dest: "resources/"
    				}
    			]
    		},
        }
    }); // grunt init-config

    Object.keys(grunt.config.get("pkg").devDependencies).forEach(function(dependency) {
        if (/^grunt(?!(-cli)?$)/.test(dependency)) {  // ignore grunt and grunt-cli
          grunt.loadNpmTasks(dependency);
        }
    });

    // after bower install copy the resources from the bower folder into the resources folder
    grunt.registerTask("copyresources", [
        "copy:sap.ui.core",
        "copy:sap.m",
        "copy:bluecrystal"
    ]);

    // Default task(s).
    grunt.registerTask("default", ["openui5_connect", "watch"]);
};
