'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('../../lib/parsers');

module.exports = matter;

function matter(str, options) {
  if (str.length === 0) {
    return {orig: '', data: {}, content: ''};
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  var o = {data: {}, content: '', orig: str};
  var opts = extend({lang: 'yaml', eval: true}, options);
  var delim = opts.delims || ['---', '---'];

  // make sure the starting delim is first thing
  if (str.slice(0, delim[0].length) !== delim[0]) {
    return {orig: str, data: {}, content: str};
  }

  var len = delim[0].length;
  var ch = len;
  var language, lang = '';

  while ((language = str.charAt(ch++)) !== '\n') {
    lang += language;
  }

  var ll = lang.length;
  var to = str.indexOf(delim[0], len);
  lang = (lang || opts.lang).trim();

  var fn = parsers[lang];
  var data = str.substr(len + ll, to - ll - len);
  if (fn && data.length > 0) {
    o.data = fn(data, opts);
  } else {
    o.data = str.substr(len + ll, to - ll - len);
  }

  if (typeof o.data !== 'object') {
    throw new Error('gray-matter cannot parse: ' + o.data);
  }

  o.content = str.substr(to + len).trim();
  return o;
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
