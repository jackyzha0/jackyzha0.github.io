---
title: "Braid HTTP"
date: 2022-08-11
tags:
  - seed
---

Braid's goal is to extend [[thoughts/HTTP|HTTP]] from a state transfer protocol to a state sync protocol, in order to do away with custom sync protocols and make state across the web more [[thoughts/interoperability|interoperable]].

Braid puts the power of operational transforms and [[thoughts/CRDT|CRDTs]] on the web, improving network performance and enabling natively [[thoughts/peer-to-peer|p2p]], collaboratively-editable, [[thoughts/local-first software|local-first]] web applications.

It turns out that HTTP is very close to being a HTSP, we just need to add 5 headers to requests and responses as well as a new status code `209 Subscription`.

From the [IETF Internet Draft](https://raw.githubusercontent.com/braid-work/braid-spec/master/draft-toomim-httpbis-braid-http-03.txt)
