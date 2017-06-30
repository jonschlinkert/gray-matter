var path = require('path');
var matter = require('..');
var magenta = require('ansi-magenta');

var file = matter([
  '---js',
  '{',
  '  reverse: function(str) {',
  '    return str.split(",").reverse().join(",");',
  '  }',
  '}',
  '---',
  'This is content'
].join('\n'));

console.log(magenta('/* javascript front-matter */'));
console.log(file);

console.log();
console.log(magenta('/* example after calling a function from front-matter */'));
file.data.baz = file.data.reverse('x,y,z');
console.log(file);
