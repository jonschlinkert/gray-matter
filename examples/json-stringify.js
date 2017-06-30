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

console.log(magenta('/* stringified to YAML, from JSON front-matter */'));
console.log(file.stringify({}, {language: 'yaml'}));

var file = matter([
  '---',
  'title: Home',
  '---',
  'This is content'
].join('\n'));

console.log(magenta('/* stringified JSON, from YAML front-matter */'));
console.log(file.stringify({}, {language: 'json', spaces: 2}));
