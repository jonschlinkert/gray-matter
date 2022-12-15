/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from "vitest";

import matter from '../src/index';

describe('.test', function() {
  it('should return `true` if the string has front-matter:', function() {
    expect(matter.test('---\nabc: xyz\n---')).toBeTruthy();
    expect(!matter.test('---\nabc: xyz\n---', {delimiters: '~~~'})).toBeTruthy();
    expect(matter.test('~~~\nabc: xyz\n~~~', {delimiters: '~~~'})).toBeTruthy();
    expect(!matter.test('\nabc: xyz\n---')).toBeTruthy();
  });
});
