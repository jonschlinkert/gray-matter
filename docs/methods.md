## matter

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

## matter.read

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

## matter.exists

Returns `true` or `false` if front matter exists:

```js
matter.exists(str);
```

## matter.extend

Extend and stringify **YAML** front matter. Takes an object as the second parameter, and returns either the extended, stringified object (YAML), or if no front matter is found an empty string is returned.

```js
matter.extend(str, obj);
```

## matter.recontruct

A convenience wrapper around the `matter` and `matter.extend`. Extends YAML front matter, then re-assembles front matter with the content of the file.

```js
matter.recontruct(str, obj);
```

## matter.stringify

A convenience wrapper around the `matter(str).data` method.

```js
matter.stringify(str);
```


## matter.stringifyYAML

Stringify parsed front matter back to YAML.

```js
matter.stringifyYAML(str);
```