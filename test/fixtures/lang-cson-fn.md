---
title: 'CSON functions'
user: 'jonschlinkert'
fn:
  reverse = (src) ->
    src.split('').reverse().join('')
---
{%= description %}
{%= reverse(user) %}