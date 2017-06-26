'use strict';

var frontMatter = require('front-matter');

module.exports = function(arr) {
  var len = arr.length;
  var res = [];
  while (len--) {
    res.push(frontMatter(arr[len]));
  }
  return res;
};
