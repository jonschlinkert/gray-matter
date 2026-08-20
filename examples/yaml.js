'use strict';

import matter from '../index.js';

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
