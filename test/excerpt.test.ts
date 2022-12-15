/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from "vitest";

import { matter } from "../src/index";

describe(".excerpt", function () {
  it("should get an excerpt after front matter", function () {
    var file = matter("---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent", {
      excerpt: true,
    });

    expect(file.matter).toEqual("\nabc: xyz");
    expect(file.content).toEqual("foo\nbar\nbaz\n---\ncontent");
    expect(file.excerpt).toEqual("foo\nbar\nbaz\n");
    expect(file.data.abc).toEqual("xyz");
  });

  it("should not get excerpt when disabled", function () {
    var file = matter("---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent");

    expect(file.matter).toEqual("\nabc: xyz");
    expect(file.content).toEqual("foo\nbar\nbaz\n---\ncontent");
    expect(file.excerpt).toEqual("");
    expect(file.data.abc).toEqual("xyz");
  });

  it("should use a custom separator", function () {
    var file = matter(
      "---\nabc: xyz\n---\nfoo\nbar\nbaz\n<!-- endexcerpt -->\ncontent",
      {
        excerpt_separator: "<!-- endexcerpt -->",
      }
    );

    expect(file.matter).toEqual("\nabc: xyz");
    expect(file.content).toEqual("foo\nbar\nbaz\n<!-- endexcerpt -->\ncontent");
    expect(file.excerpt).toEqual("foo\nbar\nbaz\n");
    expect(file.data.abc).toEqual("xyz");
  });

  it("should use a custom separator when no front-matter exists", function () {
    var file = matter("foo\nbar\nbaz\n<!-- endexcerpt -->\ncontent", {
      excerpt_separator: "<!-- endexcerpt -->",
    });

    expect(file.matter).toEqual("");
    expect(file.content).toEqual("foo\nbar\nbaz\n<!-- endexcerpt -->\ncontent");
    expect(file.excerpt).toEqual("foo\nbar\nbaz\n");
    expect(file.data).toEqual({});
  });

  it("should use a custom function to get excerpt", function () {
    const file = matter("---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent", {
      excerpt: (f: any) => {
        f.excerpt = "custom";
      },
    } as any);

    expect(file.matter).toEqual("\nabc: xyz");
    expect(file.content).toEqual("foo\nbar\nbaz\n---\ncontent");
    expect(file.excerpt).toEqual("custom");
    expect(file.data.abc).toEqual("xyz");
  });
});
