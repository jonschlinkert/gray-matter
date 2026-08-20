'use strict';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from '../index.js';
import coffee from 'coffeescript';
import green from 'ansi-green';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixture = path.join.bind(path, __dirname, 'fixtures');
let file;

const engines = {
  coffee: {
    parse: function(str, options) {
      /* eslint no-eval: 0 */
      return coffee['eval'](str, options);
    }
  }
};

console.log(green('/* coffescript (detected after first delimiter in front-matter) */'));
file = matter.read(fixture('coffee-auto.md'), {engines: engines});
console.log(file);
console.log();

console.log(green('/* coffescript (defined on options) */'));
file = matter.read(fixture('coffee.md'), {
  language: 'coffee',
  engines: engines
});
console.log(file);
