---
title: "Proof of Work"
date: 2021-08-09T21:17:29-04:00
tags:
  - seed
---

Miners solve cryptographic problems in order to earn the right to add a new block to the chain where the fastest miner gets the rights to add along with token rewards.

## Basis

Cryptocurrencies use a distributed ledger (blockchain) to track all transactions in a publicly agreed upon manner.

All transactions are hashed. Hashing in general is a trivial function. To make it 'work', the network sets a difficulty for how much work can be expected to "mine" a new block. Mining is essentially just working to find a valid hash for a batch of transactions. A 'block' is a set of transactions.

Because the 'winner' is randomly-chosen proportional to the work done, it incentivizes everybody on the network to act honestly and record only true transactions.

> Proof of work makes it extremely difficult to alter any aspect of the blockchain, since such an alteration would require re-mining all subsequent blocks.

## Finality

[Source: Ethereum Wiki](https://ethereum.org/en/developers/docs/consensus-mechanisms/pow/)

> A transaction has "finality" on Ethereum when it's part of a block that can't change.

Finality in proof of work is probabilistic, meaning you cannot be 100% certain a transaction in a block is legitimate, only _statistically certain_. Finality, in this probabilistic sense, refers to the time you should wait before considering a transaction irreversible

## Disadvantagaes

- Operates on the logic of massive power (hashing power) incentivized into existence by massive rewards (block rewards). Only defense attacks is just scale of the network (attackers of size less than $x$ are discouraged from appearing by having the network constantly spend $x$ every day)
- [Extremely electricity intensive](https://digiconomist.net/bitcoin-energy-consumption)
