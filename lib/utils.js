/**
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

// Detect the language after the first delim
exports.detectLang = function (delim, content) {
  var re = new RegExp('^' + delim + ' ?([\\S]+)');
  try {
    return content.match(re)[1];
  } catch(e) {
    return;
  }
};

// Strip the language after the first delim
exports.stripLang = function (delim, content) {
  var re = new RegExp('^' + delim + ' ?[\\S]+');
  if (re.test(content)) {
    return content.replace(re, delim);
  } else {
    return content;
  }
};
