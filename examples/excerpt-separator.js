const matter = require('..');
const green = require('ansi-green');

console.log(green('/* excerpt with custom separator */'));
const file = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '<!-- sep -->',
  'This is content'
].join('\n'), {excerpt_separator: '<!-- sep -->'});

console.log(file);
