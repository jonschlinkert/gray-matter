'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('..');
const str = fs.readFileSync(path.join(__dirname, 'fixtures', 'sections-excerpt.md'));

const res = matter(str, { excerpt: true, sections: true });
console.log(JSON.stringify(res, null, 2));
