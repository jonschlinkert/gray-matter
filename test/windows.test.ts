import { expect, it, describe } from 'vitest';
import matter, { utils } from '../src/index';

describe('gray-matter (windows carriage returns)', function() {
  it('should extract YAML front matter', function() {
    var actual = matter('---\r\nabc: xyz\r\n---');
    expect(actual.hasOwnProperty('data')).toBeTruthy();
    expect(actual.hasOwnProperty('content')).toBeTruthy();
    expect(actual.hasOwnProperty('orig')).toBeTruthy();
    expect(actual.data.abc).toEqual('xyz');
  });

  it('should cache orig string as a buffer on the "orig property"', function() {
    var fixture = '---\r\nabc: xyz\r\n---';
    var actual = matter(fixture);
    expect(utils.isBuffer(actual.orig));
    // expect.equal(actual.orig.toString(), fixture);
  });

  // it('should throw parsing errors', function() {
  //   expect.throws(function() {
  //     matter('---whatever\r\nabc: xyz\r\n---');
  //   });
  // });

  // it('should throw an error when a string is not passed:', function() {
  //   expect.throws(function() {
  //     matter();
  //   });
  // });

  it('should return an object when the string is 0 length:', function() {
    expect(utils.isObject(matter('')));
  });

  it('should extract YAML front matter and content', function() {
    var fixture =
      '---\r\nabc: xyz\r\nversion: 2\r\n---\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n';
    var actual = matter(fixture);
    expect(actual.data).toEqual({ abc: 'xyz', version: 2 });
    expect(
      actual.content).toEqual('\r\n<span class="alert alert-info">This is an alert</span>\r\n'
    );
    expect(actual.orig.toString()).toEqual( fixture);
  });

  it('should use a custom delimiter as a string.', function() {
    var fixture =
      '~~~\r\nabc: xyz\r\nversion: 2\r\n~~~\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n';
    var actual = matter(fixture, { delimiters: '~~~' });
    expect(actual.data).toEqual({ abc: 'xyz', version: 2 });
    expect(
      actual.content).toEqual('\r\n<span class="alert alert-info">This is an alert</span>\r\n'
    );
    expect(actual.orig.toString()).toEqual(fixture);
  });

  it('should use custom delimiters as an array.', function() {
    var fixture =
      '~~~\r\nabc: xyz\r\nversion: 2\r\n~~~\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n';
    var actual = matter(fixture, { delimiters: ['~~~'] });
    expect(actual.data).toEqual({ abc: 'xyz', version: 2 });
    expect(
      actual.content).toEqual('\r\n<span class="alert alert-info">This is an alert</span>\r\n'
    );
    expect(actual.orig.toString()).toEqual(fixture);
  });

  it('should correctly identify delimiters and ignore strings that look like delimiters.', function() {
    var fixture =
      '---\r\nname: "troublesome --- value"\r\n---\r\nhere is some content\r\n';
    var actual = matter(fixture);
    expect(actual.data).toEqual({ name: 'troublesome --- value' });
    expect(actual.content).toEqual('here is some content\r\n');
    expect(
      String(actual.orig)).toEqual('---\r\nname: "troublesome --- value"\r\n---\r\nhere is some content\r\n'
    );
  });

  it('should correctly parse a string that only has an opening delimiter', function() {
    var fixture = '---\r\nname: "troublesome --- value"\r\n';
    var actual = matter(fixture);
    expect(actual.data).toEqual({ name: 'troublesome --- value' });
    expect(actual.content).toEqual('');
    expect(
      String(actual.orig)).toEqual('---\r\nname: "troublesome --- value"\r\n'
    );
  });

  it('should not try to parse a string has content that looks like front-matter.', function() {
    var fixture = '-----------name--------------value\r\nfoo';
    var actual = matter(fixture);
    expect(actual.data).toEqual({});
    expect(actual.content).toEqual('-----------name--------------value\r\nfoo');
    expect(
      String(actual.orig)).toEqual('-----------name--------------value\r\nfoo'
    );
  });
});
