import { expect, it, describe } from "vitest";

/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { matter } from "../src/index";
import { fileURLToPath } from "node:url";
import { dirname } from "pathe";
import { join } from "node:path";

const _dirname = dirname(fileURLToPath(import.meta.url));

const fixture = (f: any) => join(_dirname, "fixtures", f);

describe(".read", function () {
  it("should extract YAML front matter from files with content.", function () {
    var file = matter.read(fixture("basic.txt"));

    expect(file.hasOwnProperty("path")).toBeTruthy();
    expect(file.hasOwnProperty("data")).toBeTruthy();
    expect(file.content).toEqual("this is content.");
  });

  it("should parse complex YAML front matter.", function () {
    var file = matter.read(fixture("complex.md"));

    expect(file.hasOwnProperty("data"));
    expect(file.data.root).toEqual("_gh_pages");

    expect(file.hasOwnProperty("path")).toBeTruthy();
    expect(file.hasOwnProperty("content")).toBeTruthy();
    expect(file.hasOwnProperty("orig")).toBeTruthy();
    expect(file.data.hasOwnProperty("root")).toBeTruthy();
  });

  it("should return an object when a file is empty.", function () {
    var file = matter.read(fixture("empty.md"));
    expect(file.hasOwnProperty("path")).toBeTruthy();
    expect(file.hasOwnProperty("data")).toBeTruthy();
    expect(file.hasOwnProperty("content")).toBeTruthy();
    expect(file.hasOwnProperty("orig")).toBeTruthy();
  });

  it("should return an object when no front matter exists.", function () {
    var file = matter.read(fixture("hasnt-matter.md"));
    expect(file.hasOwnProperty("path")).toBeTruthy();
    expect(file.hasOwnProperty("data")).toBeTruthy();
    expect(file.hasOwnProperty("content")).toBeTruthy();
    expect(file.hasOwnProperty("orig")).toBeTruthy();
  });

  it("should parse YAML files directly", function () {
    var file = matter.read(fixture("all.yaml"));
    expect(file.hasOwnProperty("path")).toBeTruthy();
    expect(file.hasOwnProperty("data")).toBeTruthy();
    expect(file.hasOwnProperty("content")).toBeTruthy();
    expect(file.hasOwnProperty("orig")).toBeTruthy();
    expect(file.data).toEqual({
      one: "foo",
      two: "bar",
      three: "baz",
    });
  });
});
