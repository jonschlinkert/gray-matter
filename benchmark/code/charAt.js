'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('../../lib/parsers');

/**
 * Expose `matter()`
 */

module.exports = matter;


function matter(str, options) {
  var res = {orig: str, data: {}, content: ''};
  if (str == '') {
    return res;
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  if (str.slice(0, 3) !== '---') {
    return res;
  }

  var opts = extend({lang: 'yaml', eval: true}, options);
  var delim = '---';
  var dlen = delim.length;
  var len = str.length - dlen;
  var i = dlen;

  var langEnd = false, dataEnd = false;
  var data = '', lang = '', next = dlen;

  while (len--) {
    var ch = str.charCodeAt(i);
    if (langEnd === false && ch == 10 /* '\n' */) {
      langEnd = true;
      next = i;
    }

    if (ch === 45 && str.charCodeAt(i + 1) === 45 && str.charCodeAt(i + 2) === 45) {
      dataEnd = true;
      next = i + 2;
    }

    if (langEnd === false) {
      lang += str.charAt(i);
    }

    if (langEnd === true && dataEnd === false) {
      data += str.charAt(i);
    }

    if (dataEnd === true && i > next) {
      res.content += str.charAt(i);
    }
    i++;
  }

  lang = (lang && lang.length > 0)
    ? lang.trim()
    : (opts.lang || 'yaml');

  data = (data && data.length > 0)
    ? data.trim()
    : null;

  if (data && data.length > 0) {
    var fn = parsers[lang];
    if (typeof fn === 'function') {
      // The actual data block to parse
      res.data = fn(data, opts);
    }
  }

  if (data == null) {
    res.data = {};
  }

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
