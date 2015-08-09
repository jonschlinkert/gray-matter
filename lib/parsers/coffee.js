/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var extend    = require('extend-shallow');
var parser    = module.exports = require('./parsers');
var msg       = require('./msg');
var evalError = require('./eval-error');
var register  = parser;

register(['cson', 'coffee', 'coffee-script', 'coffeescript'], coffee);

/**
 * Parse Coffee-Script front matter. To use coffee front-matter, you must
 * set `options.eval` to `true`.
 *
 * @param  {String} `str` The string to parse.
 * @param  {Object} `options` Options to pass to [coffee-script].
 * @return {Object} Parsed object of data.
 * @api public
 */

function coffee(str, options) {
  var opts = extend({eval: false, strict: false}, options);
  if (opts.eval) {
    try {
      var coffee = parser.requires.coffee || (parser.requires.coffee = require('coffee-script'));
      return coffee['eval'](str, options);
    } catch (err) {
      throw new SyntaxError(msg('coffee-script', err));
    }
  } else {

    // if `eval` isn't set
    if (opts.strict) {
      throw new Error(evalError('coffee'));
    } else {
      console.error(evalError('coffee', true));
    }
  }
};
