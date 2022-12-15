
import stripBom from 'strip-bom-string';
import typeOf from 'kind-of';

export const utils = {
  define: (obj: any, key: any, val: any) => {
    Reflect.defineProperty(obj, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: val
    });
  },
  /**
   * Returns true if `val` is a buffer
   */
  isBuffer: (val: any) => {
    return typeOf(val) === 'buffer';
  },
  /**
   * Returns true if `val` is an object
   */
  isObject: (val: any) => {
    return typeOf(val) === 'object';
  },
  /**
 * Cast `input` to a buffer
 */
  toBuffer(input: any) {
    return typeof input === 'string' ? Buffer.from(input) : input;
  },
  /**
 * Cast `val` to a string.
 */
  toString(input) {
    if (utils.isBuffer(input)) return stripBom(String(input));
    if (typeof input !== 'string') {
      throw new TypeError('expected input to be a string or buffer');
    }
    return stripBom(input);
  },
  /**
 * Cast `val` to an array.
 */
  arrayify(val) {
    return val ? (Array.isArray(val) ? val : [val]) : [];
  },
  /**
 * Returns true if `str` starts with `substr`.
 */
  startsWith(str: string, substr: string, len?: number) {
    if (typeof len !== 'number') len = substr.length;
    return str.slice(0, len) === substr;
  }
}

