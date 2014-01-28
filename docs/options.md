
> All methods will accept an options object to be passed as a second paramer

### delimiters
Type: `object`

Default: `{delims: ['---', '---']}`

Open and close delimiters can be passed in as an array of strings. Example:

```js
yfm.read('file.md', {delims: ['~~~', '~~~']});
```

You may also pass an array of arrays, allowing multiple alternate delimiters to be used. Example:


```js
{
  delims: [
    ['---', '~~~'], ['---', '~~~']
  ]
}
```

_However, passing multiple delimiters will yield unpredictable results, so it is recommended that you use this option only for testing purposes._