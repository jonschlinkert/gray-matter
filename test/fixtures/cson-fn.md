---cson
user = 'jonschlinkert'
reverse = (src) ->
  src.split('').reverse().join('')
---
{%= description %}
{%= reverse(user) %}