module.exports = function(grunt) {

 'use strict';

  grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
    jshint: {
      files: ["Gruntfile.js", "scripts/*.js"],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          include: [
            "app"
          ],
          baseUrl: "./scripts",
          out: "./public/javascripts/main.min.js",
          optimize: "uglify",
          paths: {
            // "react": "../bower_components/react/react.min",
            "jquery": "jquery.min",
            "ytclient": "https://apis.google.com/js/client.js?onload=googleApiClientReady"
          }
        }
      }
    },
		compass: {
			compile: {
				options: {
					config: 'config.rb',  // css_dir = 'dev/css
          outputStyle: "compressed"
				}
			}
		},
    watch: {
			files: {
				files: ["sass/*.scss"],
				tasks: ["compass"]
			}
    }
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-requirejs");

  grunt.registerTask("test", ["jshint"]);
  grunt.registerTask("watch", ["watch"]);
  grunt.registerTask("js", ["requirejs"]);
  grunt.registerTask("default", ["jshint", "requirejs", "compass"]);

};
