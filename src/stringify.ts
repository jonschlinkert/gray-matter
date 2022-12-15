import typeOf from "kind-of";
import getEngine from "./engine";
import defaults from "./defaults";
import { GrayMatterOption, Input } from "./types";

function newline(str: any) {
  return str.slice(-1) === "\n" ? str : str + "\n";
}

const stringify = <I extends Input, O extends GrayMatterOption<I, O>>(
  file: any, 
  data: Record<string, any> = {}, 
  options: O = {} as O
) => {
  if (data == null && options == null) {
    switch (typeOf(file)) {
      case "object": {
        data = file.data;
        options = {} as O;
        break;
      }
      case "string": {
        return file;
      }
      default: {
        throw new TypeError("expected file to be a string or object");
      }
    }
  }

  const str = file.content;
  const opts = defaults(options);
  if (data == null) {
    if (!(opts as any).data) {return file;}
    data = (opts as any)?.data;
  }

  const language = file.language || opts.language;
  const engine = getEngine(language, opts);
  if (typeof engine.stringify !== "function") {
    throw new TypeError('expected "' + language + '.stringify" to be a function');
  }

  data = Object.assign({}, file.data, data);
  const open = opts?.delimiters 
    ? opts.delimiters[0]
    : opts?.delims ? opts?.delims[0] : undefined;
  const close = opts?.delimiters 
   ? opts.delimiters[1] 
    ? opts.delimiters[1]
    : opts?.delims ? opts.delims[1] : undefined
  : undefined;

  const matter = engine.stringify(data, options).trim();
  let buf = "";

  if (matter !== "{}") {
    buf = newline(open) + newline(matter) + newline(close);
  }

  if (typeof file.excerpt === "string" && file.excerpt !== "" && !str.includes(file.excerpt.trim())) {
      buf += newline(file.excerpt) + newline(close);
    }

  return buf + newline(str);
};

export default stringify;
