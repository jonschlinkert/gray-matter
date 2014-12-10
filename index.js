'use strict';

var fs = require('fs');
var extend = require('extend-shallow');

/**
 * Expose `matter()`
 *
 * @type {Function}
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

  str = str.replace(/^\uFEFF/, '').replace(/\r/g, '');
  var o = {lang: '', data: {}, content: '', orig: str};
  var opts = extend({lang: 'yaml'}, options);
  var delims = opts.delims || ['---', '---'];

  var i = str.indexOf(delims[0]);
  if (i !== 0) {
    o.content = str;
    delete o.lang;
    return o;
  }

  var len1 = delims[0].length;
  var len2 = delims[1].length;
  var ch = len1;
  var lang;

  while ((lang = str.charAt(ch++)) !== '\n') {
    o.lang += lang;
  }
  var ll = o.lang.length;
  var to = str.indexOf(delims[1], len1);
  o.lang = (o.lang || opts.lang).trim();
  var fn = opts.parser || parsers[o.lang];

  if (fn) {
    o.data = fn(str.substr(len1 + ll, to - ll - len2), opts);
  } else {
    throw new Error('gray-matter cannot find a parser for: ' + str);
  }

  return {
    orig: o.orig,
    data: o.data,
    content: str.substr(to + len2).trim()
  };
}

/**
 * Expose `parsers`
 *
 * @type {Object}
 */

var parsers = matter.parsers = require('./lib/parsers');

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
