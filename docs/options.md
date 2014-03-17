> All methods will accept an options object to be passed as a second parameter

## lang
Type: `String`

Default: `yaml`

The parser to use on the extracted front matter. Valid options include:
* `yaml`
* `json`
* `coffee` requires the [`coffee-script`](https://www.npmjs.org/package/coffee-script) package
* `toml` requires the [`toml`](https://www.npmjs.org/package/toml) package

## delims
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

## autodetect
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