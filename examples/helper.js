/**
 * this is not an example. this is a helper used to generate
 * the list of links to examples in the readme.
 */

'use strict';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function() {
  const files = fs.readdirSync(__dirname);
  const links = [];
  for (let i = 0; i < files.length; i++) {
    const name = files[i];
    const ext = path.extname(name);
    const stem = path.basename(name, ext);
    if (stem !== 'helper' && ext === '.js') {
      links.push('- [' + stem + '](examples/' + name + ')');
    }
  }
  return links.join('\n');
}
