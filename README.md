# gray-matter [![NPM version](https://badge.fury.io/js/gray-matter.svg)](http://badge.fury.io/js/gray-matter)


> A simple to use and extend front matter library. Supports parsing and extracting YAML, JSON, TOML or Coffee Front-Matter, with options to set custom delimiters.

Used by [assemble](https://github.com/assemble/assemble), [verb](https://github.com/assemble/verb), and thousands of other projects!

**v0.5.0 has breaking changes!**

* YAML is now parsed using the `.safeLoad()` method from [js-yaml](http://github.com/nodeca/js-yaml).
* To parse coffee, CSON or javascript front matter, you must set `options.eval` to true.
* `stringify()` has been renamed to `toJSON()`
* `stringifyYAML()` has been renamed to `toYAML()`


## Highlights

* Reliable and battle-tested. 
* Will extract and parse:
  * [YAML](http://github.com/nodeca/js-yaml)
  * [JSON](http://en.wikipedia.org/wiki/Json)
  * [TOML](http://github.com/mojombo/toml)
  * [CoffeeScript](http://coffeescript.org) when `options.eval` is set to `true`
  * [CSON](https://github.com/bevry/cson) when `options.eval` is set to `true`
  * JavaScript: when `options.eval` is set to `true`
* Easy to add additional parsers! pull requests welcome!

#### TOC



<!-- toc -->

* [Highlights](#highlights)
* [Install](#install)
* [Usage](#usage)
* [API](#api)
  * [.read](#read)
  * [.exists](#exists)
  * [.extend](#extend)
  * [.reconstruct](#reconstruct)
  * [.toJSON](#tojson)
  * [.toYAML](#toyaml)
* [Options](#options)
  * [options.eval](#optionseval)
  * [options.lang](#optionslang)
  * [options.delims](#optionsdelims)
  * [options.autodetect](#optionsautodetect)
* [Examples](#examples)
  * [.extend](#extend)
* [Why?](#why)
* [Authors](#authors)
* [License](#license)

<!-- toc stop -->


## Install
#### Install with [npm](npmjs.org)

```bash
npm i gray-matter --save
```
#### Install with [bower](https://github.com/bower/bower)

```bash
bower install gray-matter --save
```

## Usage

```js
var matter = require('gray-matter');
console.log(matter('---\ntitle: foo\n---\nbar');
//=> {data: {title: 'foo'}, content: 'bar', orig: '---\ntitle: foo\n---\nbar'}
```


## API

`matter()` method expects a string and returns and object:

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

### .read

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

### .exists

Returns `true` or `false` if front matter exists:

```js
matter.exists(str);
```

### .extend

Extend and stringify **YAML** front matter. Takes an object as the second parameter, and returns either the extended, stringified object (YAML), or if no front matter is found an empty string is returned.

```js
matter.extend(str, obj);
```

### .reconstruct

A convenience wrapper around the `matter` and `matter.extend`. Extends YAML front matter, then re-assembles front matter with the content of the file.

```js
matter.reconstruct(str, obj);
```

### .toJSON

A convenience wrapper around the `matter(str).data` method.

```js
matter.toJSON(str);
```


### .toYAML

Stringify parsed front matter back to YAML.

```js
matter.toYAML(str);
```


## Options
> All methods will accept an options object to be passed as a second parameter

### options.eval
Type: `Boolean`

Default: `false`

Evaluate coffee-script, CSON or JavaScript in front-matter. If you aren't aware of the dangers, google is your friend.

### options.lang
Type: `String`

Default: `yaml`

The parser to use on the extracted front matter. Valid options include:

* `yaml`
* `json`
* `coffee` 
* `cson` 
* `toml` 
* `js`|`javascript`

### options.delims
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


### options.autodetect
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

{%= user %}
{%= reverse(user) %}
```


## Examples

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

### .extend

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
* Use a dependable and well-supported library for parsing YAML and other languages
* Don't fail when no content exists
* Don't fail when no front matter exists
* Have no problem reading YAML files directly
* Have no problem with complex content, including fenced code blocks that contain examples of YAML front matter. Other parsers fail on this.
* Should return an object that contains the parsed YAML front matter and content, as well as the "original" content.



## Authors

**Jon Schlinkert**
 
+ [github/assemble](https://github.com/assemble)
+ [twitter/assemble](http://twitter.com/assemble) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 29, 2014._


[js-yaml]: https://github.com/nodeca/js-yaml
[coffee-script]: https://github.com/jashkenas/coffeescript
[toml-node]: https://github.com/BinaryMuse/toml-node
