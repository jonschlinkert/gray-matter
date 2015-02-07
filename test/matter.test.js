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

describe('Read from strings:', function () {
  it('should return `true` if the string has front-matter:', function () {
    matter.test('---\nabc: xyz\n---').should.be.true;
    matter.test('---\nabc: xyz\n---', {delims: '~~~'}).should.be.false;
    matter.test('~~~\nabc: xyz\n~~~', {delims: '~~~'}).should.be.true;
    matter.test('\nabc: xyz\n---').should.be.false;
  });
});
