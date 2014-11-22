'use strict';

var fs = require('fs');
var YAML = require('js-yaml');
var log = require('verbalize');
var Delims = require('delims');
var extend = require('extend-shallow');
var parsers = require('../../lib/parsers');
var utils = require('../../lib/utils');

module.exports = matter;

function matter(str, options) {
  if (typeof str !== 'string') {
    throw new Error('gray-matter expects a string');
  }

  str = str.replace(/^\uFEFF/, '').replace(/\r/g, '');
  var orig = str;
  var data = {};

  var defaults = {delims: ['---', '---'], delimsOpts: {}};
  var opts = extend({autodetect: true, eval: true}, defaults, options);

  if (str.indexOf(opts.delims[0]) !== 0) {
    return {data: {}, content: str, orig: str};
  }

  var delimiters = createDelims(opts.delims, opts.delimsOpts);
  var lang;

  if (opts.autodetect) {
    lang = utils.detectLang(opts.delims[0], str);
    str = utils.stripLang(opts.delims[0], str);
  }

  opts.lang = String(opts.lang || lang || 'yaml');
  var file = str.match(delimiters);

  if (file && file.length === 3) {
    try {
      data = parsers[opts.lang](file[1], opts);
    } catch (e) {
      e.origin = __filename;
      log.warn('Front-matter language not detected by gray-matter', e);
    }
    str = file[2];
  }

  return {data: data, content: str.trim(), orig: orig};
}

matter.read = function(filepath, options) {
  var str = fs.readFileSync(filepath, 'utf8');
  var obj = matter(str, options);
  return extend(obj, {
    path: filepath
  });
};

/**
 * Utility method to create delimiters
 *
 * @api private
 */

function createDelims(arr, options) {
  var delims = new Delims();
  var o = delims.matter(arr, options);
  return o;
}
