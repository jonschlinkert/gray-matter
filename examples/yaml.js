var path = require('path');
var matter = require('..');
var magenta = require('ansi-magenta');
var fixture = path.join.bind(path, __dirname, 'fixtures');

/**
 * Parse YAML front-matter
 */

var file = matter([
  '---',
  'foo: bar',
  '---',
  'This is content'
].join('\n'));

console.log(file);
