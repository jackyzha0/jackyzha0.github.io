---
title: "Encryption"
date: 2022-04-07
tags:
- seed
---

An encryption algorithm comprises
- a method for encrypting data
- a method for decrypting data
- a secret key used in the decryption/encryption method

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