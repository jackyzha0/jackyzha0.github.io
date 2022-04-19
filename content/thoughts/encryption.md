---
title: "Encryption"
date: 2022-04-07
tags:
- seed
- CPSC317
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


## Key Sharing Problem
- Alice locks the box with her lock and sends it to Bob
- Bob locks the box with his lock and sends it back to Alice
- Alice removes her lock and sends it back to Bob
- Bob removes his lock
- Double Encryption Transfer
	- Both parties generate random keys $K_A$ and $K_B$
	- Sender sends encrypted message $K_A(m)$
	- Receiver encrypts received message and sends it back $K_B(K_A(m))$
	- Sender decrypts message and sends it again $K^-_{A}(K_B(K_A(m))) = K_B(K^+_{A}(K_A(m))) = K_B(m)$ (only valid if operation is associative!)
	- Receiver decrypts final message $K^-_{B}(K_B(m)) = m$

## Asymmetric Cryptography
- Pair of keys, one for encrypting (public) another for decrypting (private). One is private ($K^-$), the other is public ($K^+$)
	- Key property, one key cannot be obtained from the other in reasonable computation time
- Two use cases
	- Sender encrypts with public key
		- Only private key can decrypt it
		- Used for confidentiality
	- Owner encrypts with private key
		- Anyone can decrypt as public key is public
		- Used for authentication/proof of ownership
- Can theoretically encrypt using private key but anyone with public key can decrypt!
- RSA (Rivest, Shamir, Adelson) Algorithm
	- Relies on modular arithmetic
		- Unfortunately, also really slow :((
		- Encryption/decryption are computation-heavy. Ok for occasional communication but too slow for extensive data transfer
		- Good for establishing initial secure connection
	- Hard to crack because to determine $d$ from $(n, e)$ requires computing factors of $n$ which is a hard problem
	- Choose two large primes $p$ and $q$ (1024-bits each)
	- Compute $n = pq, z = (p-1)(q-1)$
	- Choose $e < n$ that has no common factors with $z$ (commonly 3)
	- Choose $d < n$ such that $ed \mod z = 1$
	- Public key: $K^+_B=(n,e)$
	- Private key: $K^-_B = (n,d)$
	- Encrypting is then $encrypt(m) = m^e \mod n$
	- Decrypting is then $decrypt(c) = c^d\mod n$
- Key exchange using RSA
	- If Alice and Bob both know the other's public key, how can they agree on a shared "session" key?
	- Alice chooses key $K_S$ and encrypts it with Bob's public key and Alice's private key $K_A^-(K_B^+(K_S))$
	- Bob decrypt's the message using his private key and Alice's public key $K_B^-(K_A^+(K_A^-(K_B^+(K_S)))) = K_S$