
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
console.log(yfm('foo.html'));
```
returns

```json
{
  "context": {
    "title": "YAML Front matter",
    "description": "This is a page"
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
{"title": "YAML Front matter", "description": "This is a page"}
```