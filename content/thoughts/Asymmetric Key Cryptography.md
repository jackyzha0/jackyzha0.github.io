---
title: "Public-key Cryptography"
date: 2022-04-07
tags:
  - seed
  - CPSC317
aliases:
  - public key cryptography
  - public-key cryptography
  - asymmetric cryptography
---

Asymmetric cryptography involves a pair of keys, one for encrypting (public) another for decrypting (private). One is private ($K^-$), the other is public ($K^+$). The key property is that one key cannot be obtained from the other in reasonable computation time

Common forms of Asymmetric Cryptography are [[thoughts/RSA|RSA]] and [[thoughts/Elliptic-curve Cryptography (ECC)|ECC]]

## Two use cases

1. Sender encrypts with public key
   - Only private key can decrypt it
   - Used for confidentiality
2. Owner encrypts with private key
   - Anyone can decrypt as public key is public
   - Used for authentication/proof of ownership
