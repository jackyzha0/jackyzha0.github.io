---
title: "Cryptography"
date: 2022-08-08
tags:
  - seed
---

> Cryptography is the practice and study of techniques for secure communication in the presence of adversarial behaviour.

The following is a list of primitives one may want to accomplish using cryptography

### Data Representation

Storing plain versions of some data is often risky (e.g. passwords.) Can we create one-way functions that transform potentially large amounts of data or sensitive data into a unique[^1] value that can be used for comparison or addressing.

[^1]: Up to the limits of probability (e.g. more unlikely than picking the same grain at random as someone else on the beach)

The main primitive for this are [[thoughts/hash function|hash functions]] which can enable [[thoughts/content addressed storage|content-addressed storage]] (e.g. [[thoughts/CID|CID]]s)

### Secure Communication

[[thoughts/encryption|Encryption]] can be used to make sure that only intended recipients can receive the message or data you want.

Mostly accomplished using

1. [[thoughts/Symmetric Key Cryptography|Symmetric Key Cryptography]] (e.g. [[thoughts/RSA|RSA]] or [[thoughts/Elliptic-curve Cryptography (ECC)|ECC]])
2. [[thoughts/Asymmetric Key Cryptography|Asymmetric Key Cryptography]]

### Message integrity and Authentication

1. Integrity: can the recipient be confident that the message has not been accidentally modified?
2. Authentication: can the recipient be confident that the message originates from the sender?
3. Non-repudiation: can the message's authenticity be unchallengeable? (i.e. if I send a message, I can't later maintain I did not)

There are multiple ways of accomplishing this:

1. [[thoughts/hash function|Hash functions]]
2. [[thoughts/MAC|MACs]]
3. [[thoughts/digital signatures|Digital Signatures]]

### Guarantees

|                 | Hash | MAC       | Digital Signature |
| --------------- | ---- | --------- | ----------------- |
| Integrity       | Yes  | Yes       | Yes               |
| Authentication  | No   | Yes       | Yes               |
| Non-repudiation | No   | No        | Yes               |
| Kind of keys    | None | Symmetric | Asymmetric        |

### Efficiency

MACs can be computed three orders of magnitude faster than digital signatures. For example, a 200MHz Pentium Pro takes 43ms to generate a 1024-bit modulus [[thoughts/RSA|RSA]] signature of an MD5 digest and 0.6ms to verify the signature, whereas it takes only 10.3$\mu s$ to compute the MAC of a 64-byte message on the same hardware in our implementation. There are other publickey cryptosystems that generate signatures faster, e.g.,
[[thoughts/Elliptic-curve Cryptography (ECC)|elliptic curve]] public-key cryptosystems, but signature verification is slower.
