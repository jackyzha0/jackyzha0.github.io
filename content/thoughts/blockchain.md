---
title: "Blockchain"
date: 2021-10-08
---

[Source](https://docs.google.com/presentation/d/1aIjYKKM64Eyp497-j6wkDjCsHBA3CbbWg25UQ9Why3g/mobilepresent?slide=id.gefbf959b67_0_58)

An immutable, digital, distributed ledger that connects a decentralized network. Can be used to build cryptocurrencies like [Bitcoin](thoughts/bitcoin.md) and [Ethereum](thoughts/ethereum.md).

Characteristics:
1. Distributed: data is stored by and updates are broadcasted to everyone
2. Smart Contracts: codified agreements. Once the predetermined conditions of the contract are met, the transaction and attached computation are completed and recorded on the blockchain.
3. Immutable: A completed transaction can never be changed or hidden. This gives us **provenance of assets** (you can determine any asset's entire history as long as all transactions happen on-chain)
4. [Decentralized](thoughts/decentralization.md): communal consensus rather than one party's decisions determines access/update to the chain

On a technical level, blockchain is just a distributed linked list.

Each block contains the hash of the previous block header and the [Merkle root](https://www.investopedia.com/terms/m/merkle-tree.asp) representing the hash of all the transactions in that block.

Transactions happen as follows:
1. A transaction is initiated
2. Data is packaged into a bolck
3. Block is sent to members of the chain
4. Consensus and approval by rest of network (either [proof-of-work](thoughts/proof-of-work.md) or [proof-of-stake](thoughts/proof-of-stake.md))
5. Block is added to chain
6. Chain update is distributed to members

## Data
[Source](https://kernel.community/en/learn/module-1/promise-blockchains)

"Back in early history, the databases were singular, existing in an atomic state with one DB per enterprise. The network existed in some relational sense between enterprises, but because DB's were so fragile they never spoke directly to the network because then they broke. Even if you did connect DBs somewhat directly, the DB encodes the worldview of the organization and different organizations have different worldviews, so the DBs can't speak to each other clearly."

**There were no large-scale computer-to-computer connections that allowed us to create a shared world view between lots of different organizations**.

> This is the promise of blockchains -- to create a global 'distributed database'

The goal is to build a single, shared story of reality, spread across all the machines simultaneously. And when it changes in one place, it changes everywhere.

### Act II -- Smart Contracts
"First we merged the network and the database in a blockchain. Then, we take computer software and put it into the shared database. That means everyone that is connected has a copy of exactly the same program: same data, same code, same result"

### Act III --- IOT
The 'scaled blockchain'

Ideally we get to a point where we have a 'global computing service' (very Asiimov's Last Question-esque) through which we can embed IOT devices. This would turn all the sensors and bits of computing power into a global unified knowledge resources that manages the infrastructure of our society

I'm curious how this relates to [truth](thoughts/truth.md), specifically how different people have different views on 'reality' and 'truth'. How do we reconcile that at a global scale?