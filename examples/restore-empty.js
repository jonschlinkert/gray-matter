'use strict';

import matter from '../index.js';

/**
 * Parse YAML front-matter
 */

const str = `---
---
This is content`;
const file = matter(str);

console.log(file);
if (file.isEmpty) {
  file.content = str;
}
console.log(file);
