'use strict';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from '../index.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const str = fs.readFileSync(path.join(__dirname, 'fixtures', 'sections-excerpt.md'));

const res = matter(str, { excerpt: true, sections: true });
console.log(JSON.stringify(res, null, 2));
