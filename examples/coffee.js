const path = require('path');
const matter = require('..');
const coffee = require('coffeescript');
const green = require('ansi-green');
const fixture = path.join.bind(path, __dirname, 'fixtures');
let file;

const engines = {
  coffee: {
    parse: function(str, options) {
      /* eslint no-eval: 0 */
      return coffee['eval'](str, options);
    }
  }
};

console.log(green('/* coffescript (detected after first delimiter in front-matter) */'));
file = matter.read(fixture('coffee-auto.md'), {engines: engines});
console.log(file);
console.log();

console.log(green('/* coffescript (defined on options) */'));
file = matter.read(fixture('coffee.md'), {
  language: 'coffee',
  engines: engines
});
console.log(file);
