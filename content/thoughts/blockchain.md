---
title: "Blockchain"
date: 2021-10-08
---

[Source](https://docs.google.com/presentation/d/1aIjYKKM64Eyp497-j6wkDjCsHBA3CbbWg25UQ9Why3g/mobilepresent?slide=id.gefbf959b67_0_58)

An immutable, digital, distributed ledger that connects a decentralized network.

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