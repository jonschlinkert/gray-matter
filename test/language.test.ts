/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from "vitest";

import { matter } from "../src/index";

describe(".language", function () {
  it("should detect the name of the language to parse", function () {
    expect(matter.language("---\nfoo: bar\n---")).toEqual({
      raw: "",
      name: "",
    });
    expect(matter.language("---js\nfoo: bar\n---")).toEqual({
      raw: "js",
      name: "js",
    });
    expect(matter.language("---coffee\nfoo: bar\n---")).toEqual({
      raw: "coffee",
      name: "coffee",
    });
  });

  it("should work around whitespace", function () {
    expect(matter.language("--- \nfoo: bar\n---")).toEqual({
      raw: " ",
      name: "",
    });
    expect(matter.language("--- js \nfoo: bar\n---")).toEqual({
      raw: " js ",
      name: "js",
    });
    expect(matter.language("---  coffee \nfoo: bar\n---")).toEqual({
      raw: "  coffee ",
      name: "coffee",
    });
  });
});
