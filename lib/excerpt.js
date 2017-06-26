'use strict';

const defaults = require('./defaults');

module.exports = function(file, options) {
  const opts = defaults(options);

  if (typeof opts.excerpt === 'function') {
    return opts.excerpt(file, opts);
  }

  const excerpt = opts.excerpt === true ? opts.delimiters[0] : false;
  if (!excerpt) {
    return;
  }

  // if enabled, get the excerpt defined after front-matter
  const idx = file.content.indexOf(excerpt);
  if (idx !== -1) {
    file.excerpt = file.content.slice(0, idx);
  }
};
