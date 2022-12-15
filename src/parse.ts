
import getEngine from "./engine";
import defaults from "./defaults";

const parse = (language: any, str: string, options: any) => {
  const opts = defaults(options);
  const engine = getEngine(language, opts);
  if (typeof engine.parse !== "function") {
    throw new TypeError('expected "' + language + '.parse" to be a function');
  }
  return engine.parse(str, opts);
};

export default parse;
