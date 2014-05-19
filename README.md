# gray-matter [![NPM version](https://badge.fury.io/js/gray-matter.png)](http://badge.fury.io/js/gray-matter)

> A simple to use and extend front matter library. Supports parsing and extracting YAML, JSON, TOML or Coffee Front-Matter, with options to set custom delimiters.

v0.4.0 has breaking changes! `context` has been changed to `data`.

* Use custom delimiters
* Will extract and parse:
  * [YAML](http://github.com/nodeca/js-yaml)
  * [JSON](http://en.wikipedia.org/wiki/Json)
  * [CoffeeScript](http://coffeescript.org)
  * [TOML](http://github.com/mojombo/toml)
* Easy to add additional parsers!

#### TOC

<!-- toc -->
* [Install](#install)
* [Usage](#usage)
* [Methods](#methods)
  * [matter](#matter)
  * [matter.read](#matterread)
  * [matter.exists](#matterexists)
  * [matter.extend](#matterextend)
  * [matter.recontruct](#matterrecontruct)
  * [matter.stringify](#matterstringify)
  * [matter.stringifyYAML](#matterstringifyyaml)
* [Options](#options)
  * [lang](#lang)
  * [delims](#delims)
  * [autodetect](#autodetect)
* [Examples](#examples)
  * [matter](#matter)
  * [matter.extend](#matterextend)
* [Why?](#why)
* [Authors](#authors)
* [License](#license)

<!-- toc stop -->
## Install
Install with [npm](npmjs.org)

```bash
npm i gray-matter --save
```
Install with [bower](https://github.com/bower/bower)

```bash
bower install gray-matter --save
```

## Usage
```js
var matter = require('gray-matter');
matter(String, Object);
```

## Methods
### matter

By default the `matter()` method expects a string. So this:

```js
matter(str);
```

results in something like:

```json
{
  "data": {"foo": "bar"},
  "content": "baz",
  "original": "---\nfoo: bar\n---\nbaz"
}
```

### matter.read

Read a file from the file system before parsing.

```js
matter.read('file.md');
```
Returns:

```json
{
  "data": {"foo": "bar"},
  "content": "baz",
  "original": "---\nfoo: bar\n---\nbaz"
}
```

### matter.exists

Returns `true` or `false` if front matter exists:

```js
matter.exists(str);
```

### matter.extend

Extend and stringify **YAML** front matter. Takes an object as the second parameter, and returns either the extended, stringified object (YAML), or if no front matter is found an empty string is returned.

```js
matter.extend(str, obj);
```

### matter.recontruct

A convenience wrapper around the `matter` and `matter.extend`. Extends YAML front matter, then re-assembles front matter with the content of the file.

```js
matter.recontruct(str, obj);
```

### matter.stringify

A convenience wrapper around the `matter(str).data` method.

```js
matter.stringify(str);
```


### matter.stringifyYAML

Stringify parsed front matter back to YAML.

```js
matter.stringifyYAML(str);
```

## Options
> All methods will accept an options object to be passed as a second parameter

### lang
Type: `String`

Default: `yaml`

The parser to use on the extracted front matter. Valid options include:
* `yaml`
* `json`
* `coffee` requires the [`coffee-script`](https://www.npmjs.org/package/coffee-script) package
* `toml` requires the [`toml`](https://www.npmjs.org/package/toml) package

### delims
Type: `Object`

Default: `{delims: ['---', '---']}`

Open and close delimiters can be passed in as an array of strings. Example:

```js
matter.read('file.md', {delims: ['~~~', '~~~']});
```

You may also pass an array of arrays, allowing multiple alternate delimiters to be used. Example:


```js
{
  delims: [
    ['---', '~~~'], ['---', '~~~']
  ]
}
```
_Note that passing multiple delimiters will yield unpredictable results, it is recommended that you use this option only for testing purposes._

### autodetect
Type: `Boolean`

Default: `undefined`

Attempts to automatically register a language that is specified after the first code boundary (delimiter).

Usage Example:

```coffee
--- coffee
user = 'jonschlinkert'
reverse = (src) ->
  src.split('').reverse().join('')
---

[%= user %]
[%= reverse(user) %]
```

## Examples
### matter

Let's say our page, `foo.html` contains

```html
---
title: YAML Front matter
description: This is a page
---
<h1>{{title}}</h1>
```

then running the following in the command line:

```js
console.log(matter('foo.html'));
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
and

```js
console.log(matter('foo.html').data);
```
returns


```json
{"title": "YAML Front matter", "description": "This is a page"}
```

### matter.extend

Given this page:

```html
---
title: Gray Matter
---
Hooray!
```
and this config:

```js
var file = require('fs').readFileSync('file.md', 'utf8');
var obj = {
  description: 'A simple to use front matter lib';
};
matter.extend(file, obj);
```

the result would be:

```html
---
title: Gray Matter
description: A simple to use front matter lib
---
Hooray!
```

## Why?
> Why another YAML Front Matter library?

Because other libraries we tried failed to meet our requirements with [Assemble](http://assemble.io). Some most of the libraries met most of the requirements, but _none had all of them_. Here are the most important:

* Be usable, if not simple
* Allow custom delimiters
* Use a dependable and well-supported library for parsing YAML
* Don't fail if YAML front matter exists, but no content
* Don't fail if content exists, but no YAML front matter
* Have no problem reading YAML files directly
* Have no problem with complex content, including fenced code blocks containing examples of YAML front matter.
* Should return an object that contains the parsed YAML front matter and content, as well as the "original" content.


## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/doowb)


## License
Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 19, 2014._