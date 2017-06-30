var path = require('path');
var matter = require('..');
var toml = require('toml');
var magenta = require('ansi-magenta');
var fixture = path.join.bind(path, __dirname, 'fixtures');

/**
 * Parse TOML front-matter
 */

var file = matter([
  '---toml',
  'title = "TOML"',
  'description = "Front matter"',
  'categories = "front matter toml"',
  '---',
  'This is content'
].join('\n'), {
  engines: {
    toml: toml.parse.bind(toml)
  }
});

console.log(file);
