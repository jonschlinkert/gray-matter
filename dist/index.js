// src/index.ts
import * as fs from "fs";

// src/engines.ts
import yaml from "js-yaml";

// src/engine.ts
function aliase(name) {
  switch (name.toLowerCase()) {
    case "js":
    case "javascript": {
      return "javascript";
    }
    case "coffee":
    case "coffeescript":
    case "cson": {
      return "coffee";
    }
    case "yaml":
    case "yml": {
      return "yaml";
    }
    default: {
      return name;
    }
  }
}
var engine = (name, options3) => {
  let engine2 = options3.engines[name] || options3.engines[aliase(name)];
  if (engine2 === void 0) {
    throw new TypeError('gray-matter engine "' + name + '" is not registered');
  }
  if (typeof engine2 === "function") {
    engine2 = { parse: engine2 };
  }
  return engine2;
};
var engine_default = engine;

// src/parse.ts
var parse = (language, str2, options3) => {
  const opts = defaults_default(options3);
  const engine2 = engine_default(language, opts);
  if (typeof engine2.parse !== "function") {
    throw new TypeError('expected "' + language + '.parse" to be a function');
  }
  return engine2.parse(str2, opts);
};
var parse_default = parse;

// src/engines.ts
var engines = {
  yaml: {
    parse: yaml.load.bind(yaml),
    stringify: yaml.dump.bind(yaml)
  },
  json: {
    parse: JSON.parse.bind(JSON),
    stringify: function(obj, options3) {
      const opts = Object.assign({ replacer: null, space: 2 }, options3);
      return JSON.stringify(obj, opts.replacer, opts.space);
    }
  },
  javascript(str, options, wrap) {
    try {
      if (wrap !== false) {
        str = "(function() {\nreturn " + str.trim() + ";\n}());";
      }
      return eval(str) || {};
    } catch (error) {
      if (wrap !== false && /(unexpected|identifier)/i.test(error.message)) {
        return parse_default(str, options, false);
      }
      throw new SyntaxError(error.message);
    }
  },
  stringify() {
    throw new Error("stringifying JavaScript is not supported");
  }
};
var engines_default = engines;

// src/utils.ts
import stripBom from "strip-bom-string";
import typeOf from "kind-of";
var utils = {
  define: (obj, key, val) => {
    Reflect.defineProperty(obj, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: val
    });
  },
  isBuffer: (val) => {
    return typeOf(val) === "buffer";
  },
  isObject: (val) => {
    return typeOf(val) === "object";
  },
  toBuffer(input) {
    return typeof input === "string" ? Buffer.from(input) : input;
  },
  toString(input) {
    if (utils.isBuffer(input)) {
      return stripBom(String(input));
    }
    if (typeof input !== "string") {
      throw new TypeError("expected input to be a string or buffer");
    }
    return stripBom(input);
  },
  arrayify(val) {
    return val ? Array.isArray(val) ? val : [val] : [];
  },
  startsWith(str2, substr, len) {
    if (typeof len !== "number") {
      len = substr.length;
    }
    return str2.slice(0, len) === substr;
  }
};

// src/defaults.ts
var options2 = (options3) => {
  const opts = Object.assign({}, options3);
  opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
  if (opts.delimiters.length === 1) {
    opts.delimiters.push(opts.delimiters[0]);
  }
  opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
  opts.engines = Object.assign({}, engines_default, opts.parser, opts.engines);
  return opts;
};
var defaults_default = options2;

// src/stringify.ts
import typeOf2 from "kind-of";
function newline(str2) {
  return str2.slice(-1) === "\n" ? str2 : str2 + "\n";
}
var stringify = (file, data = {}, options3 = {}) => {
  if (data == null && options3 == null) {
    switch (typeOf2(file)) {
      case "object": {
        data = file.data;
        options3 = {};
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
  const str2 = file.content;
  const opts = defaults_default(options3);
  if (data == null) {
    if (!opts.data) {
      return file;
    }
    data = opts?.data;
  }
  const language = file.language || opts.language;
  const engine2 = engine_default(language, opts);
  if (typeof engine2.stringify !== "function") {
    throw new TypeError('expected "' + language + '.stringify" to be a function');
  }
  data = Object.assign({}, file.data, data);
  const open = opts?.delimiters ? opts.delimiters[0] : opts?.delims ? opts?.delims[0] : void 0;
  const close = opts?.delimiters ? opts.delimiters[1] ? opts.delimiters[1] : opts?.delims ? opts.delims[1] : void 0 : void 0;
  const matter2 = engine2.stringify(data, options3).trim();
  let buf = "";
  if (matter2 !== "{}") {
    buf = newline(open) + newline(matter2) + newline(close);
  }
  if (typeof file.excerpt === "string" && file.excerpt !== "" && !str2.includes(file.excerpt.trim())) {
    buf += newline(file.excerpt) + newline(close);
  }
  return buf + newline(str2);
};
var stringify_default = stringify;

// src/excerpt.ts
var excerpt = (file, options3) => {
  const opts = defaults_default(options3);
  if (file.data == null) {
    file.data = {};
  }
  if (typeof opts.excerpt === "function") {
    return opts.excerpt(file, opts);
  }
  const sep = file.data.excerpt_separator || opts.excerpt_separator;
  if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
    return file;
  }
  const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep || opts.delimiters[0];
  const idx = file.content.indexOf(delimiter);
  if (idx !== -1) {
    file.excerpt = file.content.slice(0, idx);
  }
  return file;
};
var excerpt_default = excerpt;

// src/to-file.ts
import typeOf3 from "kind-of";
var toFile = (file) => {
  if (typeOf3(file) !== "object") {
    file = { content: file };
  }
  if (typeOf3(file.data) !== "object") {
    file.data = {};
  }
  if (file.contents && file.content == null) {
    file.content = file.contents;
  }
  utils.define(file, "orig", utils.toBuffer(file.content));
  utils.define(file, "language", file.language || "");
  utils.define(file, "matter", file.matter || "");
  utils.define(file, "stringify", (data, options3) => {
    if (options3 && options3.language) {
      file.language = options3.language;
    }
    return stringify_default(file, data, options3);
  });
  file.content = utils.toString(file.content);
  file.isEmpty = false;
  file.excerpt = "";
  return file;
};
var to_file_default = toFile;

// src/index.ts
import { createFnWithProps } from "inferred-types";
import sections from "section-matter";
var matterDict = {
  cache: {},
  read(filepath, options3) {
    const str2 = fs.readFileSync(filepath, "utf8");
    const file = matterFn(str2, options3);
    file.path = filepath;
    return file;
  },
  stringify(file, data, options3) {
    return typeof file === "string" ? stringify_default(matterFn(file, options3), data, options3) : stringify_default(file, data, options3);
  },
  language(str2, options3) {
    const opts = defaults_default(options3);
    const open = opts?.delimiters ? opts.delimiters[0] : "---";
    if (matterDict.test(str2)) {
      str2 = str2.slice(open.length);
    }
    const language = str2.slice(0, str2.search(/\r?\n/));
    return {
      raw: language,
      name: language ? language.trim() : ""
    };
  },
  parseMatter(file, options3) {
    const opts = defaults_default(options3);
    const open = opts.delimiters ? opts.delimiters[0] : "---";
    const close = "\n" + opts.delimiters[1];
    const f = typeof file === "string" ? {
      content: file,
      path: "",
      language: "",
      data: {},
      contents: void 0,
      matter: "",
      orig: ""
    } : file;
    if (opts.language) {
      f.language = opts.language;
    }
    const openLen = open.length;
    if (!utils.startsWith(f.content, open, openLen)) {
      excerpt_default(file, opts);
      return file;
    }
    if (f.content.charAt(openLen) === open.slice(-1)) {
      return file;
    }
    f.content = f.content.slice(openLen);
    const len = f.content.length;
    const language = matter.language(f.content, opts) || opts.language;
    if (language.name) {
      f.language = language.name;
      f.content = f.content.slice(language.raw.length);
    }
    let closeIndex = f.content.indexOf(close);
    if (closeIndex === -1) {
      closeIndex = len;
    }
    f.matter = f.content.slice(0, closeIndex);
    const block = f.matter.replace(/^\s*#[^\n]+/gm, "").trim();
    if (block === "") {
      f.isEmpty = true;
      f.empty = f.content;
      f.data = {};
    } else {
      f.data = parse_default(f.language, f.matter, opts);
    }
    if (closeIndex === len) {
      f.content = "";
    } else {
      f.content = f.content.slice(closeIndex + close.length);
      if (f.content[0] === "\r") {
        f.content = f.content.slice(1);
      }
      if (f.content[0] === "\n") {
        f.content = f.content.slice(1);
      }
    }
    excerpt_default(f, opts);
    if (opts?.sections === true || typeof opts.section === "function") {
      sections(f, opts.section);
    }
    return f;
  },
  test(str2, options3) {
    return utils.startsWith(str2, defaults_default(options3).delimiters[0]);
  },
  clearCache() {
    matterDict.cache = {};
  }
};
var matterFn = (input, options3) => {
  if (input === "") {
    return { data: {}, content: input, excerpt: "", orig: input };
  }
  let file = to_file_default(input);
  const cached = matterDict.cache[file.content];
  if (!options3) {
    if (cached) {
      file = Object.assign({}, cached);
      file.orig = cached.orig;
      return file;
    }
    matterDict.cache[file.content] = file;
  }
  return matterDict.parseMatter(file, options3);
};
var matter = createFnWithProps(matterFn, matterDict);
var src_default = matter;
export {
  src_default as default,
  engines_default as engines,
  matter,
  utils
};
