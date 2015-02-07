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
 *   @option {Array} [options] `delim` Custom delimiters formatted as an array. The default is `['---', '---']`.
 *   @option {Function} [options] `parser` Parser function to use. [js-yaml] is the default.
 * @return {Object} Valid JSON
 * @api public
 */

function matter(str, options) {
  if (typeof str !== 'string') {
    throw new Error('gray-matter expects a string');
  }

  // delimiters
  var delims = arrayify((options && options.delims) || '---');
  var a = delims[0];
  var b = delims[1] || delims[0];

  // get the length of the first delimiter
  var alen = a.length;

  // default results to build up
  var res = {orig: str, data: {}, content: str};

  // strip byte order marks
  str = stripBom(str);

  // if the first delim isn't the first thing, return
  if (str === '' || !isFirst(str, a, alen)) {
    return res;
  }

  // find the index of the next delimiter before
  // going any further. If not found, return.
  var end = str.indexOf(b, alen);
  if (end === -1) {
    return res;
  }

  // detect a language, if defined
  var lang = str.slice(alen, str.indexOf('\n'));
  var start = alen + lang.length;

  var opts = options || {};
  opts.lang = opts.lang || 'yaml';

  lang = (lang && lang.trim()) || opts.lang;

  // get the front matter
  var data = str.slice(start, end).trim();
  if (data) {
    // if data exists, see if we have a matching parser
    var fn = opts.parser || parsers[lang];
    if (typeof fn === 'function') {
      res.data = fn(data, opts);
    } else {
      throw new Error('gray-matter cannot find a parser for: ' + str);
    }
  }

  res.content = str.slice(end + b.length);
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

/**
 * Return true if the given `string` has front matter.
 *
 * @param  {String} `string`
 * @param  {Object} `options`
 * @return {Boolean} True if front matter exists.
 */

matter.test = function(str, options) {
  var delim = arrayify(options && options.delims || '---')[0];
  return isFirst(str, delim);
};

/**
 * Return true if the given `ch` the first
 * thing in the string.
 */

function isFirst(str, ch, len) {
  return str.slice(0, len || ch.length) === ch;
}

/**
 * Utility to strip byte order marks
 */

function stripBom(str) {
  if (str.charAt(0) === '\uFEFF') {
    return str.slice(1);
  }
  return str;
}

/**
 * Typecast `val` to an array.
 */

function arrayify(val) {
  return !Array.isArray(val)
    ? [val]
    : val;
}
