const matter = require('..');

/**
 * Parse YAML front-matter
 */

const file = matter([
  '---',
  'foo: bar',
  '---',
  'This is content'
].join('\n'));

console.log(file);
