'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('../../lib/parsers');

/**
 * Expose `matter()`
 */

module.exports = matter;

function matter(str, options) {
  if (str.length === 0) {
    return {orig: '', data: {}, content: ''};
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  // default results
  var opts = extend({lang: 'yaml', eval: true}, options);
  var res = {orig: str, data: '', content: ''};
  var delim = opts.delims || ['---', '---'];

  // make sure the starting delim is first thing
  if (str.slice(0, delim[0].length) !== delim[0]) {
    res.content = str;
    res.data = {};
    delete res.lang;
    return res;
  }

  var len = delim[0].length;

  // index of the first newline
  var nl = str.indexOf('\n');

  // parser language to use
  var lang = str.slice(len, nl).trim() || opts.lang;

  // start/end index of the data block to parse
  var dataStart = nl + 1;
  var dataEnd = str.indexOf(delim[0], dataStart);

  // The actual data block to parse
  var data = str.slice(dataStart, dataEnd).trim();
  if (data.length > 0) {
    res.data = parsers[lang](data, opts);
  }

  res.content = str.slice(len + dataEnd).trim();
  delete res.lang;
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
