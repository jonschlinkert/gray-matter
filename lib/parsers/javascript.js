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

register(['js', 'javascript'], javascript);

/**
 * Parse JavaScript front matter. To use javascript front-matter, you must
 * set `options.eval` to `true`.
 *
 * By default, javascript code is wrapped in a function that is immediately
 * executed when the parser is called. Thus, to be returned as a useful object,
 * code should be written as object properties.
 *
 * **Example:**
 *
 * ```markdown
 * ---js
 * title: 'autodetect-javascript',
 * // this function won't be invoked when the parser is called
 * fn: {
 *   reverse: function(str) {
 *     return str.split('').reverse().join('');
 *   }
 * }
 * ---
 * ```
 *
 * @param  {String} `str` The string to parse.
 * @param  {Object} `options` Set `options.wrapped` to `false` to enable writing raw, un-wrapped javascript.
 * @return {Object} Parsed object of data.
 * @api public
 */

function javascript(str, options) {
  var opts = extend({wrapped: true, eval: false, strict: false}, options);
  if (opts.eval) {
    if (opts.wrapped) {
      str = 'function data() {return {' + str + '}; } data();';
    }
    try {
      return eval(str);
    } catch (err) {
      throw new SyntaxError(msg('javascript', err));
    }
    return {};
  } else {

    // if `eval` isn't set
    if (opts.strict) {
      throw new Error(evalError('javascript'));
    } else {
      console.error(evalError('javascript', true));
    }
  }
};
