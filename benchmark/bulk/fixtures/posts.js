'use strict';

var fs = require('fs');
var path = require('path');

var fp = path.join(process.cwd(), 'vendor/bootstrap-blog/_posts');
if (!fs.existsSync(fp)) {
  var msg = [
    '  to run this benchmark you need to pull down the',
    '  the bootstrap-blog first. To do so, run:',
    '  git clone https://github.com/twbs/bootstrap-blog.git "vendor/bootstrap-blog"',
  ].join('\n');
  console.log(msg);
  process.exit(0);
}

module.exports = [lookup(fp)];

function lookup(dir) {
  var files = fs.readdirSync(dir);
  var len = files.length;
  var res = [];

  while (len--) {
    var fp = path.join(dir, files[len]);
    var isFile = fs.statSync(fp).isFile();

    if (isFile) {
      res.push(fs.readFileSync(fp, 'utf8'));
    }
  }

  // console.log('module.exports = [' + JSON.stringify(res) + '];');
  return res;
}
