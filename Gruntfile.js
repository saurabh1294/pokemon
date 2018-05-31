module.exports = function(grunt) {

  grunt.initConfig({
	  
	server: {
       port: 3000,
       base: './'
    },
	
    jshint: {
      files: ['Gruntfile.js', 'tests/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      },
    },
	
    concat: {
      devjs: {
          // the files to concatenate
          src: ['src/**/*.js'],
          // the location of the resulting JS file
          dest: 'dist/dev/pokemon.component.js'
      },
      devcss: {
        // the files to concatenate
        src: ['src/**/*.css'],
        // the location of the resulting JS file
        dest: 'dist/dev/pokemon.component.css'
      }
    },
    uglify: {
      prodjs: {
        src : ['src/**/*.js'],
        dest : 'dist/prod/pokemon.component.min.js'
      }
    },
    cssmin: {
      prod: {
          files: {
            'dist/prod/pokemon.component.min.css': ['src/**/*.css']
          }
      }
    },
    sass: {
      dev: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.scss', '**/*.sass'],
            dest: 'src/',
            ext: '.css'
          },
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.scss', '**/*.sass'],
            dest: 'src/',
            ext: '.css'
          }
        ]
      }
    },
    copy: {
      devviews: {
        expand: true,
        cwd: 'src/views/',
        src: '**',
        dest: 'dist/dev/',
      },
      prodviews: {
        expand: true,
        cwd: 'src/views/',
        src: '**',
        dest: 'dist/prod/',
      },
      devtemplates: {
        expand: true,
        flatten: true,
        src: 'src/**/*.html',
        dest: 'dist/dev/templates/'
      },
      prodtemplates: {
        expand: true,
        flatten: true,
        src: 'src/**/*.html',
        dest: 'dist/prod/templates/'
      }
    },
    watch: {
      devcss: {
        files: ['src/**/*.scss', 'src/**/*.sass'],
        tasks: ['sass:dev']
      },
      options: {
        livereload: true
      }
    },
    clean: {
      dev: {
        files: [
          {
            dot: true,
            src: [
              'dist/dev'
            ]
          }
        ]
      },
      prod: {
        files: [
          {
            dot: true,
            src: [
              'tmp/prod',
              'dist/prod'
            ]
          }
        ]
      },
      tmp: {
        files: [
          {
            dot: true,
            src: [
              'tmp'
            ]
          }
        ]
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  //default task
  grunt.registerTask('default', [
      'clean:tmp',
      'clean:dev',
      'jshint',
      'concat:devjs',
      'sass:dev',
      'concat:devcss',
      'copy:devviews',
      'copy:devtemplates',
	  'server'
  ]);
  grunt.registerTask('prod', [
      'clean:tmp',
      'clean:prod',
      'jshint',
      'uglify:prodjs',
      'sass:dev',
      'cssmin:prod',
      'copy:prodviews',
      'copy:prodtemplates',
	  'server'
  ]);
  
grunt.registerTask('server', 'Start a custom web server', function() {
    grunt.log.writeln('Started web server on port 3000');
	var done = this.async();
    require('./app.js').start(3000);
});

  grunt.registerTask("watch:css", function (target) {
    grunt.task.run('watch:devcss');
  });
};