
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

## .read

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

## .exists

Returns `true` or `false` if front matter exists:

```js
matter.exists(str);
```

## .extend

Extend and stringify **YAML** front matter. Takes an object as the second parameter, and returns either the extended, stringified object (YAML), or if no front matter is found an empty string is returned.

```js
matter.extend(str, obj);
```

## .reconstruct

A convenience wrapper around the `matter` and `matter.extend`. Extends YAML front matter, then re-assembles front matter with the content of the file.

```js
matter.reconstruct(str, obj);
```

## .toJSON

A convenience wrapper around the `matter(str).data` method.

```js
matter.toJSON(str);
```


## .toYAML

Stringify parsed front matter back to YAML.

```js
matter.toYAML(str);
```
