/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';


/**
 * add the the new front matter parser
 * @param  {String|ArrayOf(String)} `langs` The parser's language name.
 * @param  {Function} `process` The parser's process function.
 *
 */

var parsers = module.exports = function(langs, process) {
  if (langs && typeof process === 'function') {
    langs = arrayify(langs);
    langs.forEach(function(lang){
      parsers[lang] = process;
    })
  }
}

/**
 * Requires cache.
 */

parsers.requires = {};

/**
 * Typecast `val` to an array.
 */

function arrayify(val) {
  return !Array.isArray(val) ? [val] : val;
}



