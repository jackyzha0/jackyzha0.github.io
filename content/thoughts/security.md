---
title: "Security"
date: 2021-10-14
tags:
  - seed
  - CPSC317
---

[Source: Playdough Protocols in _Kernel_](https://kernel.community/en/learn/module-1/playdough-protocols)

Integrity of information is critical to relationships of [trust](thoughts/trust.md) as we saw in the episode on [game theory](thoughts/game%20theory.md).

## Internet

On security in [[thoughts/internet computing|the internet]]

Main excuse: "when $x$ was designed, there were only a few players and they all know and trusted each other"

> "Secure" web servers are the equivalent of heavy armoured cars. The problem is, they are being used to transfer rolls of coins and checks written in crayon by people on park benches to merchants doing business in cardboard boxes from beneath highway bridges. Further, the roads are subject to random detours, anyone with a screwdriver can control the traffic lights, and there are no police. -- Garfinkel, Spafford, "Web Security and Commerce"

A lot of the internet is based on good faith and relying on users to be good actors

What level of the [[thoughts/internet computing|internet computing stack]] should be responsible for security? Options:

- New network-layer protocol
- New transport-layer protocol
- New 'pseudo-layer' between transport and application ([[thoughts/TLS|TLS]], TLS)
- Responsibility of the application (SSH)

### Terminology

- confidentiality: only the sender and the intended receiver should "understand" message contents
- authentication: the sender and receiver want to confirm each other's identity
- message integrity: the sender and receiver want to ensure that the message is not altered without detection
- access and availability: services must be accessible and available to users
- Actors: can be people or entities
  - Alice, Bob: want to communicate securely
  - Trudy: intruder, may
    - eavesdrop: intercept messages
    - delete/add messages
    - impersonation: can fake source
    - hijacking: 'take over' ongoing connection
    - denial of service: prevent service from being used by others
- Given that Trudy can see all the data, how do we provide confidentiality? [[thoughts/encryption|Encryption]]!

## Block Ciphers

- Message is broken into blocks (e.g. 64-bits of data)
- Each block is encrypted/decrypted separately
- $2^{64}$ combinations for a 64-bit block!
- Cipher-block chaining
  - Do an additional operation with the plaintext
  - E.g.
    - XOR first block with arbitrary (randomly chosen) number known by both parties
    - Following blocks are XOR'ed with previous block
- DES
  - 56-bit symmetric key, 64-bit plaintext input
  - No longer considered secure, 56-bit key can be brute forced in <1 day
  - 3DES is more secure, do it 3 times with 3 different keys
- AES
  - Also symmetric, replaced DES as NIST standard in 2001
  - 128-bit block cipher
  - 128-, 192-, or 256-bit key
  - Way more secure than DES
    - Brute force decryption that takes 1 second for DES would take 149 trillion years for 128-bit AES

## Certification Authorities (CA)

- Authority of who own's what public keys
- When Bob wants Alice's public key
  - Alice provides a certificate
  - Certificate is signed by CA
  - Bob applies CA's public key to confirm certificate's authenticity
  - Certificate contains Alice's public key

## Preventing Replay Attacks

- Nonce - value that will only ever be used once (usually derived from clock time)
- A sort of challenge, Alice wants Bob to prove they have received the nonce by sending them back that same nonce
- Ensures this is a new conversation between Alice and Bob

See also: [[thoughts/hash function|hash functions]]
