'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('../../lib/parsers');

/**
 * Expose `matter()`
 */

module.exports = matter;


function matter(str, options) {
  if (str === '') {
    return {orig: '', data: {}, content: ''};
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  if (str.slice(0, 3) !== '---') {
    return {orig: str, data: {}, content: str};
  }

  var res = {orig: str, data: '', content: ''};
  var opts = extend({lang: 'yaml', eval: true}, options);

  // delimiters to use. defaults are `---`
  var delim = '---';
  var lang = '';
  var lines = str.split('\n');
  var len = lines.length;
  var dlen = delim.length;
  var hasLang = false;

  var limit = 0;
  var num = 0;
  var i = 0;
  var start = 0;
  var count = 0;
  var end = 0;

  while (len--) {
    var line = lines[i++];
    if (line.slice(0, dlen) === delim) {
      if (hasLang === false) {
        lang = line.slice(dlen).trim();
        hasLang = true;
      }
      start = i + 1;
      count++;
    }

    if (i >= start && count === 1) {
      res.data += line + '\n';
    }

    if (end !== 0 && i > end) {
      res.content += line + '\n';
    }

    if (count === 2) {
      end = i;
    }
  }

  // The actual data block to parse
  var data = res.data.trim();
  if (data.length > 0) {
    var fn = parsers[lang || opts.lang];
    if (typeof fn === 'function') {
      res.data = fn(data, opts);
    } else {
      res.data = {};
    }
  } else {
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
