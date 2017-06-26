'use strict';

const fs = require('fs');
const parse = require('./lib/parse');
const defaults = require('./lib/defaults');
const stringify = require('./lib/stringify');
const excerpt = require('./lib/excerpt');
const utils = require('./lib/utils');
const File = require('./lib/file');
const cache = {};

function matter(input, options) {
  const file = new File(input);
  let str = file.content;

  if (str === '') return file;
  if (typeof options === 'undefined') {
    if (cache[str]) {
      return cache[str];
    }
    cache[str] = file;
  }

  // support "options.delims" for backward compatibility
  const opts = defaults(options);
  const open = opts.delimiters[0];
  const close = '\n' + opts.delimiters[1];

  if (opts.language) {
    file.language = opts.language;
  }

  const openLen = open.length;
  if (!utils.startsWith(str, open, openLen)) {
    excerpt(file, opts);
    return file;
  }

  const nextChar = str.charAt(openLen + 1);
  if (nextChar === open.slice(-1)) {
    return file;
  }

  str = str.slice(openLen);
  var len = str.length;

  // use the language defined after first delimiter, if it exists
  var language = matter.language(str, opts);
  if (language.name) {
    file.language = language.name;
    str = str.slice(language.raw.length);
  }

  // get the index of the closing delimiter
  let closeIndex = str.indexOf(close);
  if (closeIndex === -1) {
    closeIndex = len;
  }

  // get the raw front-matter block
  file.matter = str.slice(0, closeIndex);

  // create file.data by parsing the raw file.matter block
  file.data = parse(file.language, file.matter, opts);

  // update file.content
  if (closeIndex !== len) {
    file.content = str.slice(closeIndex + close.length);
    if (file.content.charAt(0) === '\r') {
      file.content = file.content.slice(1);
    }
    if (file.content.charAt(0) === '\n') {
      file.content = file.content.slice(1);
    }
  } else {
    file.content = '';
  }

  excerpt(file, opts);
  return file;
}

/**
 * Get the excerpt from a string. An excerpt is a delimited block
 * of content that is the first thing in a file, or directly
 * follows the front matter.
 *
 * @param {[type]} str
 * @param {[type]} options
 * @return {[type]}
 * @api public
 */

matter.excerpt = function(file, options) {
  return excerpt(file, options);
};

/**
 * Stringify an object to front-matter-formatted YAML, and
 * concatenate it to the given string.
 *
 * ```js
 * matter.stringify('foo bar baz', {title: 'Home'});
 *
 * // results in:
 * // ---
 * // title: Home
 * // ---
 * // foo bar baz
 * ```
 * @param {String|Object} `file` The content string to append to stringified front-matter, or a file object with `file.content` string.
 * @param {Object} `data` Front matter to stringify.
 * @param {Object} `options` Options to pass to js-yaml
 * @return {String}
 * @api public
 */

matter.stringify = function(file, data, options) {
  return stringify.apply(null, arguments);
};

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

matter.read = function(filepath, options) {
  const str = fs.readFileSync(filepath, 'utf8');
  const obj = matter(str, options);
  obj.path = filepath;
  return obj;
};

/**
 * Returns true if the given `string` has front matter.
 *
 * @param  {String} `string`
 * @param  {Object} `options`
 * @return {Boolean} True if front matter exists.
 */

matter.test = function(str, options) {
  const opts = defaults(options);
  return utils.startsWith(str, opts.delimiters[0]);
};

/**
 * Detect the language to use, if one is defined after the
 * first front-matter delimiter.
 *
 * @param  {String} `string`
 * @param  {Object} `options`
 * @return {Object} Object with `raw` (actual language string), and `name`, the language with whitespace trimmed
 * @api public
 */

matter.language = function(str, options) {
  const opts = defaults(options);
  const open = opts.delimiters[0];

  if (matter.test(str)) {
    str = str.slice(open.length);
  }

  const language = str.slice(0, str.search(/\r?\n/));
  const langLen = language ? language.length : 0;
  return {
    raw: language,
    name: language ? language.trim() : ''
  };
};

/**
 * Expose `matter`
 */

module.exports = matter;
