module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['public/**/*'],
    concat: {
      js: {
        src: ['src/js/**/*.js', '!src/js/main.js', '!src/js/main.min.js'],
        dest: 'src/js/main.js'
      }
    },
    copy: {
      js: {
        expand: true,
        flatten: true,
        src: ['src/js/main.min.js'],
        dest: 'public/'
      },
      html: {
        expand: true,
        flatten: true,
        src: ['src/templates/index.html', 'src/templates/404.html'],
        dest: 'public/'
      },
      css: {
        expand: true,
        flatten: true,
        src: ['src/css/styles.min.css'],
        dest: 'public/'
      },
      assets: {
        expand: true,
        flatten: false,
        src: ['assets/**/*'],
        dest: 'public/'
      }
    },
    cssmin: {
      target: {
        files: {
          'src/css/styles.min.css': ['src/css/*.css', '!src/css/*.min.css']
        }
      }
    },
    handlebars: {
      compile: {
        files: {
          'src/js/templates.js': ['src/templates/**/*.hbs']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'src/templates/index.html': 'src/templates/template.html'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/js/**/*.js', '!src/js/main.min.js', '!src/js/templates.js'],
      options: {
        'esversion': 6
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['**/*.scss'],
          dest: './styles.css'
        }]
      }
    },
    uglify: {
      js: {
        files: {
          'src/js/main.min.js': ['src/js/main.js']
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint']
      },
      js: {
        files: ['src/js/**/*', '!src/js/main.min.js', '!src/js/**/*.min.js'],
        tasks: ['compile--js', 'build']
      },
      handlebar: {
        files: ['src/templates/**/*.hbs'],
        tasks: ['compile--js', 'build']
      },
      css: {
        files: ['src/css/**/*.scss'],
        tasks: ['compile--css', 'build']
      },
      html: {
        files: ['src/templates/*.html', '!src/templates/index.html'],
        tasks: ['compile--html', 'build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['compile', 'build', 'watch']);
  grunt.registerTask('release', ['compile', 'build']);
  grunt.registerTask('compile', ['compile--js', 'compile--css', 'compile--html']);
  grunt.registerTask('compile--js', ['jshint', 'handlebars', 'concat', 'uglify']);
  grunt.registerTask('compile--css', ['sass', 'cssmin', 'htmlmin']);
  grunt.registerTask('compile--html', ['htmlmin']);
  grunt.registerTask('build', ['clean', 'copy']);
};
