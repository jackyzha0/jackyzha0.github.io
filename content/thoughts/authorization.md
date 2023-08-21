---
title: "Authorization"
date: 2022-05-25
tags:
  - seed
---

Authorization is the process of verifying what a user has access to (whereas authentication is the process of verifying who someone is)

## JWT

> Each JWT contains encoded JSON objects, including a set of claims. JWTs are [[thoughts/digital signatures|signed]] using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.

Three components (looks something like this: `xxxxx.yyyyy.zzzzz`)

1. Header: contains the type of token and signing algorithm
2. Payload: contains the claims
3. [[thoughts/digital signatures|Signature]]: ensures the token hasn't been altered

The party that creates the JWT signs the header and payload with

- a secret that is known to both the issuer and receiver, or
- a private key known only to the sender

When the token is used, the receiving party verifies that the header and payload match the signature.

See also: [[thoughts/UCAN|UCAN]], [[thoughts/access control]]
