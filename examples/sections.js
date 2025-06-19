'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('..');
const str = fs.readFileSync(path.join(__dirname, 'fixtures', 'sections.md'));

const file = matter(str, {
  section: function(section, file) {
    if (typeof section.data === 'string' && section.data.trim() !== '') {
      section.data = yaml.load(section.data);
    }
    section.content = section.content.trim() + '\n';
  }
});

console.log(JSON.stringify(file, null, 2));
