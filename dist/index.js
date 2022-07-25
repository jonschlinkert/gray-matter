// lib/index.js
import fs from "fs";
import sections from "section-matter";

// lib/engines.js
import yaml from "js-yaml";

// lib/engine.js
var engine = (name, options3) => {
  let engine2 = options3.engines[name] || options3.engines[aliase(name)];
  if (typeof engine2 === "undefined") {
    throw new Error('gray-matter engine "' + name + '" is not registered');
  }
  if (typeof engine2 === "function") {
    engine2 = { parse: engine2 };
  }
  return engine2;
};
function aliase(name) {
  switch (name.toLowerCase()) {
    case "js":
    case "javascript":
      return "javascript";
    case "coffee":
    case "coffeescript":
    case "cson":
      return "coffee";
    case "yaml":
    case "yml":
      return "yaml";
    default: {
      return name;
    }
  }
}
var engine_default = engine;

// lib/parse.js
var parse = (language2, str2, options3) => {
  const opts = defaults_default(options3);
  const engine2 = engine_default(language2, opts);
  if (typeof engine2.parse !== "function") {
    throw new TypeError('expected "' + language2 + '.parse" to be a function');
  }
  return engine2.parse(str2, opts);
};
var parse_default = parse;

// lib/engines.js
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
    } catch (err) {
      if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
        return parse_default(str, options, false);
      }
      throw new SyntaxError(err);
    }
  },
  stringify() {
    throw new Error("stringifying JavaScript is not supported");
  }
};
var engines_default = engines;

// lib/utils.js
import stripBom from "strip-bom-string";
import typeOf from "kind-of";
function define(obj, key, val) {
  Reflect.defineProperty(obj, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: val
  });
}
function isBuffer(val) {
  return typeOf(val) === "buffer";
}
function isObject(val) {
  return typeOf(val) === "object";
}
function toBuffer(input) {
  return typeof input === "string" ? Buffer.from(input) : input;
}
function toString(input) {
  if (isBuffer(input))
    return stripBom(String(input));
  if (typeof input !== "string") {
    throw new TypeError("expected input to be a string or buffer");
  }
  return stripBom(input);
}
function arrayify(val) {
  return val ? Array.isArray(val) ? val : [val] : [];
}
function startsWith(str2, substr, len) {
  if (typeof len !== "number")
    len = substr.length;
  return str2.slice(0, len) === substr;
}
var utils_default = {
  define,
  isBuffer,
  isObject,
  toBuffer,
  toString,
  arrayify,
  startsWith
};

// lib/defaults.js
var options2 = (options3) => {
  const opts = Object.assign({}, options3);
  opts.delimiters = utils_default.arrayify(opts.delims || opts.delimiters || "---");
  if (opts.delimiters.length === 1) {
    opts.delimiters.push(opts.delimiters[0]);
  }
  opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
  opts.engines = Object.assign({}, engines_default, opts.parsers, opts.engines);
  return opts;
};
var defaults_default = options2;

// lib/stringify.js
import typeOf2 from "kind-of";
function newline(str2) {
  return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
}
var stringify = (file, data, options3) => {
  if (data == null && options3 == null) {
    switch (typeOf2(file)) {
      case "object":
        data = file.data;
        options3 = {};
        break;
      case "string":
        return file;
      default: {
        throw new TypeError("expected file to be a string or object");
      }
    }
  }
  const str2 = file.content;
  const opts = defaults_default(options3);
  if (data == null) {
    if (!opts.data)
      return file;
    data = opts.data;
  }
  const language2 = file.language || opts.language;
  const engine2 = engine_default(language2, opts);
  if (typeof engine2.stringify !== "function") {
    throw new TypeError('expected "' + language2 + '.stringify" to be a function');
  }
  data = Object.assign({}, file.data, data);
  const open = opts.delimiters[0];
  const close = opts.delimiters[1];
  const matter2 = engine2.stringify(data, options3).trim();
  let buf = "";
  if (matter2 !== "{}") {
    buf = newline(open) + newline(matter2) + newline(close);
  }
  if (typeof file.excerpt === "string" && file.excerpt !== "") {
    if (str2.indexOf(file.excerpt.trim()) === -1) {
      buf += newline(file.excerpt) + newline(close);
    }
  }
  return buf + newline(str2);
};
var stringify_default = stringify;

// lib/excerpt.js
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

// lib/to-file.js
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
  utils_default.define(file, "orig", utils_default.toBuffer(file.content));
  utils_default.define(file, "language", file.language || "");
  utils_default.define(file, "matter", file.matter || "");
  utils_default.define(file, "stringify", function(data, options3) {
    if (options3 && options3.language) {
      file.language = options3.language;
    }
    return stringify_default(file, data, options3);
  });
  file.content = utils_default.toString(file.content);
  file.isEmpty = false;
  file.excerpt = "";
  return file;
};
var to_file_default = toFile;

// lib/index.js
function matter(input, options3) {
  if (input === "") {
    return { data: {}, content: input, excerpt: "", orig: input };
  }
  let file = to_file_default(input);
  const cached = matter.cache[file.content];
  if (!options3) {
    if (cached) {
      file = Object.assign({}, cached);
      file.orig = cached.orig;
      return file;
    }
    matter.cache[file.content] = file;
  }
  return parseMatter(file, options3);
}
function parseMatter(file, options3) {
  const opts = defaults_default(options3);
  const open = opts.delimiters[0];
  const close = "\n" + opts.delimiters[1];
  let str2 = file.content;
  if (opts.language) {
    file.language = opts.language;
  }
  const openLen = open.length;
  if (!utils_default.startsWith(str2, open, openLen)) {
    excerpt_default(file, opts);
    return file;
  }
  if (str2.charAt(openLen) === open.slice(-1)) {
    return file;
  }
  str2 = str2.slice(openLen);
  const len = str2.length;
  const language2 = matter.language(str2, opts);
  if (language2.name) {
    file.language = language2.name;
    str2 = str2.slice(language2.raw.length);
  }
  let closeIndex = str2.indexOf(close);
  if (closeIndex === -1) {
    closeIndex = len;
  }
  file.matter = str2.slice(0, closeIndex);
  const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
  if (block === "") {
    file.isEmpty = true;
    file.empty = file.content;
    file.data = {};
  } else {
    file.data = parse_default(file.language, file.matter, opts);
  }
  if (closeIndex === len) {
    file.content = "";
  } else {
    file.content = str2.slice(closeIndex + close.length);
    if (file.content[0] === "\r") {
      file.content = file.content.slice(1);
    }
    if (file.content[0] === "\n") {
      file.content = file.content.slice(1);
    }
  }
  excerpt_default(file, opts);
  if (opts.sections === true || typeof opts.section === "function") {
    sections(file, opts.section);
  }
  return file;
}
var stringify2 = function(file, data, options3) {
  if (typeof file === "string")
    file = matter(file, options3);
  return stringify_default(file, data, options3);
};
matter.read = function(filepath, options3) {
  const str2 = fs.readFileSync(filepath, "utf8");
  const file = matter(str2, options3);
  file.path = filepath;
  return file;
};
var test = function(str2, options3) {
  return utils_default.startsWith(str2, defaults_default(options3).delimiters[0]);
};
var language = function(str2, options3) {
  const opts = defaults_default(options3);
  const open = opts.delimiters[0];
  if (matter.test(str2)) {
    str2 = str2.slice(open.length);
  }
  const language2 = str2.slice(0, str2.search(/\r?\n/));
  return {
    raw: language2,
    name: language2 ? language2.trim() : ""
  };
};
matter.cache = {};
var clearCache = function() {
  matter.cache = {};
};
var lib_default = matter;
export {
  clearCache,
  lib_default as default,
  engines_default as engines,
  language,
  stringify2 as stringify,
  test
};
