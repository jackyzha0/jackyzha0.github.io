---
title: "Bitcoin"
date: 2021-10-09
tags:
  - seed
---

[Peer to peer](thoughts/peer-to-peer.md) electronic cash built using [blockchain](thoughts/blockchain.md). Capital 'B' Bitcoin is the network and [protocol](thoughts/Protocol.md), lower case 'b' bitcoin is the actual currency.

Here, centralized intermediaries (banks) are replaced by a trustless network of 'miners' which use [proof of work](thoughts/proof%20of%20work.md) for [[thoughts/consensus]].

## Mining

Competing to solve a cryptographic puzzle to earn rights to add a new block to the blockchain. Reward is new bitcoin.

Hashing then, is the process of guessing a 'nonce' (pseudo-random number which is used to initialize communication) that when entered with the previous block information into SHA-256, generates an output deemed satisfactory by the Bitcoin protocol. If the nonce found can be verified by the other miners, then can add the new block to the network and earn bitcoin.

To prevent transaction data from being altered, Bitcoin employs an algorithm in which tampering of transaction details will result in large difficulty increases in the puzzle. As a result, it would be extremely difficult to achieve consensus around tampered data.
