/**!
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var YAML = require('js-yaml');
var log = require('verbalize');
var Delims = require('delims');

var _ = require('lodash');

var parsers = require('./lib/parsers');
var utils = require('./lib/utils');


/**
 * Parse front matter from the given `str` and return an object
 * with `data`, `content` and the `original` string.
 *
 * @param {String} `str` The string to parse
 * @param {Object} `options` Object of options
 *   @option {Array} [option] `delims` Define custom delimiters to use as an array, e.g. `['~~~', '~~~']`
 *   @option {Boolean} [option] `autodetect` If `true` will attempt to use the parser `lang` defined after the first front matter fence.
 * @return {Object} `file` Object with the following properties.
 *   @property {Object} [file] `data` Parsed front matter
 *   @property {String} [file] `content` The content of the file, excluding front-matter
 *   @property {String} [file] `orig` The original, un-parsed content of the file, including front-matter.
 * @api public
 */

function matter(str, options) {
  str = str.replace(/^\uFEFF/, '').replace(/\r/g, '');

  var orig = str;
  var data = {};

  var opts = _.defaults({}, options, {
    delims: ['---', '---'],
    delimsOpts: {}
  });

  var delimiters = createDelims(opts.delims, opts.delimsOpts);

  var lang;
  if(opts.autodetect) {
    lang = utils.detectLang(opts.delims[0], str);
    str = utils.stripLang(opts.delims[0], str);
  }

  opts.lang = String(opts.lang || lang || 'yaml');
  var file = str.match(delimiters);

  if (file && file.length === 3) {
    try {
      data = parsers[opts.lang](file[1], opts);
    } catch(e) {
      e.origin = __filename;
      log.warn('Front-matter language not detected by gray-matter', e);
    }
    str = file[2];
  }

  return {data: data, content: str.trim(), orig: orig};
}


/**
 * Read a file then pass the string and `options` to `matter()`.
 *
 * @param  {String} `filepath` The file to parse.
 * @param  {Object} `options` Options to pass to `matter`
 * @return {Object} `file` Same object as `matter`, with one additional property, `path`
 * @api public
 */

matter.read = function(filepath, options) {
  var opts = _.extend({}, options);
  var obj = matter(fs.readFileSync(filepath, 'utf8'), opts);
  return _.extend(obj, {path: filepath});
};


/**
 * Return `true` if front-matter exists.
 *
 * @param  {String} `str` The string to parse
 * @param  {Object} `options` Options to pass to `matter()`
 * @return {Boolean} `true` or `false`
 * @api public
 */

matter.exists = function(str, options) {
  var obj = matter(str, options).data;
  return _.keys(obj).length > 0;
};


/**
 * Parse YAML front matter from `str` and extend it with the
 * given `obj`, then return a string of YAML front matter.
 *
 * @param  {String} `str` The string to parse
 * @param  {Object} `obj` The object to use to extend the front matter.
 * @return {String} Extended YAML front matter.
 * @api public
 */

matter.extend = function(str, obj) {
  if(matter.exists(str)) {
    var data = _.extend({}, matter(str).data, obj);
    var yaml = matter.toYAML(data);
    return '---\n' + yaml + '---';
  } else {
    return '';
  }
};


/**
 * Same as `.extend()`, but this method also adds the original
 * content string back as well.
 *
 * @param  {String} `str` The string to parse
 * @param  {Object} `obj` The object to use to extend the front matter.
 * @return {String} Original string with extended front matter.
 * @api public
 */

matter.reconstruct = function(str, obj) {
  var front = matter.extend(str, obj);
  var content = matter(str).content;
  return [front, content].join('\n');
};


/**
 * Stringify front matter to JSON.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {Object} Parsed front matter as JSON.
 */

matter.toJSON = function(str, options) {
  return matter(str, options).data;
};

/**
 * Stringify front matter to YAML.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String} Stringified YAML.
 */

matter.toYAML = function(obj) {
  return YAML.dump(obj);
};


/**
 * Utility method to create delimiters
 *
 * @api private
 */

function createDelims(arr, options) {
  var delims = new Delims();
  return delims.create(arr, options).evaluate;
}


/**
 * Expose `matter`
 *
 * @type {Object}
 */

module.exports = matter;
