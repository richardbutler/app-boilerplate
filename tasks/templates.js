/**
 * Task: templates
 * Description: Compile Jade templates to HTML
 * Dependencies: jade, path
 * Contributor: @errcw
 */

module.exports = function(grunt) {
  var _ = grunt.utils._;

  grunt.registerMultiTask("templates", "Compile Jade templates into HTML.", function() {
    var path = require("path");

    var options = grunt.helper("options", this);
    var data = this.data;
    var jadeData = options.data;

    if (_.isEmpty(jadeData) === false) {
      _.each(jadeData, function(value, key) {
        if (_.isString(value)) {
          jadeData[key] = grunt.template.process(value);
        }
      });
    }

    Object.keys(data.files).forEach(function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);
      var destSource = grunt.file.read( dest );
      var jadeOutput = [];

      srcFiles.forEach(function(srcFile) {
        var jadeOptions = _.extend({filename: srcFile}, options);
        var jadeSource = grunt.file.read(srcFile);
        var id = srcFile.split( "/" ).pop().split( "." ).shift() + "-template";
        var output = grunt.helper("jade", jadeSource, jadeOptions, jadeData);

        if ( output ) {
          jadeOutput.push( "\n<script id='" + id + "' type='text/template'>" + output + "\n</script>" );
        }
      });

      if (jadeOutput.length > 0) {
        jadeOutput = jadeOutput.join( "" );
        destSource = destSource.split( "</body>" ).join( jadeOutput + "\n</body>" );
        
        grunt.file.write(dest, destSource);
        grunt.log.writeln("Added " + srcFiles.length + " templates to '" + dest + "'.");
      }
    });
  });
};
