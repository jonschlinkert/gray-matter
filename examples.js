var matter = require('./');
var file = matter([
  '---',
  'foo: bar',
  '---',
  'This is an excerpt.',
  '---',
  'This is content'
].join('\n'), {excerpt: true});

console.log(file);
console.log(file.stringify());

var file = matter([
  '---',
  'foo: bar',
  '---',
  'This is content'
].join('\n'));

console.log(file.stringify({
  baz: ['one', 'two', 'three']
}));

var file = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content'
].join('\n'));
console.log(file.stringify());

var file = matter([
  '---json',
  '{',
  '  "name": "gray-matter"',
  '}',
  '---',
  'This is content'
].join('\n'));
console.log(file);
console.log(file.stringify({}, {language: 'json', spaces: 2}));

var file = matter([
  '---js',
  'var foo = "bar"',
  '---',
  'This is content'
].join('\n'));
console.log(file);
console.log(file.stringify());

var file = matter([
  '---js',
  'foo: "bar"',
  '---',
  'This is content'
].join('\n'));
console.log(file);
console.log(file.stringify());

var file = matter([
  '---js',
  'reverse: function(str) {',
  '  return str.split(",").reverse().join("");',
  '}',
  '---',
  'This is content'
].join('\n'));
// console.log(file);

file.data.baz = file.data.reverse('a,b');
console.log(file.stringify(null, {language: 'json'}));
