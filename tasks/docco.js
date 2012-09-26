var path = require("path");
var fs = require("fs");

module.exports = function (grunt) {

  function checkSymbolicLink( file, root ) {
    
    var separator = path.sep || "/";
    var fileParts = file.split(separator);
    
    while ( file && file !== root ) {
      if ( fs.lstatSync(file).isSymbolicLink() ) {
        return true;
      }
      fileParts.pop();
      file = fileParts.join(separator);
    }
    
    return false;
  }

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md
  // ==========================================================================
  // TASKS
  // ==========================================================================
  
  grunt.registerMultiTask('docco', 'Your task description goes here.', function () {
    var docco = require('docco');
    var helpers = require('grunt-contrib-lib').init(grunt);
    var options = helpers.options(this);
    var done = this.async();
    var basePath = options.basePath;
    var outputDir = options.output;

    grunt.verbose.writeflags(options, "Options");

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    var srcFiles;

    grunt.utils.async.forEachSeries( this.files, function(file, callback) {
      var dir = ''; //grunt.task.expand( './..' );
      var destFiles = [];
      
      srcFiles = grunt.file.expandFiles(file.src);
      
      for ( var i = 0; i < srcFiles.length; i++ ) {
        srcFiles[ i ] = dir + srcFiles[ i ];
      }
      
      srcFiles.forEach( function( file, done ) {
        if (!checkSymbolicLink(file, basePath)) {
          destFiles.push( file );
        }
      } );
      
      docco.document( destFiles, options, callback );
    },
    done );
  });

};
