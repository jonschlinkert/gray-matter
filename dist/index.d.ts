import yaml from 'js-yaml';

type Input = string | Buffer;
interface GrayMatterFile<I extends Input> {
    path: string;
    data: {
        [key: string]: any;
    };
    content: string;
    contents: any;
    excerpt?: string;
    orig: I;
    language: string;
    matter: string;
    isEmpty?: boolean;
    empty?: any;
    stringify(lang: string): string;
}
interface GrayMatterOption<I extends Input, O extends GrayMatterOption<I, O>> {
    parser?: <A extends any[], R>(...args: A) => R;
    eval?: boolean;
    excerpt?: boolean | ((input: GrayMatterFile<I>, options: O) => string);
    excerpt_separator?: string;
    sections?: boolean;
    section?: any;
    safeLoad?: boolean;
    engines?: {
        [index: string]: ((input: string) => object) | {
            parse: (input: string) => object;
            stringify?: (data: object) => string;
        };
    };
    language?: string;
    /** @deprecated use `language` instead */
    lang?: string;
    delimiters?: string | string[];
    /** @deprecated use `delimiters` instead */
    delims?: string | string[];
}
/**
 * Takes a string or object with `content` property, extracts
 * and parses front-matter from the string, then returns an object
 * with `data`, `content` and other [useful properties](#returned-object).
 *
 * ```js
 * var matter = require('gray-matter');
 * console.log(matter('---\ntitle: Home\n---\nOther stuff'));
 * //=> { data: { title: 'Home'}, content: 'Other stuff' }
 * ```
 */
type GrayMatterFn = <I extends Input, O extends GrayMatterOption<I, O>>(input: I | {
    content: I;
}, options?: O) => GrayMatterFile<I>;
interface GrayMatterApi {
    /**
     * Detect the language to use, if on eis defined after the first
     * front-matter delimiter.
     */
    language<I extends Input, O extends GrayMatterOption<I, O>>(str: string, options?: GrayMatterOption<I, O>): {
        name: string;
        raw: string;
        [key: string]: any;
    };
    /**
     * Returns `true` if the given _string_ has front-matter.
     */
    test<I extends Input, O extends GrayMatterOption<I, O>>(str: string, options?: GrayMatterOption<I, O>): boolean;
    /**
     * Synchronously read a file from the file system and parse
     * front matter. Returns the same object as the [main function](#matter).
     *
     * ```js
     * var file = matter.read('./content/blog-post.md');
     * ```
     */
    read<I extends Input, O extends GrayMatterOption<I, O>>(fp: string, options?: GrayMatterOption<I, O>): GrayMatterFile<string>;
    /**
     * Stringify an object to YAML or the specified language, and
     * append it to the given string. By default, only YAML and JSON
     * can be stringified. See the [engines](#engines) section to learn
     * how to stringify other languages.
     *
     * ```js
     * console.log(matter.stringify('foo bar baz', {title: 'Home'}));
     * // results in:
     * // ---
     * // title: Home
     * // ---
     * // foo bar baz
     * ```
     */
    stringify<I extends Input, O extends GrayMatterOption<I, O>>(file: string | GrayMatterFile<I>, data?: object, options?: GrayMatterOption<I, O>): string;
    /**
     * Parses the gray-matter
     */
    parseMatter<I extends Input, O extends GrayMatterOption<I, O>>(file: string | GrayMatterFile<I>, options?: GrayMatterOption<I, O>): any;
    clearCache(): void;
    cache: Record<string, any>;
}

/**
 * Default engines
 */
declare const engines: {
    yaml: {
        parse: typeof yaml.load;
        stringify: typeof yaml.dump;
    };
    json: {
        parse: (text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => any;
        stringify: (obj: any, options: any) => string;
    };
    javascript(str: any, options: any, wrap: any): any;
    stringify(): never;
};

declare const utils: {
    define: (obj: any, key: any, val: any) => void;
    /**
     * Returns true if `val` is a buffer
     */
    isBuffer: (val: any) => boolean;
    /**
     * Returns true if `val` is an object
     */
    isObject: (val: any) => boolean;
    /**
   * Cast `input` to a buffer
   */
    toBuffer(input: any): any;
    /**
   * Cast `val` to a string.
   */
    toString(input: any): any;
    /**
   * Cast `val` to an array.
   */
    arrayify(val: any): any[];
    /**
   * Returns true if `str` starts with `substr`.
   */
    startsWith(str: string, substr: string, len?: number): boolean;
};

declare const matter: GrayMatterApi & GrayMatterFn;

export { matter as default, engines, matter, utils };
