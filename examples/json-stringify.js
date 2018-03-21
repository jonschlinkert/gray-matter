const matter = require('..');
const green = require('ansi-green');

const file1 = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content'
].join('\n'));

console.log(green('/* stringified to YAML, from JSON front-matter */'));
console.log(file1.stringify({}, {language: 'yaml'}));

const file2 = matter([
  '---',
  'title: Home',
  '---',
  'This is content'
].join('\n'));

console.log(green('/* stringified JSON, from YAML front-matter */'));
console.log(file2.stringify({}, {language: 'json', spaces: 2}));
