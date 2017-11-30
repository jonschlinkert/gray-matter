var path = require('path');
var matter = require('..');
var coffee = require('coffeescript');
var magenta = require('ansi-magenta');

var fixture = path.join.bind(path, __dirname, 'fixtures');
var engines = {
  coffee: {
    parse: function(str, options) {
      /* eslint no-eval: 0 */
      return coffee['eval'](str, options);
    }
  }
};

console.log(magenta('/* coffescript (detected after first delimiter) */'));
var file = matter.read(fixture('coffee-auto.md'), {engines: engines});
console.log(file);
console.log();

console.log(magenta('/* coffescript (defined on options) */'));
var file = matter.read(fixture('coffee.md'), {
  language: 'coffee',
  engines: engines
});
console.log(file);
