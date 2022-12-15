/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from 'vitest';

import matter from '../src/index';
import toml from 'toml';

var defaults = {
  engines: {
    toml: toml.parse.bind(toml)
  }
};

function parse(str: any, options?: any) {
  return matter(str, { ...defaults, ...options });
}

describe('parse TOML:', function() {
  it('should parse toml front matter.', function() {
    var actual = parse(
      '---\ntitle = "TOML"\ndescription = "Front matter"\ncategories = "front matter toml"\n---\n\n# This file has toml front matter!\n',
      {
        lang: 'toml'
      }
    );
    expect(actual.data.title).toEqual('TOML');
    expect(actual.hasOwnProperty('data')).toBeTruthy();
    expect(actual.hasOwnProperty('content')).toBeTruthy();
    expect(actual.hasOwnProperty('orig')).toBeTruthy();
  });

  it('should auto-detect TOML as the language.', function() {
    var actual = parse(
      '---toml\ntitle = "autodetect-TOML"\n[props]\nuser = "jonschlinkert"\n---\nContent\n'
    );
    expect(actual.data.title).toEqual('autodetect-TOML');
    expect(actual.hasOwnProperty('data')).toBeTruthy();
    expect(actual.hasOwnProperty('content')).toBeTruthy();
    expect(actual.hasOwnProperty('orig')).toBeTruthy();
  });

  // it('should throw on TOML syntax errors', function() {
  //   expect.throws(function() {
  //     matter('---toml\n[props\nuser = "jonschlinkert"\n---\nContent\n');
  //   });
  // });
});
