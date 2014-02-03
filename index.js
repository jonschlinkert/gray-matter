/**
 * Gray Matter
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var YAML = require('js-yaml');
var delims = require('delims');
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var parsers = require('./lib/parsers');
var utils = require('./lib/utils');

// Parse the given string
function matter(src, options) {
  var opts = _.extend({delims: ['---','---'], lang: 'yaml'}, options);

  var metadata = {};
  var content = src;
  var delimiters = delims(opts.delims).evaluate;

  // If true, will attempt to detect and register
  // the correct parser based on the returned string
  if(opts.autodetect) {
    opts.lang = utils.detectLang(opts.delims[0], content);
    content = content.replace(opts.lang, '');
  }

  // File object
  var fileObject = content.match(delimiters);
  if (fileObject && fileObject.length === 3) {
    try {
      metadata = parsers[opts.lang](fileObject[1]);
    } catch(e) {
      e.origin = __filename;
      console.warn('Front-matter language not detected by gray-matter', e);
    }
    content = fileObject[2];
  }

  return {
    context: metadata,
    content: content,
    original: src
  };
};

// Read the file, then parse
matter.read = function(src, options) {
  return matter(file.readFileSync(src, options), options);
};

// Does YAML front matter exist?
matter.exists = function(src, options) {
  var obj = matter.read(src, options).context;
  return _.keys(obj).length > 0;
};

// Stringify to jSON
matter.stringifyJSON = function(src, options) {
  return matter(src, options).context;
};

// Stringify to YAML
matter.stringifyYAML = function(src, options) {
  var front = matter(src, options).context;
  return YAML.dump(front);
};

module.exports = matter;