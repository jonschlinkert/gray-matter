# gray-matter [![NPM version](https://badge.fury.io/js/gray-matter.svg)](http://badge.fury.io/js/gray-matter)  [![Build Status](https://travis-ci.org/jonschlinkert/gray-matter.svg)](https://travis-ci.org/jonschlinkert/gray-matter)

> Parse front-matter from a string or file. Fast, reliable and easy to use. Parses YAML front matter by default, but also has support for YAML, JSON, TOML or Coffee Front-Matter, with options to set custom delimiters. Used by metalsmith, assemble, verb and many other projects.

See the [benchmarks](#benchmarks). gray-matter is 20-30x faster than [front-matter](https://github.com/jxson/front-matter).

## Highlights

* Reliable and battle-tested by [metalsmith](https://github.com/segmentio/metalsmith), [assemble](https://github.com/assemble/assemble), [verb](https://github.com/assemble/verb), and many other projects!
* Extracts and parses:
  - [YAML](http://github.com/nodeca/js-yaml)
  - [JSON](http://en.wikipedia.org/wiki/Json)
  - [TOML](http://github.com/mojombo/toml)
  - [CoffeeScript](http://coffeescript.org) when `options.eval` is set to `true`
  - [CSON](https://github.com/bevry/cson) when `options.eval` is set to `true`
  - JavaScript: when `options.eval` is set to `true`
* Easy to add additional parsers! pull requests welcome!

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i gray-matter --save
```

Install with [bower](http://bower.io/)

```sh
$ bower install gray-matter --save
```

## Usage

```js
var matter = require('gray-matter');
matter('---\ntitle: Front Matter\n---\nThis is content.');
```

Returns:

```js
{ 
  orig: '---\ntitle: Front Matter\n---\nThis is content.',
  data: { title: 'Front Matter' },
  content: '\nThis is content.' 
}
```

That's it! Just pass a string and gray-matter returns an object.

***

## API

### [matter](index.js#L30)

Parses a `string` of front-matter with the given `options`, and returns an object.

**Params**

* 
`string` **{String}**: The string to parse.

* 
`options` **{Object}**

- `delims` **{Array}**: Custom delimiters formatted as an array. The default is `['---', '---']`.
- `parser` **{Function}**: Parser function to use. [js-yaml](https://github.com/nodeca/js-yaml)is the default.

* 
`returns` **{Object}**: Valid JSON

**Example**

```js
matter('---\ntitle: foo\n---\nbar');
//=> {data: {title: 'foo'}, content: 'bar', orig: '---\ntitle: foo\n---\nbar'}
```

### [.read](index.js#L134)

Read a file and parse front matter. Returns the same object as `matter()`.

**Params**

* `fp` **{String}**: file path of the file to read.
* `options` **{Object}**: Options to pass to gray-matter.
* `returns` **{Object}**

**Example**

```js
matter.read('home.md');
```

### [.stringify](index.js#L165)

Stringify an object to front-matter-formatted YAML, and concatenate it to the given string.

Results in:

**Params**

* `str` **{String}**: The content string to append to stringified front-matter.
* `data` **{Object}**: Front matter to stringify.
* `options` **{Object}**: Options to pass to js-yaml
* `returns` **{String}**

**Examples**

```js
matter.stringify('foo bar baz', {title: 'Home'});
```

```yaml
---
title: Home
---
foo bar baz
```

## Options

> All methods exposed on the API accept an options object passed as the last argument

## options.parser

Type: `Function`

Default: `undefined`

Pass a custom parser on the options. This is useful if you need to, for example, define custom schemas for [js-yaml](https://github.com/nodeca/js-yaml).

**Example**

```js
matter(str, {
  parser: require('js-yaml').safeLoad
});
```

## options.eval

Type: `Boolean`

Default: `false`

Evaluate coffee-script, CSON or JavaScript in front-matter. If you aren't aware of the dangers, google is your friend.

However, if you are aware and you only use front-matter on, say, blog posts for a static site... this feature can be pretty useful.

## options.lang

Type: `String`

Default: `yaml`

The parser to use on the extracted front matter.

YAML is parsed by default, and the languages listed below are parsed automatically if the language is specified after the first delimiter (e.g. `---`).

Valid languages are:

* `yaml`
* `json`
* `coffee`
* `cson`
* `toml`
* `js`|`javascript`

**Example**

To parse coffee front matter, you would define it as follows:

```js
---coffee
title: 'coffee functions'
user: 'jonschlinkert'
fn:
  reverse = (src) ->
    src.split('').reverse().join('')
---

<%= description %>
<%= reverse(user) %>
```

## options.delims

Type: `String`

Default: `---`

Open and close delimiters can be passed in as an array of strings.

**Example:**

```js
// format delims as a string
matter.read('file.md', {delims: '~~~'});
// or an array (open/close)
matter.read('file.md', {delims: ['~~~', '~~~']});
```

would parse:

<pre>

```
title: Home
```

This is the {{title}} page.
</pre>

## Example usage

Given we have a page, `abc.html`, containing:

```html
---
title: YAML Front matter
description: This is a page
---
<h1>{{title}}</h1>
```

then running the following in the command line:

```js
matter('abc.html');
```

returns

```json
{
  "data": {
    "title": "YAML Front matter",
    "description": "This is a page"
  },
  "content": "<h1>{{title}}</h1>",
  "original": "---\ntitle: YAML Front matter\n---\n<h1>{{title}}</h1>"
}
```

## Benchmarks

**Benchmarks for building the [bootstrap-blog](https://github.com/twbs/bootstrap-blog/tree/gh-pages/_posts)**

gray-matter would process all markdown posts in the [bootstrap-blog](https://github.com/twbs/bootstrap-blog/tree/gh-pages/_posts) **20 times** before the [front-matter](https://github.com/jxson/front-matter) library finished processing it once.

```
front-matter.js x 271 ops/sec ±2.68% (80 runs sampled)
gray-matter.js x 4,294 ops/sec ±0.86% (91 runs sampled)
```

**Misc**

gray-matter is 12-20x faster than [front-matter](https://github.com/jxson/front-matter)when content or front matter actually exist.

```bash
#1: complex.js
  front-matter.js x 433 ops/sec ±1.21% (91 runs sampled)
  gray-matter.js x 9,491 ops/sec ±1.07% (92 runs sampled)

#2: empty.js
  front-matter.js x 5,744,976 ops/sec ±0.76% (99 runs sampled)
  gray-matter.js x 18,048,669 ops/sec ±0.84% (93 runs sampled)

#3: matter.js
  front-matter.js x 10,739 ops/sec ±2.65% (84 runs sampled)
  gray-matter.js x 201,322 ops/sec ±0.71% (93 runs sampled)

#4: no-content.js
  front-matter.js x 13,097 ops/sec ±3.00% (82 runs sampled)
  gray-matter.js x 198,441 ops/sec ±0.49% (101 runs sampled)

#5: no-matter.js
  front-matter.js x 5,420,088 ops/sec ±0.79% (96 runs sampled)
  gray-matter.js x 9,559,091 ops/sec ±1.33% (92 runs sampled)
```

## Why?

> Why another YAML Front Matter library?

Because other libraries we tried failed to meet our requirements with [Assemble](http://assemble.io). Some most of the libraries met most of the requirements, but _none had all of them_. Here are the most important:

* Be usable, if not simple
* Allow custom delimiters
* Use a dependable and well-supported library for parsing YAML and other languages
* Don't fail when no content exists
* Don't fail when no front matter exists
* Have no problem reading YAML files directly
* Have no problem with complex content, including **non-front-matter** fenced code blocks that contain examples of YAML front matter. Other parsers fail on this.
* Should return an object with three properties:
  - `data`: the parsed YAML front matter, as a JSON object
  - `content`: the contents as a string, without the front matter
  - `orig`: the "original" content

## Related projects
* [assemble](https://www.npmjs.com/package/assemble): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt,… [more](https://www.npmjs.com/package/assemble) | [homepage](http://assemble.io)
* [metalsmith](https://www.npmjs.com/package/metalsmith): An extremely simple, pluggable static site generator. | [homepage](https://github.com/segmentio/metalsmith)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Building the docs

Install dev dependencies:

```sh
$ npm i -g verb && verb
```

## Updating js-yaml

A minified copy of js-yaml is stored locally, since the js-yaml project contains a lot of unrelated junk when installed via npm.

To update the js-yaml version used in the project, run:

```sh
$ npm i js-yaml --save-dev && gulp uglify
```

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/gray-matter/issues/new).

## License

Copyright © 2014-2015 [Jon Schlinkert](https://github.com/jonschlinkert)
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 14, 2015._