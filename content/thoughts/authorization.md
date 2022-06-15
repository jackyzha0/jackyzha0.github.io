---
title: "Authorization"
date: 2022-05-25
tags:
- seed
---

Authorization is the process of verifying what a user has access to (whereas authentication is the process of verifying who someone is)

## JWT
>  Each JWT contains encoded JSON objects, including a set of claims. JWTs are [[thoughts/signed messages|signed]] using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.
**
Three components (looks something like this: xxxxx.yyyyy.zzzzz.)
1. Header: contains the type of token and signing algorithm
2. Payload: contains the claims
3. Signature: ensures the token hasn't been altered

The party that creates the JWT signs the header and payload with
- a secret that is known to both the issuer and receiver, or
- a private key known only to the sender

When the token is used, the receiving party verifies that the header and payload match the signature.

## UCAN
> At a high level, User Controlled Authorization Networks (UCANs) are a way of doing authorization ("what you can do") where users are fully in control. There's no all-powerful authorization server, or server of any kind required. Everything that a users is allowed to do is captured directly in a key or token, and can be sent to anyone that knows how to interpret this format.

See [source 1](https://fission.codes/blog/auth-without-backend/) and [source 2](https://fission.codes/blog/verifying-ucans/)
