---
title: "Ethereum"
date: 2021-10-09
tags:
  - seed
---

[Blockchain](thoughts/blockchain.md) with a built-in Turing-complete programming language to allow individuals to write smart contracts and decentralized applications (dApps) which dictate their own rules around ownership, transaction formats, and state transition functions.

Ether (ETH) is the actual currency. All transactions (sending ETH, using a dApp, executing a smart contract) cost a gas fee to disincentivize bad actors from spamming.

Used to use [proof of work](thoughts/proof%20of%20work.md) but switched to [proof of stake](thoughts/proof%20of%20stake.md).

## Understanding

- Has a built-in Turing-complete scripting language built on top of the Ethereum VM that perform transactions and send them to the [blockchain](thoughts/blockchain.md)
  - VM details
    - Stack: up to 1024 32-byte fields
    - Memory: infinite in size but more size means more gas
    - Storage: permanent for contracts (verifiable using a Merkle trie)
    - Environment variables: VM can access block number, time, mining difficulty, previous block hash etc.
    - Logs: append-only storage in a specific block (not state)
    - Sub-calling: VM can call other contracts
  - To prevent halting problem from taking up all computational resources, we implement a "gas fee" to charge every computational step
  - The more bytes the `data` field in each transaction is, the more expensive it becomes
- State is the database (key value mapping addresses to account objects)
- Contracts are programs that run on top of the database

This feels like time-share all the way back in the day but decentralized and now on the global scale. Crazy

## dApps

Combine smart contracts (the backend) with a frontend user interface. Typically,

- open-source
- public data + records
- uses a cryptographic token to keep the network secure
