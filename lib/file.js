'use strict';

const stringify = require('./stringify');
const utils = require('./utils');

/**
 * Create an object
 */

function File(file) {
  if (utils.isObject(file)) {
    return Object.assign(utils.normalize(file), this);
  }
  Object.assign(this, utils.normalize(file));
}

File.prototype.isFile = true;
File.prototype.language = 'yaml';
File.prototype.matter = '';

File.prototype.stringify = function(data, options) {
  const matter = Object.assign({}, this.data, data);
  return stringify(this.content, matter, options);
};

/**
 * Expose `File`
 */

module.exports = File;
