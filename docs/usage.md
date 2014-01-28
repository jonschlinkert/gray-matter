
```js
var yfm = require('yfm');
yfm(String, Object);
```

# Methods

## yfm

By default the `yfm()` method expects a string. So this:

```js
yfm('---\nTitle: This is YFM\n---\n<p>This is content.<p>');
```

results in:

```json
{
  "context": {
    "title": "This is YFM"
  },
  "content": "<p>This is content.<p>",
  "original": "---\nTitle: This is YFM\n---\n<p>This is content.<p>"
}
```

## yfm.read

To read a file from the file system before parsing, use `yfm.read`:

```js
yfm.read('file.md');
```

## yfm.exists

To check for YAML front matter, returning `true` or `false` if it exists, use `yfm.exists`:

```js
yfm.exists('file.md');
```