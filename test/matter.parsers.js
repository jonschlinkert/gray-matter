/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var pkg = require('../package');
var matter = require('..');

describe('parsers', function() {
  it('should require js-yaml if it is not already on the requires cache.', function() {
    matter.parsers.requires.yaml = null;

    var data = {name: pkg.name};
    var actual = matter.stringify('Name: {{name}}', data);
    assert.equal(actual, [
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should parse coffee front matter.', function() {
    matter.parsers.requires.coffee = null;

    var actual = matter.read('./test/fixtures/lang-coffee.md', {
      lang: 'coffee',
      eval: true
    });

    assert.equal(actual.data.title, 'coffee');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
