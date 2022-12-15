import typeOf from "kind-of";
import stringify from "./stringify";
import {utils} from "./utils";

/**
 * Normalize the given value to ensure an object is returned
 * with the expected properties.
 */

const toFile = (file: any) => {
  if (typeOf(file) !== "object") {
    file = { content: file };
  }

  if (typeOf(file.data) !== "object") {
    file.data = {};
  }

  // if file was passed as an object, ensure that
  // "file.content" is set
  if (file.contents && file.content == null) {
    file.content = file.contents;
  }

  // set non-enumerable properties on the file object
  utils.define(file, "orig", utils.toBuffer(file.content));
  utils.define(file, "language", file.language || "");
  utils.define(file, "matter", file.matter || "");
  utils.define(file, "stringify", (data: Record<string, any>, options: any) => {
    if (options && options.language) {
      file.language = options.language;
    }
    return stringify(file, data, options);
  });

  // strip BOM and ensure that "file.content" is a string
  file.content = utils.toString(file.content);
  file.isEmpty = false;
  file.excerpt = "";
  return file;
};

export default toFile;
