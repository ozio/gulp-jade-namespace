'use strict';

var path    = require('path');
var through = require('through2');
var err     = require('gulp-util').PluginError;
var extend  = require('util')._extend;

function getTemplateName(file){
  return file.path.replace(file.base, '').slice(0, -3);
};

function replaceJadeStarts(file, new_prefix) {
  var old_string = file.contents.toString();
  var before_position = old_string.search('{');
  var new_string = new_prefix + old_string.slice(before_position);

  console.log(new_string);
  file.contents = new Buffer(new_string)
}

function gulpNamespace(options) {
  var defaults = {
    namespace:  'Templates',
    compressed: false,
    global:     true
  };

  options = extend( defaults, options ? options : {} );

  var variable =
        options.global
          ? "window[\"" + options.namespace + "\"]"
          : "" + options.namespace + "";

  var global_prefix =
        options.compressed
          ? ";" + variable + "=" + variable + "||{};"
          : ";" + variable + " = " + variable + " || {};\n";

  return through.obj(function(file, enc, cb) {
    if(file.isNull()) {
      cb(null, file);
    }

    if(file.isStream()) {
      cb(new gutil.PluginError('gulp-jade-namespace', 'Streaming not supported'));
    }

    if(file.isBuffer()) {
      var template_name = getTemplateName(file)
      var template_prefix =
            options.compressed
              ? "" + variable + "[\"" + template_name + "\"]=function(locals)"
              : "" + variable + "[\"" + template_name + "\"] = function(locals) ";

      replaceJadeStarts(file, global_prefix + template_prefix)
    }

    cb(null, file)
  });
}

module.exports = gulpNamespace;