/**
 * Gray Matter
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var delim = require('delims');
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var parse = require('./lib/parsers');


// Parse the given string
var matter = function (src, options) {
  var opts = _.extend({delims: ['---','---'], format: 'yaml'}, options)

  var metadata = {};
  var content = src;
  var delimiters = delim(opts.delims).evaluate;

  // File object
  var fileObject = content.match(delimiters);

  if (fileObject && fileObject.length === 3) {
    metadata = parse[opts.format](fileObject[1]);
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

module.exports = matter;