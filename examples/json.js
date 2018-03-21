const matter = require('..');

const file1 = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content'
].join('\n'));
console.log(file1);

const file2 = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content'
].join('\n'));
console.log(file2);
