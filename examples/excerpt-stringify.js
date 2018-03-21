const matter = require('..');
const magenta = require('ansi-magenta');

const file = matter([
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
