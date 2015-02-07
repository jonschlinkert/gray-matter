
var matter = require('../..');

module.exports = function (str) {
  return matter(str, {eval: true});
};
