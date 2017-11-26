var path = require('path');
var matter = require('..');
var magenta = require('ansi-magenta');
var fixture = path.join.bind(path, __dirname, 'fixtures');

var file = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content'
].join('\n'));

console.log(magenta('/* stringified to HJSON, from JSON front-matter */'));
console.log(file.stringify({}, {language: 'hjson'}));

var file = matter([
  '---',
  'title: Home',
  '---',
  'This is content'
].join('\n'));

console.log(magenta('/* stringified JSON, from HJSON front-matter */'));
console.log(file.stringify({}, {language: 'json', spaces: 2}));
