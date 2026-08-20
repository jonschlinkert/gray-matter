'use strict';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';
import matter from '../index.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const str = fs.readFileSync(path.join(__dirname, 'fixtures', 'sections.md'));

const file = matter(str, {
  section: function(section, file) {
    if (typeof section.data === 'string' && section.data.trim() !== '') {
      section.data = yaml.safeLoad(section.data);
    }
    section.content = section.content.trim() + '\n';
  }
});

console.log(JSON.stringify(file, null, 2));
