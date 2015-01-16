'use strict';

var fs = require('fs');

module.exports = [fs.readFileSync(__dirname + '/complex.md', 'utf8')];

