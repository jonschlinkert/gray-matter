/**
 * Gray Matter
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
  var re = new RegExp('^(?:' + delim + ')\s*(.+)\n');
  try {
    return content.match(re)[1].replace(/^\s+/, '');
  } catch(e) {
    return 'yaml';
  }
};