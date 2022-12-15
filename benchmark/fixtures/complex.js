import * as fs from 'node:fs';

module.exports = [fs.readFileSync(__dirname + '/complex.md', 'utf8')];
