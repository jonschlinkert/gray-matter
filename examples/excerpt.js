var path = require('path');
var matter = require('..');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var magenta = require('ansi-magenta');

// excerpt as a boolean
var file1 = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '---',
  'This is content'
].join('\n'), {excerpt: true});

console.log(magenta('/* excerpt: true */'));
console.log(file1);

// excerpt as a function

// returns the first 4 lines of the contents
function firstFourLines(file, options) {
  file.excerpt = file.content.split('\n').slice(0, 4).join(' ');
}

var file2 =  matter([
'---',
'foo: bar',
'---',
'Only this',
'will be',
'in the',
'excerpt',
'but not this...'
].join('\n'), {excerpt: firstFourLines });

console.log(magenta('/* excerpt: function(file, options) { ... } */'));
console.log(file2);