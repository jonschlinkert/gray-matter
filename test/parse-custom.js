/*!
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var should = require('should');
var matter = require('..');

var YAML = require('js-yaml');
function yaml(str, opts) {
  try {
    return YAML.safeLoad(str, opts);
  } catch (err) {
    throw new SyntaxError(err);
  }
}

describe('custom parser:', function () {
  it('should allow a custom parser to be registered:', function () {
    var actual = matter.read('./test/fixtures/lang-yaml.md', {
      parser: yaml
    });
    actual.data.title.should.equal('YAML');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});
