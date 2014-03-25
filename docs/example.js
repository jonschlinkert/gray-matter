const path = require('path');
const file = require('fs-utils');
const _ = require('lodash');
const matter = require('../');
const utils = require('../lib/utils');


var opts = {
  filter: 'isFile',
  cwd: 'test/fixtures',
  autodetect: true
};


function createPageObject(src, opts) {
  var pages = [];
  file.expand(src, opts).forEach(function(filepath) {
    filepath = path.join(opts.cwd, filepath);
    var str = file.readFileSync(filepath);
    pages.push(matter(str, opts));
  });

  return pages;
}

function readDelims(src, opts) {
  var pages = [];
  file.expand(src, opts).forEach(function(filepath) {
    filepath = path.join(opts.cwd, filepath);
    var str = file.readFileSync(filepath);
    pages.push(utils.detectLang('---', str));
  });

  return pages;
}



// var all = createPageObject('*', opts);
// var toml = createPageObject('toml*', opts);
// var delims = readDelims('*toml*', opts);

// console.log(all);
// console.log(toml);
// console.log(delims);