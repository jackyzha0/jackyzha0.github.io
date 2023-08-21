---
title: "Blockchain"
date: 2021-10-08
tags:
  - sapling
---

See also: [[thoughts/web3 critique]]

[Source: A Primer to Web3](https://docs.google.com/presentation/d/1aIjYKKM64Eyp497-j6wkDjCsHBA3CbbWg25UQ9Why3g/mobilepresent?slide=id.gefbf959b67_0_58)

On a technical level, blockchain is just a linked list or graph that is replicated. Can be used to build cryptocurrencies like [Bitcoin](thoughts/bitcoin.md), [[thoughts/Solana|Solana]], and [Ethereum](thoughts/ethereum.md).

A blockchain is a [[thoughts/State Machine Replication (SMR)|SMR]] protocol that has a 3-layer architecture.

1. Consensus core: forms agreement over an immutable sequence of updates to a shared state: [[thoughts/Byzantine Faults|byzantine fault-tolerant]]. The consensus algorithm most commonly used are [[thoughts/longest-chain consensus|longest-chain consensus algorithms]] and solve [[thoughts/Byzantine Faults|BFT]] for a _permissionless_ [[thoughts/system model|system model]]
2. State-machine API: [[thoughts/bitcoin|Bitcoin]]’s state-machine and state-updates use a limited scripting language; [[thoughts/ethereum|Ethereum]] expands the state-machine and state-updates with a Turing complete abstraction (whose resources are bounded using gas).
3. Application Layer: In Bitcoin the application is the shared provenance tracking of digital assets, and in Ethereum, could be anything decentralized.

Characteristics:

1. Distributed: data is stored by and updates are broadcasted to everyone
2. Smart Contracts: codified agreements. Once the predetermined conditions of the contract are met, the transaction and attached computation are completed and recorded on the blockchain.
3. Immutable: A completed transaction can never be changed or hidden. This gives us **provenance of assets** (you can determine any asset's entire history as long as all transactions happen on-chain)
4. [Decentralized](thoughts/decentralization.md): communal consensus rather than one party's decisions determines access/update to the chain

Each block contains the hash of the previous block header and the [Merkle root](https://www.investopedia.com/terms/m/merkle-tree.asp) representing the hash of all the transactions in that block.

Transactions happen as follows:

1. A transaction is initiated by a client
2. Transactions are checked for validity to see if the state transition is legal (validation)
3. Multiple transactions are packaged into a block and sent to members of the chain (block proposal)
4. Consensus and approval by rest of network (either [proof of work](thoughts/proof%20of%20work.md) or [proof of stake](thoughts/proof%20of%20stake.md))
5. Block is added to chain and distributed to members

## Why it Matters

It feels like the level of change which blockchain impacts is huge but at the same time latent. After going through a bunch of Kernel modules, Austin came upon a name for the concept: "blockchain changes what soil is"

"The "new world" seems to look very similar to the old. i.e. _isn't a DAO just voting on how to donate money, which we could do today?_"

In actuality, the _[[thoughts/pace layers|layer]]_ at which change is happening is much deeper (more [infrastructure](thoughts/infrastructure.md) level than solution/product level)

## Data

[Source: Ethereal Dreamers by _Kernel_](https://kernel.community/en/learn/module-1/promise-blockchains)

"Back in early history, the databases were singular, existing in an atomic state with one DB per enterprise. The network existed in some relational sense between enterprises, but because DB's were so fragile they never spoke directly to the network because then they broke. Even if you did connect DBs somewhat directly, the DB encodes the worldview of the organization and different organizations have different worldviews, so the DBs can't speak to each other clearly."

**There were no large-scale computer-to-computer connections that allowed us to create a shared world view between lots of different organizations**.

> This is the promise of blockchains -- to create a global 'distributed database'

The goal is to build a single, shared story of reality, spread across all the machines simultaneously. And when it changes in one place, it changes everywhere.

### Thoughts

Waiting for the day web3 projects get large enough to amortize and offset the gas fees that consumers pay now (much like centralized orgs nowadays front hosting costs for 'free' tier or the average consumer).

### Act II -- Smart Contracts

"First we merged the network and the database in a blockchain. Then, we take computer software and put it into the shared database. That means everyone that is connected has a copy of exactly the same program: same data, same code, same result"

### Act III --- IOT

The 'scaled blockchain'

Ideally we get to a point where we have a 'global computing service' (very Asiimov's Last Question-esque) through which we can embed IOT devices. This would turn all the sensors and bits of computing power into a global unified knowledge resources that manages the infrastructure of our society

I'm curious how this relates to [truth](thoughts/truth.md), specifically how different people have different views on 'reality' and 'truth'. How do we reconcile that at a global scale? What might [[thoughts/plurality|pluriversal]] computing look like?
