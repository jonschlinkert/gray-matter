// https://github.com/jonschlinkert/gray-matter/issues/43
var frontMatter = require('..');

var docs = [
  {
    id: 1,
    content: ''
  },
  {
    id: 2,
    content: ''
  }
];

var parsedDocs = docs.map(doc => {
  var output = frontMatter(doc.content);
  Object.assign(output, { id: doc.id });
  return output;
}).map(({ id }) => id);
console.log(parsedDocs);
