module.exports = function (grunt)
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),
		browserify 	: {
			js: {
       			src: 'app/js/app.js',
       			dest: 'dist/js/app.js',
       			options: {
         			external: ['angular'],
         			debug: true,
         			browserifyOptions: { debug: true }
       			}
     		}
		},
		copy 		: {
			all: {
				files: [
			      	// includes files within path
			      	{expand: true, cwd: 'app/', src: ['js/support/*.jsi'], dest: 'dist/'},
			      	{expand: true, cwd: 'app/', src: ['img/*.png'], dest: 'dist/'},
			      	{  			
			      		// This copies all the html and css into the dist/ folder
		       			expand: true,
		       			cwd: 'app/',
		       			src: ['**/*.html', '**/*.css'],
		       			dest: 'dist/'
	       			}
			    ],
     
     		}
		},
		watch 		: {
			js: {
				files: "app/**/*.js",
				tasks: "browserify"
			},
			html: {
				files: 'app/**/*.html',
				tasks: 'copy'
			},
			sass: {
				files: 'app/**/*.scss',
				tasks: 'compass'
			},
			css: {
				files: 'app/**/*.css',
				tasks: 'copy'
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'app/css',
					cssDir: 'dist/css'
				}
			}
		},
		sass 		: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
			      'dist/css/default.css': 'app/css/default.scss'
			    }
			}
		}
	}
	);

	// Load the npm installed tasks
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// The default tasks to run when you type: grunt
	grunt.registerTask('default', ['browserify', 'copy', 'sass']);
};