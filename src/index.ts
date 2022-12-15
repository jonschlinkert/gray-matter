import * as fs from 'node:fs';
import defaults from './defaults';
import sfy from './stringify';
import excerpt from './excerpt';
import toFile from './to-file';
import parse from './parse';
import {utils} from './utils';
import { createFnWithProps } from "inferred-types";
import engines from './engines';
import { GrayMatterApi, GrayMatterFile, GrayMatterFn } from './types';

const matterDict: GrayMatterApi = {
  cache: {},
  
  read(filepath, options) {
    const str = fs.readFileSync(filepath, 'utf8');
    const file = matterFn(str, options as any);
    file.path = filepath;
    return file;
  },

  stringify(file, data, options) {
    return typeof file === "string" 
      ? sfy(matterFn(file, options as any), data, options as any) 
      : sfy(file, data, options as any)
  },

  language(str, options) {
    const opts = defaults(options as any);
    const open = opts?.delimiters ? opts.delimiters[0] : "---";
  
    if (matterDict.test(str)) {
      str = str.slice(open.length);
    }
  
    const language = str.slice(0, str.search(/\r?\n/));

    return {
      raw: language,
      name: language ? language.trim() : ''
    };
  },

  
  parseMatter(file, options)  {
    const opts = defaults(options as any);
    const open = opts.delimiters ? opts.delimiters[0] : '---';
    const close = '\n' + opts.delimiters[1];
    const f  = (
      typeof file === "string" 
      ? {
      content: file,
      path: "",
      language: "",
      data: {},
      contents: undefined,
      matter: "",
      orig: ""
    } 
      : file
    ) as GrayMatterFile<any>;
  
    if (opts.language) {
      f.language = opts.language;
    }
  
    // get the length of the opening delimiter
    const openLen = open.length;
    if (!utils.startsWith(f.content, open, openLen)) {
      excerpt(file, opts);
      return file;
    }
  
    // if the next character after the opening delimiter is
    // a character from the delimiter, then it's not a front-
    // matter delimiter
    if (f.content.charAt(openLen) === open.slice(-1)) {
      return file;
    }
  
    // strip the opening delimiter
    f.content = f.content.slice(openLen);
    const len = f.content.length;
  
    // use the language defined after first delimiter, if it exists
    const language = matter.language(f.content, opts) || opts.language;
    if (language.name) {
      f.language = language.name;
      f.content = f.content.slice(language.raw.length);
    }
  
    // get the index of the closing delimiter
    let closeIndex = f.content.indexOf(close);
    if (closeIndex === -1) {
      closeIndex = len;
    }
  
    // get the raw front-matter block
    f.matter = f.content.slice(0, closeIndex);
  
    const block = f.matter.replace(/^\s*#[^\n]+/gm, '').trim();
    if (block === '') {
      f.isEmpty = true;
      f.empty = f.content;
      f.data = {};
    } else {
      // create file.data by parsing the raw file.matter block
      f.data = parse(f.language, f.matter, opts);
    }
  
    // update file.content
    if (closeIndex === len) {
      f.content = '';
    } else {
      f.content = f.content.slice(closeIndex + close.length);
      if (f.content[0] === '\r') {
        f.content = f.content.slice(1);
      }
      if (f.content[0] === '\n') {
        f.content = f.content.slice(1);
      }
    }
  
    excerpt(f, opts);
  
    // if (opts?.sections === true || typeof opts.section === 'function') {
    //   sections(f, opts.section);
    // }
    return f;
  },

  test(str, options): boolean {
    return utils.startsWith(str, defaults(options as any).delimiters[0]);
  },

  clearCache()  {
    matterDict.cache = {};
  }
}


/**
 * Takes a string or object with `content` property, extracts
 * and parses front-matter from the string, then returns an object
 * with `data`, `content` and other [useful properties](#returned-object).
 *
 * ```js
 * const matter = require('gray-matter');
 * console.log(matter('---\ntitle: Home\n---\nOther stuff'));
 * //=> { data: { title: 'Home'}, content: 'Other stuff' }
 * ```
 * @api public
 */
const matterFn: GrayMatterFn = (input, options) => {
  if (input === '') {
    return { data: {}, content: input, excerpt: '', orig: input };
  }

  let file = toFile(input);
  const cached = matterDict.cache[file.content];

  if (!options) {
    if (cached) {
      file = Object.assign({}, cached);
      file.orig = cached.orig;
      return file;
    }

    // only cache if there are no options passed. if we cache when options
    // are passed, we would need to also cache options values, which would
    // negate any performance benefits of caching
    matterDict.cache[file.content] = file;
  }

  return matterDict.parseMatter(file, options);
}

export const matter = createFnWithProps(matterFn, matterDict) as GrayMatterApi & GrayMatterFn;
export default matter;

export { utils, engines }