---
title: "Proof of Stake"
date: 2021-08-06T23:34:08-04:00
tags:
  - seed
---

Uses 'stake' tokens to earn the right to become a validator of the blockchain. Users are chosen to become validators pseudo-randomly depending on various factors like size of stake, age of stake, etc. Validators check for validity of transactions, signing the block, and adding to the chain. Reward for the validator is the transaction fees.

The stake is a financial motivator for users not to validate or create fraudulent transactions (i.e. if you care about the chain, you should hope that members of the chain are also honest, mutual [trust](thoughts/trust.md))

This validation is known as attesting. You can think of attesting as saying "this block looks good to me." If you attest to malicious blocks, you lose your stake. 128 validators are required to attest to a block to achieve finality on it -- this 128 is known as the committee. The committee works on 32 blocks or 'slots' before disbanding -- this duration is known as an epoch.

[Source: Ethereum Wiki](https://eth.wiki/en/concepts/proof-of-stake-faqs)

TLDR; a set of validators take turns proposing and voting on the next block, and the weight of each validator’s vote depends on the size of its deposit (i.e. stake)

One of the alternatives to [PoW](thoughts/proof%20of%20work.md)

> Security comes from putting up economic value-at-loss rather than straight up burning energy (however, this doesn't take into account collusion)

## Losing Stake

For example, a user can lose a portion of their stake for things like going offline (failing to validate) or their entire stake for deliberate collusion.

## Disadvantages

- Greater chance of [51% attacks](thoughts/fault%20tolerance.md)
  - Though this is questionable, 51% means you need to control 51% of the staked ETH which would probably cause ETH's value to drop significantly. There's very little incentive to destroy the value of a currency you have a majority stake in.
- Incentive to hoard tokens and not use them
