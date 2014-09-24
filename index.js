/*!
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
var extend = require('mixin-deep');

var parsers = require('./lib/parsers');
var utils = require('./lib/utils');


/**
 * Expects a string and returns and object:
 *
 * ```js
 * matter('---\ntitle: Blog\n---\nThis is content.');
 * ```
 *
 * Returns:
 *
 * ```json
 * {
 *   "data": {"title": "Blog"},
 *   "content": "This is content.",
 *   "original": "---\ntitle: Blog\n---\nThis is content."
 * }
 * ```
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
  var orig = str,
    data = {};

  var defaults = {
    delims: ['---', '---'],
    delimsOpts: {}
  };

  var opts = extend({}, defaults, options);

  var delimiters = createDelims(opts.delims, opts.delimsOpts);
  var lang;

  if (opts.autodetect) {
    lang = utils.detectLang(opts.delims[0], str);
    str = utils.stripLang(opts.delims[0], str);
  }

  opts.lang = String(opts.lang || lang || 'yaml');
  var file = str.match(delimiters);

  if (file && file.length === 3) {
    try {
      data = parsers[opts.lang](file[1], opts);
    } catch (e) {
      e.origin = __filename;
      log.warn('Front-matter language not detected by gray-matter', e);
    }
    str = file[2];
  }

  return {
    data: data,
    content: str.trim(),
    orig: orig
  };
}


/**
 * Read a file then pass the string and `options` to `matter()` for parsing:
 *
 * ```js
 * matter.read('file.md');
 * ```
 *
 * Returns something like:
 *
 * ```json
 * {
 *   "data": {"title": "Blog"},
 *   "content": "This is content.",
 *   "original": "---\ntitle: Blog\n---\nThis is content."
 * }
 * ```
 *
 * @param  {String} `filepath`
 * @param  {Object} `options`
 * @return {Object} `file` Same object as `matter()`, with an additional `path` property
 * @api public
 */

matter.read = function (filepath, options) {
  var opts = extend({
    enc: 'utf8'
  }, options);
  var obj = matter(fs.readFileSync(filepath, opts.enc), opts);
  return extend(obj, {
    path: filepath
  });
};

/**
 * Return `true` if front-matter exists.
 *
 * ```js
 * matter.exists(str);
 * ```
 *
 * @param  {String} `str` The string to parse
 * @param  {Object} `options` Options to pass to `matter()`
 * @return {Boolean} `true` or `false`
 * @api public
 */

matter.exists = function (str, options) {
  var obj = matter(str, options).data;
  return Object.keys(obj).length > 0;
};

/**
 * Extend and stringify **YAML** front matter. Takes an object as the
 * second parameter, and returns either the extended, stringified
 * object (YAML), or if no front matter is found an empty string
 * is returned.
 *
 * ```js
 * matter.extend(str, obj);
 * ```
 * @param  {String} `str` The string to parse
 * @param  {Object} `obj` The object to use to extend the front matter.
 * @return {String} String with extended YAML front matter.
 * @api public
 */

matter.extend = function (str, obj) {
  if (matter.exists(str)) {
    var data = extend({}, matter(str).data, obj);
    var yaml = matter.toYAML(data);
    return '---\n' + yaml + '---';
  }
  return '';
};

/**
 * A convenience wrapper around the `matter()` and `matter.extend()`
 * methods.
 *
 * Extends YAML front matter, then re-assembles front matter with
 * the content of the file.
 *
 * ```js
 * matter.reconstruct(str, obj);
 * ```
 * @param  {String} `str` The string to parse
 * @param  {Object} `obj` The object to use to extend the front matter.
 * @return {String} Original string with extended front matter.
 * @api public
 */

matter.reconstruct = function (str, obj) {
  var front = matter.extend(str, obj);
  var content = matter(str).content;
  return [front, content].join('\n');
};

/**
 * Convenience wrapper around the `matter(str).data()` method.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {Object} Parsed front matter as JSON.
 * @api public
 */

matter.toJSON = function (str, options) {
  return matter(str, options).data;
};

/**
 * Stringify parsed front matter back to YAML.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @return {String} Stringified YAML.
 * @api public
 */

matter.toYAML = function (obj) {
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
