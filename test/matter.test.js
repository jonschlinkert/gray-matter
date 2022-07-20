/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



import assert from 'assert';
import matter from '../dist/index.js';

describe('.test', function() {
  it('should return `true` if the string has front-matter:', function() {
    assert(matter.test('---\nabc: xyz\n---'));
    assert(!matter.test('---\nabc: xyz\n---', {delims: '~~~'}));
    assert(matter.test('~~~\nabc: xyz\n~~~', {delims: '~~~'}));
    assert(!matter.test('\nabc: xyz\n---'));
  });
});
