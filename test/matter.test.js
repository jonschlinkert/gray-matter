/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
require('should');
var matter = require('..');

describe('Read from strings:', function () {
  it('should return `true` if the string has front-matter:', function () {
    matter.test('---\nabc: xyz\n---').should.be.true;
    matter.test('---\nabc: xyz\n---', {delims: '~~~'}).should.be.false;
    matter.test('~~~\nabc: xyz\n~~~', {delims: '~~~'}).should.be.true;
    matter.test('\nabc: xyz\n---').should.be.false;
  });
});