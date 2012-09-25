config = require( "./grunt.config" )

module.exports = function(grunt) {

  /**
   * Project structure:
   * 
   * build
   *    dev       - Initial (development) build folder
   *    coverage  - Intermediate build for test coverage
   *    prod      - Release folder for distribution (includes minified js, css, etc)
   * 
   * scripts      - Installation and mainentance scripts for environment, database, etc
   * src          - Source folder
   * tasks        - Custom Grunt.js tasks folder
   * test         - Mocha tests
   * vendor       - Third-party client javascript files
   */

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    
    //--------------------------------------------------------------------------
    //
    // Development tasks
    //
    //--------------------------------------------------------------------------
    
    /**
     * Watches the specified files and triggers a rebuild ('dev')
     * and a reload ('reload').
     */
    
    watch: {
      dev: {
        files: [
          "grunt.js",
          "src/**/*.*",
          "vendor/**/*.*"
        ],
        tasks: 'dev reload'
      },
      dev_with_tests: {
        files: [
          "grunt.js",
          "src/**/*.*",
          "spec/**/*.*",
          "vendor/**/*.*"
        ],
        tasks: 'dev-with-tests reload'
      },
    },
    
    /**
     * On pointing the browser to http://localhost:8001 rather than
     * http://localhost:3000, pages will automatically reload in
     * response to file changes when the watch task is running.
     */
    
    reload: {
      port: config.RELOAD_PORT,
      proxy: {
        host: config.HOST,
        port: config.PORT
      }
    },
    
    //--------------------------------------------------------------------------
    //
    // CoffeeScript
    //
    //--------------------------------------------------------------------------
    
    /**
     * CoffeeScript compilation.
     */
    
    coffee: {
      client: {
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: "src/client/scripts"
        },
        src: "src/client/scripts/**/*.coffee",
        dest: "build/dev/public/scripts"
      },
      coverage_client: {
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: "src/client/scripts"
        },
        src: "src/client/scripts/**/*.coffee",
        dest: "build/coverage/tmp/client"
      },
      coverage_server: {
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: "src/server"
        },
        src: "src/server/**/*.coffee",
        dest: "build/coverage/tmp/server"
      },
      server: {
        options: {
          bare: true,
          preserve_dirs: true,
          base_path: "src/server"
        },
        src: "src/server/**/*.coffee",
        dest: "build/prod"
      }
    },
    
    /**
     * Linting for CoffeeScript - lints the source files directly.
     * For options, see grunt.config.js
     */
    
    coffeelint: {
      client: {
        files: [
          "src/client/scripts/**/*.coffee",
          "spec/client/**/*.coffee"
        ],
        options: config.COFFEE_LINT_OPTS
      },
      server: {
        files: [
          "src/server/**/*.coffee",
          "spec/server/**/*.coffee"
        ],
        options: config.COFFEE_LINT_OPTS
      },
    },
    
    /**
     * Allows the usage of module.exports within client-side JavaScript code.
     * This task transforms the client-side CoffeeScript code into a single
     * bundle for development and deployment.
     */
    
    browserify: {
      "build/dev/public/scripts/app.js": {
        entries: ['src/client/scripts/app.coffee']
      }
    },
    
    /**
     * Runs various shell scripts.
     */
    
    shell: {
      
      /**
       * Runs client-side unit tests via mocha.
       */
      
      client_test: {
        command: config.CLIENT_TEST_COMMAND,
        stdout: true,
        stderr: true
      },
      
      /**
       * Runs server-side unit tests via mocha.
       */
      
      server_test: {
        command: config.SERVER_TEST_COMMAND,
        stdout: true,
        stderr: true
      }
    },
    
    //--------------------------------------------------------------------------
    //
    // Optimisation tasks
    //
    //--------------------------------------------------------------------------
    
    /**
     * Concatenation
     */
    
    concat: {
      
      // Concatenates JavaScript vendor files/frameworks.
      
      frameworks: {
        src: [
          'vendor/es5-polyfill.js',
          'vendor/jquery-1.7.1.min.js',
          'vendor/async.min.js',
          'vendor/modernizr.js',
          'vendor/underscore.js',
          'vendor/backbone.js',
          'vendor/bootstrap/js/bootstrap.js'
        ],
        dest: 'build/dev/public/scripts/frameworks.js'
      },
      
      // Concatenates application JavaScript code.
      
      app: {
        src: [
          'build/dev/public/scripts/templates.js',
          'build/dev/public/scripts/app.js'
        ],
        dest: 'build/dev/public/scripts/app.js'
      },
      
      // Concatenates all CSS into a single file.
      
      css: {
        src: [
          "src/client/stylesheets/normalize.css",
          "vendor/bootstrap/css/bootstrap.css",
          "src/client/stylesheets/fonts.css",
          "build/dev/public/stylesheets/app.css",
          "build/dev/public/stylesheets/*.css"
        ],
        dest: "build/dev/public/stylesheets/app.css"
      }
    },
    
    /**
     * Minification - Javascript
     */
    
    min: {
      
      // Minifies vendor code
      
      frameworks: {
        src: ['build/dev/public/scripts/frameworks.js'],
        dest: 'build/prod/public/scripts/frameworks.js'
      },
      
      // Minifies application code
      
      js: {
        src: ['build/dev/public/scripts/app.js'],
        dest: 'build/prod/public/scripts/app.js'
      }
    },
    
    /**
     * Uglify options for minification
     * @see grunt.config.js
     */
    
    uglify: config.UGLIFY_OPTS,
    
    //--------------------------------------------------------------------------
    //
    // HTML and templating
    //
    //--------------------------------------------------------------------------
    
    /**
     * Jade compilation to HTML.
     */
    
    jade: {
      //views: {
      //  options: {
      //    basePath: "src/client/views/"
      //  },
      //  files: {
      //    "build/dev/views/": [ "src/client/views/**/*.jade" ]
      //  }
      //},
      templates: {
        options: {
          basePath: "src/client/views/"
        },
        files: {
          "build/dev/views/templates/": [ "src/client/views/**/*.tpl.jade" ]
        }
      }
    },
    
    /**
     * Template compilation: takes all .tpl.jade files from a directory and
     * injects them into the specified js file.
     */
    
    jst: {
      compile: {
        options: {
          templateSettings: {
            //interpolate : /\{\{(.+?)\}\}/g
            interpolate : /\{\{(.+?)\}\}/g
          },
          processName: function(filename) {
            return filename.split("/").pop().split(".").shift();
          }
        },
        files: {
          'build/dev/public/scripts/templates.js': [ 'build/dev/views/**/*.tpl.html' ]
        }
      }
    },
    
    //--------------------------------------------------------------------------
    //
    // CSS and styling
    //
    //--------------------------------------------------------------------------
    
    /**
     * Compile CSS from Stylus files.
     */
    
    stylus: {
      build: {
        options: {
          compress: false
        },
        files: {
          "build/dev/public/stylesheets/app.css": "src/client/stylesheets/app.styl"
        }
      }
    },
    
    /**
     * Linting for CSS - lints the dev build.
     */
    
    csslint: {
      build: {
        src: "build/dev/public/stylesheets/app.css",
        rules: {
          "import": false,
          "overqualified-elements": 2
        }
      }
    },
    
    /**
     * Generate sprite sheets from directories of images.
     */
    
    spritesheet: {
      flags: {
        options: {
          outputImage: 'sprite/flags.png',
          outputCss: 'flags.css',
          selector: '.flag'
        },
        files: {
          'build/dev/public/stylesheets': 'src/client/stylesheets/sprite/flags/*'
        }
      }
    },
    
    /**
     * Minification for CSS - minifies the dev build when used to create the
     * prod build.
     */
    
    cssmin: {
      prod: {
        src: ["build/dev/public/stylesheets/app.css"],
        dest: "build/prod/public/stylesheets/app.css"
      }
    },
    
    //--------------------------------------------------------------------------
    //
    // Utilities and housekeeping
    //
    //--------------------------------------------------------------------------
    
    /**
     * Simple file copying.
     */
    
    copy: {
      
      // Copy relevant files out of source folders into the dev build.
      
      js: {
      //  files: {
      //    "build/dev/public/scripts/vendor/require.js": "vendor/require.js"
      //  }
      },
      
      img: {
      //  options: {
      //    basePath: 'src/client/stylesheets'
      //  },
      //  files: {
      //    "build/dev/public/stylesheets/": [
      //      "src/client/stylesheets/img/**/*",
      //      "src/client/stylesheets/fonts/**/*"
      //    ]
      //  }
      },
      
      // Copy relevant files from the dev build to the prod build.
      
      release: {
        options: {
          basePath: 'build/dev'
        },
        files: {
          "build/prod/": [
            "build/dev/public/stylesheets/img/**/*",
            "build/dev/public/stylesheets/fonts/**/*"
            //, "build/dev/views/**/*"
          ]
        }
      }
    },
    
    /**
     * Clean folders ready for building.
     */
    
    clean: {
      build: "build/dev",
      release: "build/prod"
    }
    
  });

  //----------------------------------------------------------------------------
  //
  // Tasks
  //
  //----------------------------------------------------------------------------

  //--------------------------------------
  // Load tasks from NPM libraries
  //--------------------------------------

  // Load NPM tasks.
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('node-spritesheet');

  // Load custom tasks.
  grunt.loadTasks('tasks');

  //--------------------------------------
  // Define tasks
  //--------------------------------------
  
  /**
   * General development task:
   * 
   * 1. Runs a dev build
   * 2. Listens for changes on source files
   * 3. Runs unit tests
   * 4. Re-runs a dev build on changes to watched files
   */
  
  grunt.registerTask('dev', 'build reload watch:dev');
  grunt.registerTask('dev-with-tests', 'build-with-tests reload watch:dev_with_tests');
  
  /**
   * Runs a dev build of the client and server into build/dev:
   * 
   * 1. Cleans the build/dev directory
   * 2. Lints the CoffeeScript source files
   * 3. Creates a development JS bundle using Browserify
   * 4. Compiles Stylus (.styl) files to CSS
   * 5. Lints the CSS that's been generated by 4
   * 6. Generates spritesheets
   * 7. Concatenates framework (vendor) JS files into a frameworks.js package
   * 8. Copies JS* and images from source directories into target dev build
   * 
   * (*) JS not currently copied - reinstate if using require.js
   */
  
  grunt.registerTask('build', 'clean:build coffeelint browserify stylus csslint spritesheet jade jst concat copy:js copy:img');
  grunt.registerTask('build-with-tests', 'build shell:client_test shell:server_test');
  
  /**
   * Runs a release build of the client and server into build/prod:
   * 
   * 1. Runs a dev build to feed from
   * 2. Cleans the build/prod directory
   * 3. Compiles the server CoffeeScript into JavaScript
   * 4. Compiles the views (Jade) into HTML
   * 5. Minifies the JavaScript for the client (not the server)
   * 6. Minifies the CSS
   * 7. Copies any other artifacts from dev build into prod build (images, etc)
   * 
   * Defined as the default build target.
   */
  
  grunt.registerTask('release', 'build clean:release coffee:server min cssmin copy:release');
  grunt.registerTask('default', 'release');
  
  /**
   * Compiles a build of the client CoffeeScript sources into JavaScript, ready
   * for instrumentation by jscoverage (requires Make task).
   */
  
  grunt.registerTask('cov:client', 'coffee:coverage_client');
  
  /**
   * Compiles a build of the server CoffeeScript sources into JavaScript, ready
   * for instrumentation by jscoverage (requires Make task).
   */
  
  grunt.registerTask('cov:server', 'coffee:coverage_server');

};
