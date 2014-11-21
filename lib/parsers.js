/**
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';


/**
 * Module dependencies
 */

var log = require('verbalize');
var extend = require('extend-shallow');


/**
 * Expose `parser`
 */

var parser = module.exports;


/**
 * Requires cache.
 */

var requires = {};


/**
 * Parse YAML front matter
 *
 * @param  {String} `str` The string to parse.
 * @param  {Object} `options` Options to pass to [js-yaml].
 * @return {Object} Parsed object of data.
 * @api public
 */

parser.yaml = function(str, options) {
  var data = {};
  try {
    var YAML = requires.yaml || (requires.yaml = require('js-yaml'));
    data = YAML.safeLoad(str, options);
  } catch (err) {
    log.error('  [gray-matter] json:', log.bold(err));
  }
  return data;
};


/**
 * Parse JSON front matter
 *
 * @param  {String} `str` The string to parse.
 * @return {Object} Parsed object of data.
 * @api public
 */

parser.json = function(str) {
  var data = {};
  try {
    data = JSON.parse(str);
  } catch (err) {
    log.error('  [gray-matter] json:', log.bold(err));
  }
  return data;
};


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
 * ```coffee
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

parser.javascript = function(str, options) {
  var opts = extend({wrapped: true, eval: false}, options);

  if (opts.eval) {
    var fn = str;
    if (opts.wrapped) {
      fn = 'function data() {return { ' + str + '} } data();';
    }

    var data = {};
    try {
      data = eval(fn);
    } catch (err) {
      log.error('  [gray-matter] javascript:', log.bold(err));
    }
    return data;
  } else {
    var msg = 'to parse javascript, you must set `options.eval` to `true`';
    log.error('  [gray-matter] javascript:', log.bold(msg));
  }
};


/**
 * Alias for `parse.javascript()`.
 *
 * @api public
 */

parser.js = parser.javascript;


/**
 * Parse Coffee-Script front matter. To use coffee front-matter, you must
 * set `options.eval` to `true`.
 *
 * @param  {String} `str` The string to parse.
 * @param  {Object} `options` Options to pass to [coffee-script].
 * @return {Object} Parsed object of data.
 * @api public
 */

parser.coffee = function(str, options) {
  var opts = extend({eval: false}, options);

  if (opts.eval) {
    try {
      var coffee = requires.coffee || (requires.coffee = require('coffee-script'));
      return coffee['eval'](str, options);
    } catch (e) {
      log.error('  [gray-matter] coffee-script:', log.bold(e));
    }
  } else {
    var msg = 'to parse Coffee-Script, you must set `options.eval` to `true`';
    log.error('  [gray-matter] coffee:', log.bold(msg));
  }
};


/**
 * Alias for `parse.coffee()`.
 *
 * @api public
 */

parser.cson = parser.coffee;


/**
 * Parse TOML front matter.
 *
 * @param  {String} `str` The string to parse.
 * @param  {Object} `options` Options to pass to [toml-node].
 * @return {Object} Parsed object of data.
 * @api public
 */

parser.toml = function(str) {
  try {
    var toml = requires.toml || (requires.toml = require('toml'));
    return toml.parse(str.trim());
  } catch (e) {
    log.error('  [gray-matter] TOML:', log.bold(e));
  }
};
