---
title: "Arweave"
date: 2022-02-01
tags:
  - seed
---

[Blogpost](https://arweave.medium.com/what-is-arweave-explain-like-im-five-425362144eb5) and [Yellowpaper](https://www.arweave.org/yellow-paper.pdf)

Arweave uses a [blockchain](thoughts/blockchain.md)-like structure called the blockweave. It is capable of reaching 5000 transactions per second (compared to 15 on [Ethereum](thoughts/ethereum.md))

Wildfire is the Arweave’s self-organising network topology system. Wildfire ensures that miners are selfishly incentivised to store and share data as quickly as possible with other miners in the network, in order to build a positive reputation. While more complex under the hood, Wildfire can be summarised as: ‘if you share with me, I will share with you’. (similar to how incentives on [[thoughts/BitTorrent]] work). As nodes in blockweave networks require fast access to data in order to mine efficiently, they are selfishly-incentivised to give data to other members of the network promptly and continuously, autonomously improving the sharing to lightning-fast speeds.

The blockweave solves two fundamental problems currently associated with public decentralised blockchains:

- On-chain storage constraints; and
- Unsustainable consensus mechanisms

In order for an information store to be truly permanent, it must be both [fault tolerant](thoughts/fault%20tolerance.md) and [decentralized](thoughts/decentralization.md). Blockchain technology has much obvious promise in the area of resilient, decentralized information preservation, as a key feature of the technology is that all data inside the blockchain is immutable, and cannot be altered once it is stored. However, traditionally, such technology severely lacks scalability which clearly limits its utility for storing significant quantities of data.

Of especially great importance is users ability to reliably maintain access to all permaweb applications and websites themselves, not simply the content they display, forever.

Requiring proof of access (PoA) incentivises storage as miners need access to random blocks from the blockweave’s history in order to mine new blocks and receive mining rewards.

Unlike traditional blockchain systems, Arweave does not have a typical notion of full and light clients – merely clients that downloaded more or less of the blockweave. With Arweave, full synchronisation is not a risk or an obligation, but an optional upgrade path for which miners receive higher rewards.

From the user’s perspective, there are two types of transactions in the network: data transactions and value transactions. A user can initiate a data transaction to store data in a block.

Most of the transaction fee is contributed towards a storage endowment, which is distributed to the wallets of miners over time. From our current position, at an optimistic 30% annual data density growth rate, it will take 434 years to reach the maximum theoretical limit, at 20% – 697 years, at 10% AGR – 1,329 years.

## Content policies

- Given that the miners collectively maintain the Arweave network, a mechanism is required to allow them to express their opinions on what content should and should not be hosted in the system.
- Nodes express preferences about content through content policies. Content policies can be arbitrary computation performed upon transactions that classify them as acceptable or not acceptable to the local node. In the reference Arweave implementation, content policies are supported in the form of substring matches as well as hashes of the data stored in the transaction.
  - This is one approach to [[thoughts/decentralization]] [[thoughts/Moderation|moderation]]
- Two complementary incentives at play here
  - An incentive not to over-zealously reject too many transactions, as this would lead to a decline in mining rewards
  - An incentive not to accept transactions that the majority of the network is likely to reject, as this will result in mining candidate blocks that the rest of the network will ignore

## Architectures

### Client-server

Traditional web or native applications have a client-server architecture. This model is still possible with the Arweave, as a web server can act as a front-end for data stored on the network’s permanent ledger.

In this centralised Arweave-app model, these services can maintain a pool of AR tokens in order to pay for data storage requests on behalf of the client.

### Serverless

Decentralised applications reside directly on and operate directly from the blockweave itself, and can be accessed by a typical web browser.

Serverless applications hosted on the Arweave network allow users to pay directly for their interactions with the network. This frees the developer from having to subsidise the cost of user interactions themselves

## DNS

The owner of a domain can run a permanently-available, decentralized web application just by storing a transaction on the Arweave network and registering [[thoughts/DNS]] records via the usual external service providers

You need

1. A DNS CNAME record pointing to an Arweave gateway: `www CNAME arweave-gateway.net`
2. A DNS TXT record linking the domain with a specific transaction ID: `arweavetx TXT kTv4OkVtmc0NAsqIcnHfudKjykJeQ83qXXrxf8hrh0S`
