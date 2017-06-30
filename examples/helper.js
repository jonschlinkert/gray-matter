/**
 * this is not an example. this is a helper used to generate
 * the list of links to examples in the readme.
 */

var fs = require('fs');
var path = require('path');

module.exports = function() {
  var files = fs.readdirSync(__dirname);
  var links = [];
  for (var i = 0; i < files.length; i++) {
    var name = files[i];
    var ext = path.extname(name);
    var stem = path.basename(name, ext);
    if (stem !== 'helper' && ext === '.js') {
      links.push('- [' + stem + '](examples/' + name + ')');
    }
  }
  return links.join('\n');
};
