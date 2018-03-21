const matter = require('..');

/**
 * Stringify back to YAML
 */

const file = matter([
  '---',
  'foo: bar',
  '---',
  'This is content'
].join('\n'));

const str1 = file.stringify();
console.log(str1);

/**
 * custom data
 */

const str2 = file.stringify({baz: ['one', 'two', 'three']});
console.log(str2);
