'use strict';

import matter from '../index.js';
import toml from 'toml';

/**
 * Parse TOML front-matter
 */

const str = [
  '---toml',
  'title = "TOML"',
  'description = "Front matter"',
  'categories = "front matter toml"',
  '---',
  'This is content'
].join('\n');

const file = matter(str, {
  engines: {
    toml: toml.parse.bind(toml)
  }
});

console.log(file);
