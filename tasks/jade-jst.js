/*
 * grunt-contrib-jade
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib-jade/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  grunt.registerMultiTask('jade', 'Compile Jade templates into HTML.', function() {

    var _ = grunt.util._;
    var kindOf = grunt.util.kindOf;
    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this, {data: {}});
    var basePath = options.basePath || "";

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var helperData = options.data;

    _.each(helperData, function(value, key) {
      if (kindOf(value) === 'string') {
        helperData[key] = grunt.template.process(value);
      }
    });

    var srcFiles;
    var taskOutput;
    var isDir;
    var sourceCode;
    var sourceCompiled;
    var helperOptions;

    function processName( name ) {
      return String( name ).split( basePath ).pop().split(".jade").join(".html");
    }

    this.files.forEach(function(file) {
      srcFiles = grunt.file.expandFiles(file.src);

      taskOutput = [];
      isDir = file.dest.substr( -1 ) === "/"

      srcFiles.forEach(function(srcFile) {
        helperOptions = _.extend({filename: srcFile}, options);
        sourceCode = grunt.file.read(srcFile);

        sourceCompiled = compileJade(sourceCode, helperOptions, helperData);

        if (isDir && sourceCompiled.length > 0) {
          var name = processName( srcFile );
          grunt.file.write(file.dest + name, sourceCompiled );
          grunt.log.writeln('File ' + file.dest + name + ' created.');
        }

        taskOutput.push(sourceCompiled);
      });

      if (!isDir) {
        if (taskOutput.length > 0) {
          grunt.file.write(file.dest, taskOutput.join('\n'));
          grunt.log.writeln('File ' + file.dest + ' created.');
        }
      }
    });
  });

  var compileJade = function(src, options, data) {
    try {
      return require('jade').compile(src, options)(data);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('Jade failed to compile.');
    }
  };
};