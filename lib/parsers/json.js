/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend  = require('extend-shallow');
var parser  = module.exports = require('./parsers');
var msg     = require('./msg');
var register= parser;

register('json', json);

/**
 * Parse JSON front matter
 *
 * @param  {String} `str` The string to parse.
 * @return {Object} Parsed object of data.
 * @api public
 */

function json(str, options) {
  var opts = extend({strict: false}, options);
  try {
    return JSON.parse(str);
  } catch (err) {
    if (opts.strict) {
      throw new SyntaxError(msg('JSON', err));
    } else {
      return {};
    }
  }
};


