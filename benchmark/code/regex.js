var fs = require('fs');
var yaml = require('js-yaml');
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

  var match = matchDelims(str);
  var lang = match && match[2].trim();
  return !match ? {orig: str, data: {}, content: str} : {
    orig: str,
    data: lang.length > 0
      ? parsers[lang in parsers ? lang : 'yaml'](lang)
      : {},
    content: str.replace(match[0], '')
  };
}

function matchDelims(str) {
  return /---([^\n]*)([\s\S]*?)\s*---\s*/.exec(str);
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
