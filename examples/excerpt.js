const matter = require('..');
const green = require('ansi-green');

// excerpt as a boolean
const file1 = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '---',
  'This is content'
].join('\n'), {excerpt: true});

console.log(green('/* excerpt: true */'));
console.log(file1);

// excerpt as a function

// returns the first 4 lines of the contents
function firstFourLines(file, options) {
  file.excerpt = file.content.split('\n').slice(0, 4).join(' ');
}

const file2 = matter([
  '---',
  'foo: bar',
  '---',
  'Only this',
  'will be',
  'in the',
  'excerpt',
  'but not this...'
].join('\n'), { excerpt: firstFourLines });

console.log(green('/* excerpt: function(file, options) { ... } */'));
console.log(file2);
