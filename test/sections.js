/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var path = require('path');
var assert = require('assert');
var matter = require('..');
var fixture = path.join.bind(path, __dirname, 'fixtures');

describe('.sections', function() {
  it.only('should extract sections from a file', function() {
    var file = matter.read(fixture('sections.md'), {sections: true});
    console.log(file)
    // assert(file.hasOwnProperty('path'));
    // assert(file.hasOwnProperty('data', {title: 'Basic'}));
    // assert.equal(file.content, 'this is content.');
  });
});
