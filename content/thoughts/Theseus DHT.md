---
title: "Theseus DHT"
date: 2023-06-27
tags:
  - seed
---

Anyone can store data in the DHT and receive an estimate of how long that data will be stored. Once stored, data is very hard to remove or modify. Small data is stored longer; this makes the DHT well-suited for exchanging things like lists of peers, signed cryptographic hashes, compressed text, and so on.

Routing is based on [[thoughts/Kademlia DHT|Kademlia DHT]] but with better security properties. It runs over [[thoughts/TCP|TCP]]

## Security

- All protocol traffic is indistinguishable from random noise. Length-prefixing schemes are used on both protocol ciphertexts and plaintexts, and messages may be padded to any degree. This allows arbitrary message chunking, which is essential for traffic obfuscation. All this is meant to make the protocol very hard to fingerprint
