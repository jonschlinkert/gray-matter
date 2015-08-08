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

register('yaml', yaml);

/**
 * Parse YAML front matter
 *
 * @param  {String} `str` The string to parse.
 * @param  {Object} `options` Options to pass to [js-yaml].
 * @return {Object} Parsed object of data.
 * @api public
 */

function yaml(str, options) {
  var opts = extend({strict: false, safeLoad: false}, options);
  try {
    var YAML = parser.requires.yaml || (parser.requires.yaml = require('./js-yaml'));
    return opts.safeLoad ? YAML.safeLoad(str, options) : YAML.load(str, options);
  } catch (err) {
    if (opts.strict) {
      throw new SyntaxError(msg('js-yaml', err));
    } else {
      return {};
    }
  }
};

