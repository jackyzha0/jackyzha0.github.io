---
title: "Degraded Blockchain problem"
date: 2021-12-25
tags:
  - sapling
---

One thing that I still don't understand about blockchain is the 'trustless' aspect of blockchains. Blockchains are not 'trustless', rather it shifts the [trust](thoughts/trust.md) balance away from trusting people and corporations to trusting an algorithm.[^1]

![The link between the actual data on-chain and the actual thing that depends on the data to function are only *weakly* linked](/thoughts/images/degraded-blockchain.png)[_Source_](https://www.fortressofdoors.com/the-degraded-blockchain-problem/)

The blockchain really only stores a _pointer_ to a good 99% of content that supposedly lives 'on-chain', most of it is never 100% on chain. (This is also why people meme on NFT owners which just link to a PNG, it's literally just a weak pointer. If the image hosting service goes down, that pointer is useless as it is immutable). The problem with this model is that if most of the value comes from the 'off-chain' _content_, then what use is this proof of ownership if I can't do anything with it?

The only thing that actually connects the blockchain with the 'off-chain' value is... you guessed it... trust.

[^1]: Also, how do we go about trusting the algorithm that is 'cryptographically secure' when a good 99.5% of the users don't actually understand how blockchain and [[thoughts/cryptography|cryptography]] works?
