# gray-matter [![NPM version](https://badge.fury.io/js/gray-matter.svg)](http://badge.fury.io/js/gray-matter)

> Front-matter parsing done right. Fast, reliable and easy to use. Parses YAML front matter by default, but also has support for YAML, JSON, TOML or Coffee Front-Matter, with options to set custom delimiters.

## Highlights

* Reliable and battle-tested with [assemble](https://github.com/assemble/assemble), [verb](https://github.com/assemble/verb), and many other projects!
* Will extract and parse:
  * [YAML](http://github.com/nodeca/js-yaml)
  * [JSON](http://en.wikipedia.org/wiki/Json)
  * [TOML](http://github.com/mojombo/toml)
  * [CoffeeScript](http://coffeescript.org) when `options.eval` is set to `true`
  * [CSON](https://github.com/bevry/cson) when `options.eval` is set to `true`
  * JavaScript: when `options.eval` is set to `true`
* Easy to add additional parsers! pull requests welcome!


#### Example TOC
<!-- toc -->

## Install with [npm](npmjs.org)

```bash
npm i gray-matter --save
```
### Install with [bower](https://github.com/bower/bower)

```bash
bower install gray-matter --save
```

## Usage

```js
var matter = require('gray-matter');
matter('---\ntitle: Front Matter\n---\nThis is content.');
```


## API
### [matter](index.js#L30)

Parses a `string` of front-matter with the given `options`, and returns an object.

* `string` **{String}**: The string to parse.    
* `options` **{Object}**  
    - `delims` **{Array}**: Custom delimiters formatted as an array. The default is `['---', '---']`.
    - `parser` **{Function}**: Parser function to use. [js-yaml] is the default.
      
* `returns` **{Object}**: Valid JSON  

```js
matter('---\ntitle: foo\n---\nbar');
//=> {data: {title: 'foo'}, content: 'bar', orig: '---\ntitle: foo\n---\nbar'}
```

### [.read](index.js#L122)

Read a file and parse front matter. Returns the same object as `matter()`.

* `fp` **{String}**: file path of the file to read.    
* `options` **{Object}**: Options to pass to gray-matter.    
* `returns`: {Object}  

```js
matter.read('home.md');
```

### [.stringify](index.js#L153)

Stringify an object to front-matter-formatted YAML, and concatenate it to the given string.

* `str` **{String}**: The content string to append to stringified front-matter.    
* `data` **{Object}**: Front matter to stringify.    
* `options` **{Object}**: Options to pass to js-yaml    
* `returns`: {String}  

```js
matter.stringify('foo bar baz', {title: 'Home'});
```

Results in:

```yaml
---
title: Home
---
foo bar baz
```



## Options

> All methods accept an options object passed as the last argument

## options.eval
Type: `Boolean`

Default: `false`

Evaluate coffee-script, CSON or JavaScript in front-matter. If you aren't aware of the dangers, google is your friend.


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
Type: `Object`

Default: `{delims: ['---', '---']}`

Open and close delimiters can be passed in as an array of strings. 

**Example:**

```js
matter.read('file.md', {delims: ['~~~', '~~~']});
```
would parse:

```html
~~~
title: Home
~~~
This is the {{title}} page.
```


## Example

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


## Run tests

```bash
npm test
```


## Authors

**Jon Schlinkert**
 
+ [github/assemble](https://github.com/assemble)
+ [twitter/assemble](http://twitter.com/assemble) 

## License
Copyright (c) 2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb](https://github.com/assemble/verb) on January 15, 2015._


[js-yaml]: https://github.com/nodeca/js-yaml
[coffee-script]: https://github.com/jashkenas/coffeescript
[toml-node]: https://github.com/BinaryMuse/toml-node
