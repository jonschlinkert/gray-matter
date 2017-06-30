var path = require('path');
var matter = require('..');
var magenta = require('ansi-magenta');
var fixture = path.join.bind(path, __dirname, 'fixtures');

/**
 * Stringify back to YAML
 */

var file = matter([
  '---',
  'foo: bar',
  '---',
  'This is content'
].join('\n'));

var str = file.stringify();
console.log(str);

/**
 * custom data
 */

var str = file.stringify({baz: ['one', 'two', 'three']});
console.log(str);
