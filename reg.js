'use strict';


function Matter(options) {
  this.options = options || {};
  this.parsers = {};
}

Matter.prototype.register = function(lang, fn) {
  this.parsers[lang] = fn;
  return this;
};

Matter.prototype.parse = function(lang) {
  return this.parsers[lang];
};

var matter = new Matter();

matter.register('yaml', function(str, options) {
  var data = {};
  try {
    var YAML = requires.yaml || (requires.yaml = require('js-yaml'));
    data = YAML.safeLoad(str, options);
  } catch (err) {
    console.log('  [gray-matter] json:', err);
  }
  return data;
});


console.log(matter)
