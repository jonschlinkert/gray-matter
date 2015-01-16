'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('./lib/parsers');

/**
 * Expose `matter()`
 */

module.exports = matter;

/**
 * Parses a `string` of front-matter with the given `options`,
 * and returns an object.
 *
 * ```js
 * matter('---\ntitle: foo\n---\nbar');
 * //=> {data: {title: 'foo'}, content: 'bar', orig: '---\ntitle: foo\n---\nbar'}
 * ```
 *
 * @param {String} `string` The string to parse.
 * @param {Object} `options`
 *   @option {Array} [options] `delims` Custom delimiters formatted as an array. The default is `['---', '---']`.
 *   @option {Function} [options] `parser` Parser function to use. [js-yaml] is the default.
 * @return {Object} Valid JSON
 * @api public
 */

function matter(str, options) {
  if (typeof str !== 'string') {
    throw new Error('gray-matter expects a string');
  }

  if (str === '') {
    return {orig: '', data: {}, content: ''};
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  var opts = extend({lang: 'yaml', delims: ['---', '---']}, options);
  var res = {orig: str, data: {}, content: str};

  var first = str.slice(0, opts.delims[0].length);
  if (first !== opts.delims[0]) {
    return res;
  }

  var delims = opts.delims;
  var d1len = delims[0].length;
  var d2len = delims[1].length;
  var len = str.length;

  // start the character search after the first fence
  var ch = d1len;
  var language = '', lang = '';

  // detect the language, if any, after the first fence
  while ((language = str.charAt(ch++)) !== '\n') {
    lang += language;

    if (ch === len) {
      throw new Error('[gray-matter]: bad formatting, no newlines detected.');
    }
  }

  // find the index of the next fence
  var end = str.indexOf(delims[1], d1len);

  // get the length of the actual string following the fence
  var ll = lang.length;

  // format the language to use for parsing
  lang = (lang ? lang.trim() : opts.lang).toLowerCase();

  // if it exists, `data` is a string at this point
  var data = str.slice(d1len + ll, end).trim();
  if (data.length > 0) {
    // if data exists, see if we have a matching parser
    var fn = opts.parser || parsers[lang];
    if (typeof fn === 'function') {
      res.data = fn(data, opts);
    } else {
      throw new Error('gray-matter cannot find a parser for: ' + str);
    }
  }

  res.content = str.substr(end + d2len).trim();
  return res;
}

/**
 * Expose `parsers`
 *
 * @type {Object}
 */

matter.parsers = parsers;

/**
 * Requires cache
 */

var YAML = matter.parsers.requires.yaml || (matter.parsers.requires.yaml = require('js-yaml'));

/**
 * Read a file and parse front matter. Returns the same object
 * as `matter()`.
 *
 * ```js
 * matter.read('home.md');
 * ```
 *
 * @param {String} `fp` file path of the file to read.
 * @param {Object} `options` Options to pass to gray-matter.
 * @return {Object}
 * @api public
 */

matter.read = function(fp, options) {
  var str = fs.readFileSync(fp, 'utf8');
  var obj = matter(str, options);
  return extend(obj, {
    path: fp
  });
};

/**
 * Stringify an object to front-matter-formatted YAML, and
 * concatenate it to the given string.
 *
 * ```js
 * matter.stringify('foo bar baz', {title: 'Home'});
 * ```
 * Results in:
 *
 * ```yaml
 * ---
 * title: Home
 * ---
 * foo bar baz
 * ```
 *
 * @param {String} `str` The content string to append to stringified front-matter.
 * @param {Object} `data` Front matter to stringify.
 * @param {Object} `options` Options to pass to js-yaml
 * @return {String}
 * @api public
 */

matter.stringify = function(str, data, options) {
  var res = '';
  res += '---\n';
  res += YAML.safeDump(data, options);
  res += '---\n';
  res += str;
  res += '\n';
  return res;
};
