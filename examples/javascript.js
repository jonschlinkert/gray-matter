'use strict';

import matter from '../index.js';
import green from 'ansi-green';

const file = matter([
  '---js',
  '{',
  '  reverse: function(str) {',
  '    return str.split(",").reverse().join(",");',
  '  }',
  '}',
  '---',
  'This is content'
].join('\n'));

console.log(green('/* javascript front-matter */'));
console.log(file);

console.log();
console.log(green('/* example after calling a function from front-matter */'));
file.data.baz = file.data.reverse('x,y,z');
console.log(file);
