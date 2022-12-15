/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from "vitest";
import matter from '../src/index';

describe('parse YAML:', function() {
  it('should parse YAML', function() {
    var file = matter.read('./test/fixtures/all.yaml');
    expect(file.data).toEqual({
      one: 'foo',
      two: 'bar',
      three: 'baz'
    });
  });

  it('should parse YAML with closing ...', function() {
    var file = matter.read('./test/fixtures/all-dots.yaml');
    expect(file.data).toEqual({
      one: 'foo',
      two: 'bar',
      three: 'baz'
    });
  });

  it('should parse YAML front matter', function() {
    var actual = matter.read('./test/fixtures/lang-yaml.md');
    expect(actual.data.title).toEqual('YAML');
    expect(actual.hasOwnProperty('data')).toBeTruthy();
    expect(actual.hasOwnProperty('content')).toBeTruthy();
    expect(actual.hasOwnProperty('orig')).toBeTruthy();
  });

  it('should detect YAML as the language with no language defined after the first fence', function() {
    var actual = matter.read('./test/fixtures/autodetect-no-lang.md');
    expect(actual.data.title).toEqual('autodetect-no-lang');
    expect(actual.hasOwnProperty('data')).toBeTruthy();
    expect(actual.hasOwnProperty('content')).toBeTruthy();
    expect(actual.hasOwnProperty('orig')).toBeTruthy();
  });

  it('should detect YAML as the language', function() {
    var actual = matter.read('./test/fixtures/autodetect-yaml.md');
    expect(actual.data.title).toEqual('autodetect-yaml');
    expect(actual.hasOwnProperty('data')).toBeTruthy();
    expect(actual.hasOwnProperty('content')).toBeTruthy();
    expect(actual.hasOwnProperty('orig')).toBeTruthy();
  });

  it('should use safeLoad when specified', function() {
    var fixture = '---\nabc: xyz\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, {safeLoad: true});
    expect(actual.data).toEqual({abc: 'xyz', version: 2});
    expect(actual.content).toEqual('\n<span class="alert alert-info">This is an alert</span>\n');
    expect(actual.hasOwnProperty('orig')).toBeTruthy();
  });
});
