module.exports = function(grunt) {

  /**
   * Project structure:
   * 
   * build      - Initial (development) build folder
   * coverage   - Intermediate build for test coverage
   * release    - Release folder for distribution (includes minified js, css, etc)
   * scripts    - Installation and mainentance scripts for environment, database, etc
   * src        - Source folder
   * tasks      - Custom Grunt.js tasks folder
   * test       - Mocha tests
   * vendor     - Third-party client javascript files
   */

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    concat: {
      js: {
        src: [
          'vendor/es5-polyfill.js',
          'vendor/jquery-1.7.1.min.js',
          'vendor/async.min.js',
          'vendor/underscore.js',
          'vendor/backbone.js'
        ],
        dest: 'build/public/scripts/vendor/frameworks.js'
      },
      css: {
        src: [
          "src/client/stylesheets/normalize.css",
          "src/client/stylesheets/fonts.css",
          "src/client/stylesheets/app.css"
        ],
        dest: "build/public/stylesheets/app.css"
      }
    },
    min: {
      js: {
        src: ['<config:concat.js.dest>'],
        dest: 'release/public/scripts/frameworks.js'
      },
      css: {
        src: ['<config:concat.css.dest>'],
        dest: 'release/public/stylesheets/app.css'
      }
    },
    watch: {
      files: [
        "grunt.js",
        "src/client/**/*.*",
        "vendor/**/*.*"
      ],
      tasks: 'dev reload'
    },
    reload: {
      port: 8001,
      proxy: {
        host: 'localhost'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        exports: true,
        define: true,
        require: true,
        module: false,
        $: true
      }
    },
    mocha: {
      index: [ 'test/index.html' ]
    },
    coffee: {
      client: {
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: "src/client/scripts"
        },
        src: "src/client/scripts/**/*.coffee",
        dest: "build/public/scripts"
      },
      coverage: {
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: "src"
        },
        src: "src/**/*.coffee",
        dest: "coverage/build"
      },
      server: {
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: "src/server"
        },
        src: "src/server/**/*.coffee",
        dest: "release"
      }
    },
    copy: {
      js: {
        files: {
          "build/public/scripts/vendor/require.js": "vendor/require.js"
        }
      },
      img: {
        options: {
          basePath: 'src/client/stylesheets'
        },
        files: {
          "build/public/stylesheets/": [
            "src/client/stylesheets/img/**/*",
            "src/client/stylesheets/fonts/**/*"
          ]
        }
      },
      release: {
        options: {
          basePath: 'build'
        },
        files: {
          "release/": [
            "build/public/stylesheets/img/**/*",
            "build/public/stylesheets/fonts/**/*",
            "build/public/scripts/vendor/**/*"
          ]
        }
      }
    },
    jade: {
      release: {
        files: {
          "release/views/index.html": "src/client/views/index.jade"
        }
      },
    },
    templates: {
      compile: {
        options: {
          pretty: true
        },
        files: {
          'build/views/index.html': [ 'src/client/views/**/*.tpl.jade' ]
        }
      }
    },
    spritesheet: {
      compile: {
        options: {
          outputImage: 'sprite/flags.png',
          outputCss: 'flags.css',
          selector: '.flag'
        },
        files: {
          'build/public/stylesheets': 'src/client/stylesheets/sprite/flags/*'
        }
      }
    },
    stylus: {
      build: {
        options: {
          compress: false
        },
        files: {
          "build/public/stylesheets/app.css": "src/client/stylesheets/app.styl"
        }
      }
    },
    clean: {
      build: "build",
      coverage: "coverage",
      release: "release"
    }
  });

  // Load custom tasks.
  grunt.loadTasks('tasks');
  
  // Load NPM tasks.
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('node-spritesheet');

  // Default task.
  grunt.registerTask('default', 'clean coffee stylus concat min templates spritesheet copy mocha');
  grunt.registerTask('dev', 'reload watch');
  grunt.registerTask('build', 'clean:build concat spritesheet copy:js copy:img');
  grunt.registerTask('release', 'build clean:release coffee:client coffee:server min jade copy:release');
  grunt.registerTask('cov', 'clean:coverage coffee:coverage');
  grunt.registerTask('test', 'dev mocha');

};
