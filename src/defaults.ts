import engines from "./engines";
import { GrayMatterOption } from "./types";
import {utils} from "./utils";

const options = <O extends GrayMatterOption<any,any>>(options: O) => {
  const opts = Object.assign({}, options);

  // ensure that delimiters are an array
  opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
  if (opts.delimiters.length === 1) {
    opts.delimiters.push(opts.delimiters[0]);
  }

  opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
  opts.engines = Object.assign({}, engines, opts.parser, opts.engines);
  return opts as O;
};

export default options;
