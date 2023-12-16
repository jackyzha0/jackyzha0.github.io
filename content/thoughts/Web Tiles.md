---
title: Web Tiles
date: 2023-12-16
tags:
  - seed
---
[Source](https://berjon.com/web-tiles/)

![[thoughts/CORS#Abolish the same-origin policy|CORS]]

Web Tiles asks the question about how we might enable composable software on the web, focussing on applications rather than documents.

## Why permissions don't work

> "Asking people to approve access that they _know_ they don't fully understand and that they couldn't monitor even if they did understand it does not empower them. On the contrary, it trains them to be despondent, helpless at the hands of the High Priesthood of Computer Whisperers. And our job as technologists building a better world is to eradicate the High Priesthood."

See: [[thoughts/access control|access control]]
## Wishes and intents
A wish is a verb applied to a type of thing. A tile's metadata describes which wishes it can grant. This is similar to the existing technology matching this approach: [Web Intents](https://www.w3.org/TR/web-intents/). Web Intents were developed (and abandoned) by the W3C's Device APIs Working Group

Whereas hyperlinks are nouns — they _name_ things — wishes are verbs.

```json
wishes: [
  // this can pick images and return them
  {
    "can": "pick",
    "what": ["image/*"],
    "name": "Select an image from our cat memes collection"
  },
  // this can create a social post which the user can post
  {
    "can": "post",
    "what": "com.atproto.repo.create",
    "name": "Post a cat meme"
  }
]
```