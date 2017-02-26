/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var matter = require('..');

describe('Read from strings:', function() {
  it('should return `true` if the string has front-matter:', function() {
    assert.equal(matter.test('---\nabc: xyz\n---'), true);
    assert.equal(matter.test('---\nabc: xyz\n---', {delims: '~~~'}), false);
    assert.equal(matter.test('~~~\nabc: xyz\n~~~', {delims: '~~~'}), true);
    assert.equal(matter.test('\nabc: xyz\n---'), false);
  });
});
