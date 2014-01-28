---
# =============================================
# BUILD CONFIG
# =============================================

root:             _gh_pages
dest:             <%= site.root %>
assets:           <%= site.dest %>/assets
date:             <%= new Date() %>


# Data
data:             data

# Templates
templates:        templates
pages:            <%= site.templates %>
includes:         <%= site.templates %>/includes
layouts:          <%= site.templates %>/layouts
layoutext:        .hbs
layout:           default

# Styles
styles:           styles
components:       <%= site.styles %>/components


# =============================================
# EXTENSIONS
# =============================================

helpers:          <%= site.templates %>/helpers
plugins:
  # - assemble-contrib-permalinks
  # - assemble-contrib-anchors
  # - assemble-contrib-toc


# =============================================
# PROJECT METADATA
# =============================================

brand:            ASSEMBLE
title:            BOILERPLATE
lead:             The most awe inspiring static site boilerplate in Northern Kentucky.

# GitHub
version:          <%= pkg.version %>
author:           <%= pkg.author.name %>
name:             <%= pkg.name %>
description:      <%= pkg.description %>

# URLs
url:

  # Repo
  homepage:       <%= pkg.homepage %>
  repo:           <%= pkg.homepage %>
  issues:         <%= pkg.bugs.url %>?state=open
  ghpages:        https://<%= site.username %>.github.io/<%= pkg.name %>/

  # Site
  domain:         http://assemble.io/
  about:          <%= site.url.domain %>/about/
  blog:           <%= site.url.domain %>/blog/

# Download Links
download:
  source:         <%= pkg.homepage %>/archive/master.zip
  latest:         <%= pkg.homepage %>/master/dist/<%= pkg.name %>-<%= pkg.version %>.min.js


# =============================================
# SEO / SEM
# =============================================

analytics:
  alexa:           lpTeh1awA400OE
  google:
    id:             UA-XXXXXXXX-YY
    domain:         assemble.github.io
    siteid:         false
    tags:           FOO-012345 # Google Tags (see: https://www.google.com/tagmanager/)


# =============================================
# SOCIAL / SHARING
# =============================================

# Comments
disqus:
  enabled:        false
  shortname:      <%= pkg.name %>

# Social
social:
  twitter:
    via:          jonschlinkert
    username:     jonschlinkert
    related:      jonschlinkert:Assemble core team.
  facebook:       false
  linkedin:       false
  gplus:          false
  hn:             false
  google:         false

# Sharing
sharing:
  twitter:        false
  facebook:       false
  gplus:          false
  hn:             false
  google:         false
---

<span class="alert alert-info">This is an alert</span>

## YAML Front Matter
Add YAML front matter to documents to extend the metadata that is supplied to your project's templates.

```yaml
---
username: jonschlinkert
---
```
This is probably most useful when:
1. You need to use the same or similar templates on a number of different projects
1. You want to supply data to the templates that won't typically be found in package.json


## Code Comments
Code comments may be used in markdown templates, and they will be stripped from the rendered README as long as they adhere to the following syntax:

```handlebars
[[!-- foo --]]
[[! foo ]]
[[!foo]]
```

## Escaping

### Escaping hashes
This task automatically adjusts heading levels in included templates. For example, `#` is adjusted to `##`, so that heading levels "line up" properly after the README is built.

This can cause problems if you're using hashes for a reason other than headings, such as CSS Id's in code comments. So to prevent grunt-readme from converting `#id {}` to `##id {}`, just add a  single backtick before the hash: <code>`#id {}</code>.

### Escaping Lo-Dash templates
To prevent Lo-Dash from attempting to evaluat templates that shouldn't be (_as with code examples_), just use square brackets instead of curly braces in any templates that have similar patterns to these: `[%= .. %]`, `[%- .. %]`, and `[% .. %]`. The square brackets will be replaced with curly braces in the rendered output.


~~~
foo: bar
version: 2
~~~

<span class="alert alert-info">This is an alert</span>

# yfm [![NPM version](https://badge.fury.io/js/yfm.png)](http://badge.fury.io/js/yfm)

> A simple to use YAML Front-Matter parsing and extraction Library.

**Why another YAML Front Matter library?**

Because other libraries we tried failed to meet our requirements with [Assemble](http://assemble.io). Some most of the libraries met most of the requirements, but _none had all of them_. Here are the most important:

* Be usable, if not simple
* Allow custom delimiters
* Use a dependable and well-supported library for parsing YAML
* Don't fail if YAML front matter exists, but no content
* Don't fail if content exists, but no YAML front matter
* Have no problem reading YAML files directly
* Should return an object that contains the parsed YAML front matter and content, as well as the "original" content.

```bash
npm i yfm --save
```
## Usage

```js
var yfm = require('yfm');
yfm('yfm.html');
```
## Options
You may pass an options object as a second parameter.

#### custom delimiters
Type: `object`

Default: `{close: '---', open: '---'}`

Open and close delimiters can be a string or an array of strings. If an array of strings is passed for a delimiter then all patterns supplied will be used to check for YAML front matter.

Example:

```js
{
  close: ['---', '~~~'],
  open: ['...', '---']
}
```

Checks for all patterns using these delimiters.

_Passing multiple delimiters will likely provide unpredictable results, but the option is included for testing purposes._

#### read
Type: `boolean`

Default: `true`

Specify whether or not to read a file from the file system. When set to `false` a raw string may be passed to the function. Example:

```js
yfm('---\nTitle: YFM\n---\nContent.', {read: false})
```


## Examples
#### Extract front matter

Let's say our page, `foo.html` contains

```html
---
title: YAML Front matter
---
<h1>{{title}}</h1>
```

then running the following in the command line:

```js
console.log(yfm('foo.html'));
```
returns

```json
{
  "context": {
    "title": "YAML Front matter"
  },
  "content": "<h1>{{title}}</h1>",
  "original": "---\ntitle: YAML Front matter\n---\n<h1>{{title}}</h1>"
}
```
and

```js
console.log(yfm('foo.html').context);
```
returns


```json
{"title": "YAML Front matter"}
```

#### Check for YAML front matter

```js
var hasYFM = function (src, options) {
  var obj = yfm(src, options).context;
  return _.keys(obj).length > 0;
};
```


## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

**Brian Woodward**

+ [github/doowb](https://github.com/doowb)
+ [twitter/doowb](http://twitter.com/jonschlinkert)


## License
Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
Released under the MIT license

***

_This file was generated by [grunt-readme](https://github.com/assemble/grunt-readme) on Monday, January 27, 2014._

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
