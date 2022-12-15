import { expect, it, describe } from "vitest";

import matter from '../src/index';

describe('gray-matter', function() {
  it('should work with empty front-matter', function() {
    var file1 = matter('---\n---\nThis is content');
    expect(file1.content).toEqual('This is content');
    expect(file1.data).toEqual({});

    var file2 = matter('---\n\n---\nThis is content');
    expect(file2.content).toEqual('This is content');
    expect(file2.data).toEqual({});

    var file3 = matter('---\n\n\n\n\n\n---\nThis is content');
    expect(file3.content).toEqual('This is content');
    expect(file3.data).toEqual({});
  });

  it.skip('should add content with empty front matter to file.empty', function() {
    expect(matter('---\n---').empty, `empty prop is: ${matter('---\n---').empty}\n`).toEqual('---\n---');
  });

  it('should update file.isEmpty to true', function() {
    expect(matter('---\n---').isEmpty).toEqual(true);
  });

  it.skip('should work when front-matter has comments', function() {
    const fixture = '---\n # this is a comment\n# another one\n---';
    expect(matter(fixture).empty).toBe(fixture);
  });
});
