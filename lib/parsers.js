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

var extend = require('extend-shallow');


/**
 * Expose `parser`
 */

var parser = module.exports;


/**
 * Requires cache.
 */

parser.requires = {};


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
    var YAML = parser.requires.yaml || (parser.requires.yaml = require('js-yaml'));
    data = YAML.safeLoad(str, options);
  } catch (err) {
    throw new Error('gray-matter parser [js-yaml]:' + err);
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
    throw new Error('gray-matter cannot parse JSON: ' + str);
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
      throw new Error('gray-matter parser [javascript]:' + err);
    }
    return data;
  } else {
    throw new Error('gray-matter: to parse javascript set `options.eval` to `true`');
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
      var coffee = parser.requires.coffee || (parser.requires.coffee = require('coffee-script'));
      return coffee['eval'](str, options);
    } catch (err) {
      throw new Error('gray-matter parser [coffee-script]:' + err);
    }
  } else {
    throw new Error('gray-matter: to parse coffee set `options.eval` to `true`');
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
    var toml = parser.requires.toml || (parser.requires.toml = require('toml'));
    return toml.parse(str.trim());
  } catch (err) {
    throw new Error('gray-matter parser [toml]:' + err);
  }
};
