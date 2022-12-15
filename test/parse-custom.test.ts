/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from "vitest";
import matter from '../src/index';
import YAML from 'js-yaml';

describe('custom parser:', function() {
  it('should allow a custom parser to be registered:', function() {
    var actual = matter.read('./test/fixtures/lang-yaml.md', {
      parser: (str: any, opts: any) => {
        try {
          return YAML.load(str, opts);
        } catch (err) {
          throw new SyntaxError(err);
        }
      }
    });

    expect(actual.data.title).toEqual('YAML');
    expect(actual.hasOwnProperty('data'));
    expect(actual.hasOwnProperty('content'));
    expect(actual.hasOwnProperty('orig'));
  });
});
