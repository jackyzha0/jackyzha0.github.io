---
title: "RSA"
date: 2022-08-08
tags:
  - seed
---

A form of [[thoughts/Asymmetric Key Cryptography|asymmetric cryptography]].

Full name is the Rivest, Shamir, Adelson Algorithm

It relies on modular arithmetic which, unfortunately, is really slow :((. Encryption/decryption are computation-heavy. Ok for occasional communication but too slow for extensive data transfer. It's good for establishing initial secure connection. Hard to crack because to determine $d$ from $(n, e)$ requires computing factors of $n$ which is a hard problem

Steps:

- Choose two large primes $p$ and $q$ (1024-bits each)
- Compute $n = pq, z = (p-1)(q-1)$
- Choose $e < n$ that has no common factors with $z$ (commonly 3)
- Choose $d < n$ such that $ed \mod z = 1$
- Public key: $K^+_B=(n,e)$
- Private key: $K^-_B = (n,d)$
- Encrypting is then $encrypt(m) = m^e \mod n$
- Decrypting is then $decrypt(c) = c^d\mod n$

[[thoughts/Key Sharing Problem|Key exchange]] can also be performed using RSA

- If Alice and Bob both know the other's public key, how can they agree on a shared "session" key?
- Alice chooses key $K_S$ and encrypts it with Bob's public key and Alice's private key $K_A^-(K_B^+(K_S))$
- Bob decrypt's the message using his private key and Alice's public key $K_B^-(K_A^+(K_A^-(K_B^+(K_S)))) = K_S$

See also: [[thoughts/Elliptic-curve Cryptography (ECC)|elliptic curve cryptography]]
