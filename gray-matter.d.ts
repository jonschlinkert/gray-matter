declare function matter(input: object | string, options?: matter.GrayMatterOption): any

declare namespace matter {
  interface GrayMatterOption {
    /**
     * Extract an excerpt that directly follows front-matter, or is the first thing in the string if no front-matter exists.
     *
     * @type {object}
     * @default undefined
     * @memberof GrayMatterOption
     */
    excerpt?: any;

    /**
     * Define a custom separator to use for excerpts.
     *
     * @type {string}
     * @default undefined
     * @memberof GrayMatterOption
     */
    excerpt_separator?: string;

    /**
     * Define custom engines for parsing and/or stringifying front-matter.
     *
     * @type {object}
     * @default undefined
     * @memberof GrayMatterOption
     */
    engines?: any;

    /**
     * Define the engine to use for parsing front-matter.
     *
     * @type {string}
     * @default "yaml"
     * @memberof GrayMatterOption
     */
    language?: string;

    /**
     * Open and close delimiters can be passed in as an array of strings.
     *
     * @type {string}
     * @default "---"
     * @memberof GrayMatterOption
     */
    delimiters?: string;
  }

  /**
   * Stringify an object to YAML or the specified language, and append it to the given string. By default, only YAML and JSON can be stringified.
   *
   * @export
   * @param {(string | object)} file
   * @param {object} data
   * @param {object} [options]
   * @returns {string}
   */
  function stringify(file: string | object, data: any, options?: any): string;

  /**
   * Synchronously read a file from the file system and parse front matter. Returns the same object as the main function.
   *
   * @export
   * @param {string} filepath
   * @param {object} [options]
   * @returns {object}
   */
  function read(filepath: string, options?: any): any;

  /**
   * Returns true if the given string has front matter.
   *
   * @param {string} str
   * @param {object} [options]
   * @returns {boolean}
   */
  function test(str: string, options?: any): boolean;
}

export = matter
