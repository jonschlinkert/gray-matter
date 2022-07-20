import path from 'path';
import minimist from 'minimist';
import suite from 'benchmarked';
import write from 'write';

const argv = minimist(process.argv.slice(2));

const cwd = path.join.bind(path, argv.cwd || '');
const dir = path.join.bind(path, __dirname);
const code = argv.c || argv.code || '{gray,front}-matter.js';
const fixtures = argv.f || argv.fixtures || '{complex*,empty,matter,no-*}.js';

suite.run({code: `code/${cwd(code)}`, fixtures: `fixtures/${cwd(fixtures)}`})
  .then(function(stats) {
    write.sync(dir('stats.json'), JSON.stringify(stats, null, 2));
    write.sync(dir('stats.md'), suite.render(stats));
  })
  .catch(console.error);
