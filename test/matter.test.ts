import { expect, it, describe } from "vitest";
import matter, {utils} from '../src/index';

describe('gray-matter', () => {
  it('should extract YAML front matter', function() {
    var actual = matter('---\nabc: xyz\n---');
    expect(actual.hasOwnProperty('data')).toBeTruthy();
    expect(actual.hasOwnProperty('content')).toBeTruthy();
    expect(actual.hasOwnProperty('orig')).toBeTruthy();
    expect(actual.data.abc).toEqual('xyz');
  });

  it('should cache original string as a buffer on the "orig property"', function() {
    var fixture = '---\nabc: xyz\n---';
    var actual = matter(fixture);
    expect(utils.isBuffer(actual.orig)).toBeTruthy();
    expect(actual.orig.toString()).toEqual(fixture);
  });

  // it('extra characters should throw parsing errors', function() {
  //   expect.throws(function() {
  //     matter('---whatever\nabc: xyz\n---');
  //   });
  // });

  it('boolean yaml types should still return the empty object', function() {
    var actual = matter('--- true\n---');
    expect(actual.data).toEqual({});
  });

  it('string yaml types should still return the empty object', function() {
    var actual = matter('--- true\n---');
    expect(actual.data).toEqual({});
  });

  it('number yaml types should still return the empty object', function() {
    var actual = matter('--- 42\n---');
    expect(actual.data).toEqual({});
  });

  // it('should throw an error when a string is not passed:', function() {
  //   expect.throws(function() {
  //     matter();
  //   });
  // });

  it('should return an object when the string is 0 length:', function() {
    expect(utils.isObject(matter(''))).toBeTruthy();
  });

  it('should extract YAML front matter and content', function() {
    var fixture =
      '---\nabc: xyz\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture);
    expect(actual.data).toEqual({ abc: 'xyz', version: 2 });
    expect(actual.content)
      .toEqual('\n<span class="alert alert-info">This is an alert</span>\n');
    expect(actual.orig.toString()).toEqual(fixture);
  });

  it('should use a custom delimiter as a string.', function() {
    var fixture =
      '~~~\nabc: xyz\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, { delimiters: '~~~' });
    expect(actual.data).toEqual({ abc: 'xyz', version: 2 });
    expect(
      actual.content).toEqual('\n<span class="alert alert-info">This is an alert</span>\n'
    );
    expect(actual.orig.toString()).toEqual(fixture);
  });

  it('should use custom delimiters as an array.', function() {
    var fixture =
      '~~~\nabc: xyz\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, { delimiters: ['~~~'] });
    expect(actual.data).toEqual({ abc: 'xyz', version: 2 });
    expect(
      actual.content).toEqual('\n<span class="alert alert-info">This is an alert</span>\n'
    );
    expect(actual.orig.toString()).toEqual(fixture);
  });

  it('should correctly identify delimiters and ignore strings that look like delimiters.', function() {
    var fixture =
      '---\nname: "troublesome --- value"\n---\nhere is some content\n';
    var actual = matter(fixture);
    expect(actual.data).toEqual({ name: 'troublesome --- value' });
    expect(actual.content).toEqual('here is some content\n');
    expect(
      String(actual.orig)).toEqual('---\nname: "troublesome --- value"\n---\nhere is some content\n'
    );
  });

  it('should correctly parse a string that only has an opening delimiter', function() {
    var fixture = '---\nname: "troublesome --- value"\n';
    var actual = matter(fixture);
    expect(actual.data).toEqual({ name: 'troublesome --- value' });
    expect(actual.content).toEqual('');
    expect(String(actual.orig)).toEqual('---\nname: "troublesome --- value"\n');
  });

  it('should not try to parse a string has content that looks like front-matter.', function() {
    var fixture = '-----------name--------------value\nfoo';
    var actual = matter(fixture);
    expect(actual.data).toEqual({});
    expect(actual.content).toEqual('-----------name--------------value\nfoo');
    expect(
      String(actual.orig)).toEqual('-----------name--------------value\nfoo'
    );
  });
});
