/**
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

/**
 * Export utils
 */

var utils = module.exports = {};

// Detect the language after the first delim
utils.detectLang = function (delim, content) {
  var re = new RegExp('^' + delim + ' ?([\\S]+)');
  try {
    return content.match(re)[1];
  } catch(e) {
    return;
  }
};

// Strip the language after the first delim
utils.stripLang = function (delim, content) {
  var re = new RegExp('^' + delim + ' ?[\\S]+');
  if (re.test(content)) {
    return content.replace(re, delim);
  } else {
    return content;
  }
};