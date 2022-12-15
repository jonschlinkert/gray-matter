/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
import { expect, it, describe } from "vitest";

import matter from '../dist/index.js';
import File from 'vinyl';

describe('vinyl files', function() {
  it('should take a vinyl file', function() {
    var file = new File({path: 'foo', contents: Buffer.from('---\none: two\n---\nbar')});

    var actual = matter(file);
    expect(actual.path).toEqual('foo');
    expect(actual.data).toEqual({one: 'two'});
    expect(actual.content).toEqual('bar');
    expect(actual.contents).toEqual(Buffer.from('---\none: two\n---\nbar'));
  });
});
