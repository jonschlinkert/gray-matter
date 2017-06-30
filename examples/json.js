var path = require('path');
var matter = require('..');
var magenta = require('ansi-magenta');

var file = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content'
].join('\n'));
console.log(file);

var file = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content'
].join('\n'));
console.log(file);
