---
title: "Encryption"
date: 2022-08-08
tags:
  - seed
---

> A process of converting the original representation of the information (plaintext) into an alternative form (ciphertext). Ideally, only authorized parties can decipher a ciphertext back to plaintext and access the original information.

An encryption algorithm comprises

- a method for encrypting data
- a method for decrypting data
- a secret key used in the decryption/encryption method

The two types of encryption are

1. [[thoughts/Asymmetric Key Cryptography|Asymmetric Key Cryptography]] (sometimes called public-key cryptography)
2. [[thoughts/Symmetric Key Cryptography|Symmetric Key Cryptography]]

Trapdoor: a mathematical function that is easy to go one way but hard to go the other way (an effectively one-way function)

- Common functions include [[thoughts/RSA|RSA]] (prime factorization) and [[thoughts/Elliptic-curve Cryptography (ECC)|ECC]]
- [[thoughts/RSA|RSA]] for example, is a trapdoor because multiplying primes is easy but factoring the result back into its component primes is hard.
- The bigger the spread between the difficulty of going one direction in a Trapdoor Function and going the other, the more secure a cryptographic system based on it will be

Language

- $A$: Alice
- $B$: Bob
- $K_A$: Alice's encryption key
- $K_B$: Bob's decryption key
- $m$: plaintext message
- $K_A(m)$: ciphertext, encrypted with key $K_A$
- $K_B(K_A(m)) = m$

Types of attacks

1. Ciphertext-only attack: knowns $K_A(m)$ but not $m$
2. Known-plaintext attack: for some $m$ knows $K_A(m)$
3. Chosen-plaintext attack: knows $K_A$ but not $K_B$
