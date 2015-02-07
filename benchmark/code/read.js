'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('../../lib/parsers');

/**
 * Expose `matter`
 */

module.exports = matter;



function matter(str, options) {
  var defaults = {orig: str, data: {}, content: str};
  if (str == '') {
    return defaults;
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  // default results
  var opts = extend({eval: true}, options);

  // delimiters to use. defaults are `---`
  var delim1 = '---';
  var delim2 = '---';

  // delimiter lengths
  var alen = delim1.length;
  var blen = delim2.length;

  if (str.slice(0, 3) !== '---') {
    return defaults;
  }

  // index of the first newline
  var nl = str.indexOf('\n');

  // parser language to use
  var lang = str.slice(alen, nl);
  var res = defaults;

  // start/end index of the data block to parse
  var dataStart = (alen + lang.length);
  var dataEnd = str.indexOf(delim2, dataStart);

  // The actual data block to parse
  var data = str.slice(dataStart, dataEnd).trim();

  var fn = opts.parser || parser(lang.trim(), opts);
  if (data.length > 0 && typeof fn === 'function') {
    try {
      res.data = fn(data, opts);
    } catch(err) {}
  } else if (opts.strict) {
    throw new Error('gray-matter cannot find a parser for: ' + str);
  } else {
    res.data = {};
  }

  res.content = str.slice(blen + dataEnd);
  delete res.lang;
  return res;
}

/**
 * Determine the correct the parser to use
 *
 * @param  {String} `lang` Use this if defined and it exists
 * @param  {Object} `opts` Otherwise, fall back to options.parser or js-yaml
 * @return {Function}
 */

function parser(lang, opts) {
  lang = lang || opts.lang;

  if (parsers.hasOwnProperty(lang)) {
    return parsers[lang];
  }

  return parsers.yaml;
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
