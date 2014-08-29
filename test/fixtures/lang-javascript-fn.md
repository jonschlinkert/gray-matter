---
title: 'javascript front matter',
user: 'jonschlinkert',
fn: {
  reverse: function(str) {
    return str.split('').reverse().join('');
  }
}
---

{%= description %}
{%= reverse(user) %}


## Code fence

```js
var foo = 'bar';
```
