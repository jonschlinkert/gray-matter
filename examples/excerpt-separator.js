const matter = require('..');
const magenta = require('ansi-magenta');

console.log(magenta('/* excerpt with custom separator */'));
const file = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '<!-- sep -->',
  'This is content'
].join('\n'), {excerpt_separator: '<!-- sep -->'});

console.log(file);
