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

register(['ini', 'toml'], toml);

/**
 * Parse TOML front matter.
 *
 * @param  {String} `str` The string to parse.
 * @param  {Object} `options` Options to pass to [toml-node].
 * @return {Object} Parsed object of data.
 * @api public
 */

function toml(str, opts) {
  try {
    var toml = parser.requires.toml || (parser.requires.toml = require('toml'));
    return toml.parse(str);
  } catch (err) {
    if (opts.strict) {
      throw new SyntaxError(msg('TOML', err));
    } else {
      return {};
    }
  }
};

