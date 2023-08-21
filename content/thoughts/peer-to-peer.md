---
title: "Peer to peer"
date: 2022-03-30
tags:
  - seed
  - CPSC317
aliases:
  - peer-to-peer
  - p2p
---

In contrast to client-server models, peer-to-peer systems are [[thoughts/decentralization|decentralized]] [[thoughts/Network Theory|networks]] with no privileged nodes. Each node performs the same roles as any other.

A philosophically [[thoughts/plurality|pluralistic]] way of computing that recognizes there isn't only one correct primary site (see: [[thoughts/A Certain Tendency Of The Database Community]]).

Examples include [[thoughts/BitTorrent|BitTorrent]], [[thoughts/blockchain|blockchains]], [[thoughts/Rhizome Proposal|Rhizome]]

## Databases

[Source](https://blog.mauve.moe/posts/peer-to-peer-databases)

- Limitations of Operation logs
  - "... scenarios where somebody is following a lot of users with a lot of history in SSB and needing to wait for all the logs to be processed, or when a new database replica is added and needs to fetch all the existing state (whether it's a regular DB or a blockchain full node)."
  - "One way to get around needing to 'catch up' with a writer is to get 'snapshots' of the current state of the data from trusted peers"
    - However, the naive approach does not work in peer-to-peer situations as we can't verify the legitimacy of the whole snapshot
    - Can we utilize ZK proofs here?
  - Overall, unsolved. All of this together leads to either a [[thoughts/inevitability of centralization|centralization]] of power in long-lived nodes that do the replication for you due to preferential attachment
- Actual databases use indices
  - "For example, instead of an application getting a list of every single post in a database and filtering based on the 'tags', they can say `Get me the first 32 posts with the tag #cats` and the database engine will figure out how to do that for them."
  - This can heavily optimize reads for client applications
- Mauve suggests that we can actually solve these using [[thoughts/Prolly Trees]]

## Values

[Source](https://laurelschwulst.github.io/p2pforever.org/)

1. **We should improve and preserve the Web.** The Web is a genuine social accomplishment and we should look after it. Don’t let lesser platforms win out.
2. **Devops is oppressive!** Many people can’t publish websites or apps because they can’t run servers. Publishing should be accessible to all.
3. **“View source” is critical to an open Web.** The more code that users can read, the more code they can review and learn from.
4. **“Modify source” is the p2p Web’s great power.** A Web that can be made and remade by its people can better serve their needs and produce a more diverse & exciting world. The Web should be a truly “live” society.
5. **Minimize change, maximize impact.** The p2p Web should still be the Web. Make it better, don’t remake it.
6. **Don't forget resilience.** A web based on protocols, not platforms, is a safe web. Don't put data in silos but have various platforms use the same protocols to interact.
