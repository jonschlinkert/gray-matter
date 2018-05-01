const matter = require('..');
const toml = require('toml');

/**
 * Parse TOML front-matter
 */

const str = [
  '+++',
  'title = "TOML"',
  'description = "Front matter"',
  'categories = ["front", "matter", "toml"]',
  '+++',
  'This is content'
].join('\n');

const file = matter(str, {
  engines: {
    toml: {
      parse: toml.parse.bind(toml),
      delimiters: '+++'
    }
  }
});

console.log(file);
