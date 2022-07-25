var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// lib/index.js
var lib_exports = {};
__export(lib_exports, {
  default: () => lib_default,
  matter: () => matter
});
module.exports = __toCommonJS(lib_exports);
var import_fs = __toESM(require("fs"), 1);
var import_section_matter = __toESM(require("section-matter"), 1);

// lib/engines.js
var import_js_yaml = __toESM(require("js-yaml"), 1);

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
var parse = (language, str2, options3) => {
  const opts = defaults_default(options3);
  const engine2 = engine_default(language, opts);
  if (typeof engine2.parse !== "function") {
    throw new TypeError('expected "' + language + '.parse" to be a function');
  }
  return engine2.parse(str2, opts);
};
var parse_default = parse;

// lib/engines.js
var engines = {
  yaml: {
    parse: import_js_yaml.default.load.bind(import_js_yaml.default),
    stringify: import_js_yaml.default.dump.bind(import_js_yaml.default)
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
var import_strip_bom_string = __toESM(require("strip-bom-string"), 1);
var import_kind_of = __toESM(require("kind-of"), 1);
function define(obj, key, val) {
  Reflect.defineProperty(obj, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: val
  });
}
function isBuffer(val) {
  return (0, import_kind_of.default)(val) === "buffer";
}
function isObject(val) {
  return (0, import_kind_of.default)(val) === "object";
}
function toBuffer(input) {
  return typeof input === "string" ? Buffer.from(input) : input;
}
function toString(input) {
  if (isBuffer(input))
    return (0, import_strip_bom_string.default)(String(input));
  if (typeof input !== "string") {
    throw new TypeError("expected input to be a string or buffer");
  }
  return (0, import_strip_bom_string.default)(input);
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
var import_kind_of2 = __toESM(require("kind-of"), 1);
function newline(str2) {
  return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
}
var stringify = (file, data, options3) => {
  if (data == null && options3 == null) {
    switch ((0, import_kind_of2.default)(file)) {
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
  const language = file.language || opts.language;
  const engine2 = engine_default(language, opts);
  if (typeof engine2.stringify !== "function") {
    throw new TypeError('expected "' + language + '.stringify" to be a function');
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
var import_kind_of3 = __toESM(require("kind-of"), 1);
var toFile = (file) => {
  if ((0, import_kind_of3.default)(file) !== "object") {
    file = { content: file };
  }
  if ((0, import_kind_of3.default)(file.data) !== "object") {
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
  const language = matter.language(str2, opts);
  if (language.name) {
    file.language = language.name;
    str2 = str2.slice(language.raw.length);
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
    (0, import_section_matter.default)(file, opts.section);
  }
  return file;
}
matter.engines = engines_default;
matter.stringify = function(file, data, options3) {
  if (typeof file === "string")
    file = matter(file, options3);
  return stringify_default(file, data, options3);
};
matter.read = function(filepath, options3) {
  const str2 = import_fs.default.readFileSync(filepath, "utf8");
  const file = matter(str2, options3);
  file.path = filepath;
  return file;
};
matter.test = function(str2, options3) {
  return utils_default.startsWith(str2, defaults_default(options3).delimiters[0]);
};
matter.language = function(str2, options3) {
  const opts = defaults_default(options3);
  const open = opts.delimiters[0];
  if (matter.test(str2)) {
    str2 = str2.slice(open.length);
  }
  const language = str2.slice(0, str2.search(/\r?\n/));
  return {
    raw: language,
    name: language ? language.trim() : ""
  };
};
matter.cache = {};
matter.clearCache = function() {
  matter.cache = {};
};
var lib_default = matter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  matter
});
