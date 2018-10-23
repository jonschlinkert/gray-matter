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
 * @param {Object|String} `input` String, or object with `content` string
 * @param {Object} `options`
 * @return {Object}
 * @api public
 */
declare function matter<
  I extends matter.Input,
  O extends matter.GrayMatterOption<I, O>
  >(input: I | { content: I }, options?: O): matter.GrayMatterFile<I>

declare namespace matter {
  type Input = string | Buffer
  interface GrayMatterOption<
    I extends Input,
    O extends GrayMatterOption<I, O>
    > {
    parser?: () => void
    eval?: boolean
    excerpt?: boolean | ((input: I, options: O) => string)
    excerpt_separator?: string
    engines?: {
      [index: string]:
      | ((string) => object)
      | { parse: (string) => object; stringify?: (object) => string }
    }
    language?: string
    delimiters?: string | [string, string]
    sections?: boolean
    section?: (section: GrayMatterSection, sections?: Array<GrayMatterSection>) => void
  }

  /**
   * Structure representing the matter section
   */
  interface GrayMatterSection {
    /**
     * Key of the section
     */
    key: string;
    /**
     * The object created by parsing section matter
     */
    data: { [key: string]: any }
    /**
     * The section string, with matter stripped.
     */
    content: string
  }

  /**
   * Structure representing the result of parse or read operations
   */
  interface GrayMatterFile<I extends Input> {
    /**
     * The object created by parsing front-matter
     */
    data: { [key: string]: any }
    /**
     * The input string, with matter stripped.
     * If sections were used, there will be in separate property
     */
    content: string
    /**
     * An excerpt, if defined on the options
     */
    excerpt?: string
    /**
     * The original input string (or buffer)
     */
    orig: Buffer | I
    /**
     * The front-matter language that was parsed. yaml is the default
     */
    language: string
    /**
     * The raw, un-parsed front-matter string
     */
    matter: string
    /**
     * Stringify the file by converting file.data to a string in the given language, wrapping it in delimiters and prepending it to file.content.
     * @param {string} `lang` front-matter language to use. Only YAML and JSON can be stringified
     */
    stringify(lang: string): string
    /**
     * Sections, if defined on the options
     */
    sections?: Array<GrayMatterSection>
  }

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
   * @param {String|Object} `file` The content string to append to stringified front-matter, or a file object with `file.content` string.
   * @param {Object} `data` Front matter to stringify.
   * @param {Object} `options` [Options](#options) to pass to gray-matter and [js-yaml].
   * @return {String} Returns a string created by wrapping stringified yaml with delimiters, and appending that to the given string.
   */
  export function stringify<O extends GrayMatterOption<string, O>>(
    file: string | { content: string },
    data: object,
    options?: GrayMatterOption<string, O>
  ): string

  /**
   * Synchronously read a file from the file system and parse
   * front matter. Returns the same object as the [main function](#matter).
   *
   * ```js
   * var file = matter.read('./content/blog-post.md');
   * ```
   * @param {String} `filepath` file path of the file to read.
   * @param {Object} `options` [Options](#options) to pass to gray-matter.
   * @return {Object} Returns [an object](#returned-object) with `data` and `content`
   */
  export function read<O extends GrayMatterOption<string, O>>(
    fp: string,
    options?: GrayMatterOption<string, O>
  ): matter.GrayMatterFile<string>

  /**
   * Returns true if the given `string` has front matter.
   * @param  {String} `string`
   * @param  {Object} `options`
   * @return {Boolean} True if front matter exists.
   */
  export function test<O extends matter.GrayMatterOption<string, O>>(
    str: string,
    options?: GrayMatterOption<string, O>
  ): boolean

  /**
   * Detect the language to use, if one is defined after the
   * first front-matter delimiter.
   * @param  {String} `string`
   * @param  {Object} `options`
   * @return {Object} Object with `raw` (actual language string), and `name`, the language with whitespace trimmed
   */
  export function language<O extends matter.GrayMatterOption<string, O>>(
    str: string,
    options?: GrayMatterOption<string, O>
  ): { name: string; raw: string }
}

export = matter
