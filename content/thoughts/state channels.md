---
title: "State Channels"
date: 2022-05-28
tags:
  - seed
---

State channels are a very broad and simple way to think about [[thoughts/blockchain|blockchain]] interactions which could occur on the blockchain, but instead get conducted off of the blockchain, without significantly increasing the risk of any participant.

Similar to the concept of payment channels in [[thoughts/bitcoin|Bitcoins]]’s Lightning Network and [Raiden Network](https://raiden.network/) on Ethereum, but instead of only supporting payments, they also support general ‘state updates.’

Work by

1. Locking up some portion of state into a contract through a deposit of some amount of token
2. Channel participants then communicate off-chain to sign valid transactions without submitting them to the chain. Each new update "replaces" the old one
3. Participants choose to close the channel and submit the state back to the blockchain, unlocks state

Properties

- Near-instant finality: after all parties sign a state update, it can be considered final. Not instant because of dispute window
- Strong [[thoughts/privacy]] properties: every intermediate transaction happens 'within' the channel and doesn't need to be published to chain (which isn't true for sidechains for example)
- Requires all parties to be available
- Requires all participants to be hardcoded in the contract

### Preventing fraud

If a party attempts to fraudulently close a channel, other parties in the channel have a period of time in which they can submit a more recent state, proving that fraud was attempted. Once an infraction is proven, the contract handles the resolution process, (e.g punishing the guilty party by slashing their deposited funds)
