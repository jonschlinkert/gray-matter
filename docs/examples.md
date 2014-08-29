
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

## .extend

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
