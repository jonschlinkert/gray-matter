var path = require('path');
var matter = require('..');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var magenta = require('ansi-magenta');

var file = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '---',
  'This is content'
].join('\n'), {excerpt: true});

console.log(magenta('/* excerpt */'));
console.log(file);
