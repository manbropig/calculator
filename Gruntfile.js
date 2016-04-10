module.exports = function(grunt) {

  var fsExtra = require('fs-extra'); // file system commands for node.js
  var fs = require('fs');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {  // $ grunt connect
      server: {
        options: {
          port: 8000,
          base: '.',
          keepalive: true
        }
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      dev_application_js: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
          'assets/application.js': ['app/angular/**/*.js']
        }
      },
    },
    sass: {
      options: {
        outputStyle: 'compressed'
      },
      // vendor_css: {
      //   files: { "assets/vendor.css": "vendor/stylesheets/vendor.css.scss" }
      // },
      application_css: {
        files: { "assets/application.css": "app/stylesheets/calculator.scss" }
      }
    },
    watch: {
      options: {
        port: 23456
      },
      application_js: {
        files: ['app/**/*.js', 'app/**/*.html'],
        tasks: ['process_application_js'],
        options: {
          livereload: true,
        }
      },
      application_scss: {
        files: ['app/stylesheets/*.scss'],
        tasks: ['process_application_scss'],
        options: {
          livereload: true,
        }
      }
    },
    // Test settings
    karma: {
      options: {
        configFile: 'karma.conf.js',
        singleRun: true,
        files: [
          'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.1/angular.min.js',
          'node_modules/angular-mocks/angular-mocks.js',
          'app/angular/**/*.js',
          'test/lib/*.js',
          'test/**/*.js'
        ]
      },
      test: {},
      watch: {
        options: {
          singleRun: false,
          autoWatch: true,
          reporters: ['super-dots', 'mocha', 'osx']
        }
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: [
        'watch',
        'connect'
      ]
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('connect', [], function () {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.task.run('connect');
  });

  grunt.registerTask('process_application_scss', [], function () {
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-sass');
    fsExtra.ensureFileSync('app/stylesheets/application.css.scss'); // Ensure necessary file exist

    grunt.task.run('sass:application_css');
  });

  grunt.registerTask('process_application_js', [], function () {
    require('time-grunt')(grunt);
    grunt.loadNpmTasks('grunt-contrib-uglify');

    fsExtra.ensureFileSync('app/application.js'); // Ensure necessary file exist

    grunt.task.run(
      'uglify:dev_application_js'
    );
  });

  grunt.registerTask('compile_dev', [], function(mode) {
    var fullTaskList = [
      'process_application_scss',
      'process_application_js'
    ];

    grunt.task.run(fullTaskList);

  });

  grunt.registerTask('test', [], function() {
  var optFile = grunt.option('file');
  var browser = grunt.option('browser');
  var files   = grunt.config.get('karma.options.files');

  if (optFile) {
    // If not in test/spec, rewrite path to what we expect it to be
    if (/test\/spec/.test(optFile) !== true) {
      var newPath = optFile.replace(/app\/angular/, 'test/spec').replace(/\.js/, '_spec.js');

      var newPathStats = fs.statSync(newPath);

      if (newPathStats.isFile()) {
        optFile = newPath;
      }
    }

    var fileStats = fs.statSync(optFile);

    if (!fileStats.isFile()) {
      throw "Bad file path.";
    }

    files.splice(files.indexOf('test/spec/**/*.js'), 1, optFile);
  }

  if (browser) {
    grunt.config.set('karma.test.options.browsers', [browser]);
  }

  grunt.config.set('karma.test.options.files', files);

  grunt.task.run('karma:test');
});

  // ** default grunt behaviour **
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', [
    'compile_dev',
    'concurrent:dev'
  ]);

  grunt.loadNpmTasks('grunt-concurrent');

  grunt.loadNpmTasks('grunt-karma');
};
