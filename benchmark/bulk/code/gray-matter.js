'use strict';

var matter = require('../../..');

module.exports = function (arr) {
  var len = arr.length;
  var res = [];

  while (len--) {
    res.push(matter(arr[len], {eval: true}));
  }

  // console.log(res)
  return res;
};
