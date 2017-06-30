var path = require('path');
var matter = require('..');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var magenta = require('ansi-magenta');

console.log(magenta('/* excerpt with custom separator */'));
var file = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '<!-- sep -->',
  'This is content'
].join('\n'), {excerpt_separator: '<!-- sep -->'});

console.log(file);
