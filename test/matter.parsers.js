/*!
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var fs = require('fs');
var _ = require('lodash');
var matter = require('..');
var pkg = require('../package');

describe('parsers', function () {

  it('should require js-yaml if it is not already on the requires cache.', function () {
    matter.parsers.requires.yaml = null;

    var res = matter.stringify('Name: {{author.name}}', pkg.author);
    res.should.equal([
      '---',
      'name: Jon Schlinkert',
      'url: "https://github.com/jonschlinkert"',
      '---',
      'Name: {{author.name}}\n'
    ].join('\n'));
  });

  it('should parse coffee front matter.', function () {
    matter.parsers.requires.coffee = null;

    var actual = matter.read('./test/fixtures/lang-coffee.md', {
      lang: 'coffee',
      eval: true
    });
    actual.data.title.should.equal('coffee');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});

