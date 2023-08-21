---
title: "MAC"
date: 2022-08-08
tags:
  - seed
---

> Message authentication code

Not to be confused with MAC addresses.

- Add a secret to the end of each message that is also hashed. It is extremely unlikely that anyone who doesn't know the secret to come up with an appropriate hash
- Shared secret $s$ (this is a symmetric key)
- Hash is computed not on message $m$, but on $m+s$
  - Bob sends message $h = H(m + s)$
  - Alice receives $(m, h)$ and computes $H(m + s)$
  - If $h = H(m+s)$, message is considered signed
- Fast because [[thoughts/Asymmetric Key Cryptography|asymmetric key crypto]] is not necessary
