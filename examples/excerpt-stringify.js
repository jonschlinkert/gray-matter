var path = require('path');
var matter = require('..');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var magenta = require('ansi-magenta');

var file = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '<!-- sep -->',
  'This is content'
].join('\n'), {excerpt_separator: '<!-- sep -->'});

console.log(magenta('/* file object, with excerpt */'));
console.log(file);

console.log();
console.log(magenta('/* stringified, with excerpt */'));
console.log(file.stringify());
