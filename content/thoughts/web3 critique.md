---
title: "Web3 Critique"
date: 2022-01-08
tags:
- sapling
---

Really good piece by [Moxie on web3](https://moxie.org/2022/01/07/web3-first-impressions.html?curius=1294).

- Web3 lacks [infrastructure](thoughts/infrastructure.md)
	- By definition, infrastructure does not need to be rebuilt every time they are used. To ask people to throw away their infrastructure is rather stupid.
	- Servers are infrastructure! Nodes are infrastructure! People won't want to run these themselves. Until we reach a point where enough web3 platforms are able to provide this same level of infrastructure, we're going to still end up with centralization.
	- "If there’s one thing I hope we’ve learned about the world, it’s that people do not want to run their own servers. The companies that emerged offering to do that for you instead were successful, and the companies that iterated on new functionality based on what is possible with those networks were even more successful."
- [Decentralization](thoughts/decentralization.md) is not always good. The more I get involved with the space, the more I am certain that the main value add of [blockchain](thoughts/blockchain.md) and [web3](thoughts/web3.md) is not decentralization but rather [interoperability](thoughts/interoperability.md) and [transparency](thoughts/transparency.md).
	- Decentralization also ends up making progress very difficult. See: [Vanilla Ice Cream effect](thoughts/Vanilla%20Ice%20Cream%20effect.md)
	- "This isn’t a funding issue. If something is truly decentralized, it becomes very difficult to change, and often remains stuck in time."
- Blind [trust](thoughts/trust.md). Crypto folks don't necessarily trust the people but some just blindly trust the medium. If people don't understand how the medium works to facilitate transactions, how can they trust it? Transparency also involves transparency into its inner workings.
	- Similarly, "Almost all dApps use either Infura or Alchemy in order to interact with the blockchain."
	- We just rely on these two pieces of critical (centralized!) pieces of infrastructure to produce the correct results and not be bad actors.
- [Degraded Blockchain problem](thoughts/Degraded%20Blockchain%20problem.md)

### Vitalik Response
[Source: Vitalki's Reddit Response](https://www.reddit.com/r/ethereum/comments/ryk3it/my_first_impressions_of_web3/hrrz15r/)

Levels of connecting to the blockcahin
1.  Use a Binance account.
2.  Run a piece of code that asks the Infura API endpoint what the blockchain state is, trust the answer. However, keys are still kept locally; the code signs transactions locally and sends them to the Infura API endpoint to be re-broadcasted.
3.  Same as (2), but the code also runs a [light client](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/sync-protocol.md) to verify the signatures on the block headers and uses Merkle proofs to verify individual account and storage data.
4.  Same as (3), but the code talks to N different API endpoints run by N different companies, so only 1 of them need to be providing honest answers for the connection to be reliable.
5.  Same as (4), but instead of pre-specifying N API endpoints the code connects directly to a [p2p](thoughts/peer%20to%20peer.md) network
6.  Same as (5), but the code also does data availability sampling and accepts fraud proofs, so it can detect and refuse to accept blocks that are invalid.
7.  Run a fully verifying node.
8.  Run a fully verifying node that also participates in mining/staking.