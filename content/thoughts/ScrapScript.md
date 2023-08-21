---
title: "ScrapScript"
date: 2023-04-30
tags:
  - seed
---

[Source](https://scrapscript.org/)

To make software safe and sharable, scrapscript combines existing wisdom in new ways:

- all expressions are content-addressible “scraps”
- all programs are data
- all programs are “platformed”

## Content-Addressible Everything

(see: [[thoughts/content addressed storage]])

Any chunk of the language can be replaced with a hash. Scraps are stored/cached/named/indexed in global distributed “scrapyards”. This is like an `npm` but at the expression level

Expression level-versioning, every expression in the ecosystem can be independently spliced and “time-travelled”.

```scheme
(spaceq/is-planet@2005 "pluto") ; true
(spaceq/is-planet@2006 "pluto") ; false
```

Magic compression: Instead of sharing large dumps of data, you can send references to any data anywhere. By sending references, other machines can opt to pull the data from cache or high-speed CDNs (see: [[thoughts/CID]])

## First-class Network Requests

Scrapyards enable new compile-time primitives for verifying type-safety across network boundaries. “Contracts” are automatically inferred and enforced between clients, servers, and external APIs. (similar to [Racket Contracts](https://docs.racket-lang.org/reference/contracts.html))

```bash
$ echo "@rebbit/users 42" | scrap eval
error: @rebbit/users expects type rebbit/users-request
```

## Publish

Scrapyards store scraps in an [[thoughts/IPFS]]-like system with name and versioning information.

```bash
## publish a scrap
@yard/publish my-key "greet" "| _ -> \"hello\""
# task:success ()

## execute a scrap
connie2036/greet "hi"
# "hello"

## get the code of a scrap
@yard/get "connie2036/greet"
# task:success "greet" "| _ -> \"hello\""
```
