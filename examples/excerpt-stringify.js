const matter = require('..');
const green = require('ansi-green');

const file = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '<!-- sep -->',
  'This is content'
].join('\n'), {excerpt_separator: '<!-- sep -->'});

console.log(green('/* file object, with excerpt */'));
console.log(file);

console.log();
console.log(green('/* stringified, with excerpt */'));
console.log(file.stringify());
