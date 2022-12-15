/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from "vitest";

import { matter } from "../src/index";

describe("parse json:", function () {
  it("should parse JSON front matter.", function () {
    var actual = matter.read("./test/fixtures/lang-json.md", {
      language: "json",
    });

    expect(actual.data.title).toEqual("JSON");
    expect(actual.hasOwnProperty("data")).toBeTruthy();
    expect(actual.hasOwnProperty("content")).toBeTruthy();
    expect(actual.hasOwnProperty("orig")).toBeTruthy();
  });

  it("should auto-detect JSON as the language.", function () {
    var actual = matter.read("./test/fixtures/autodetect-json.md");

    expect(actual.data.title).toEqual("autodetect-JSON");
    expect(actual.hasOwnProperty("data")).toBeTruthy();
    expect(actual.hasOwnProperty("content")).toBeTruthy();
    expect(actual.hasOwnProperty("orig")).toBeTruthy();
  });
});
