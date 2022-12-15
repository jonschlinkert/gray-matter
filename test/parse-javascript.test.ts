/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from "vitest";
import { matter } from "../src/index";

describe("parse javascript:", function () {
  it("should parse front matter when options.lang is javascript", function () {
    var file = matter.read("./test/fixtures/lang-javascript-object-fn.md", {
      language: "javascript",
    });

    expect(file.data.title).toEqual("javascript front matter");
    expect(file.hasOwnProperty("data"));
    expect(file.hasOwnProperty("content"));
    expect(file.hasOwnProperty("orig"));
    expect(typeof file.data.fn.reverse).toEqual("function");
  });

  it("should parse front matter when options.language is js", function () {
    var file = matter.read("./test/fixtures/lang-javascript-object-fn.md", {
      language: "js",
      delimiters: "",
    });

    expect(file.data.title).toEqual("javascript front matter");
    expect(file.hasOwnProperty("data"));
    expect(file.hasOwnProperty("content"));
    expect(file.hasOwnProperty("orig"));
    expect(typeof file.data.fn.reverse).toEqual("function");
  });

  it("should eval functions", function () {
    var file = matter.read("./test/fixtures/lang-javascript-fn.md", {
      language: "js",
      delimiters: "",
    });
    expect(typeof file.data).toEqual("function");
  });

  it('should detect "javascript" after the first delimiter', function () {
    var file = matter.read("./test/fixtures/autodetect-javascript.md");
    expect(file.data.title).toEqual("autodetect-javascript");
    expect(file.data.title).toEqual("autodetect-javascript");
    expect(file.hasOwnProperty("data"));
    expect(file.hasOwnProperty("content"));
    expect(file.hasOwnProperty("orig"));
  });
});
