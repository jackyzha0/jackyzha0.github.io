---
title: "Decentralization"
date: 2021-08-06T23:12:28-04:00
---

[Source](https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274)

![Decentralization Diagram](https://miro.medium.com/max/1094/1*WG5_xDDwHv0lMaVUYLNbVA.png)

## 3 Axes of Decentralizatiaon
1. Architectural Decentralization: how many physical computers is a system made of? how many computers can fail before the network fails?
2. Political Decentralization: how many individuals/organizations ultimately control the computers that the system is made up of?
3. Logical Decentralization: are the data structures used to represent the system more monolithic or swarm-like? if you cut the system in half (both providers and users), will both halves continue to fully operate as independent units?

Notes:
* Architectural centralization often leads to political centralization (at least in the physical world, less true for digital spaces)

## Centralization
[Source](https://onezero.medium.com/why-decentralization-matters-5e3f79f7638e)

Follow a predictable life cycle along the S-shaped adoption curve.

At the beginning, will do everything they can to garner usage and appear more valuable as platforms with multi-sided positive network effects. However, when they move up the S-curve, their power grows. Eventually, the relationships turn from [positive sum](thoughts/positive%20sum.md) to [zero sum](thoughts/zero%20sum.md). Thus, to continue growing, they must extract from users (e.g. selling user data, taxing profits, etc.)

> Centralized systems often start out fully baked, but only get better at the rate at which employees at the sponsoring company improve them. Decentralized systems start out half-baked but, under the right conditions, grow exponentially as they attract new contributors.

## Why Decentralize?
1. [**Fault tolerance**](thoughts/fault%20tolerance.md), less likely to fail accidentally because they rely on many separate redundant components
2. **Attack resistance**, no central point to attack
3. **Collusion resistance**

### Decentralization as Activism
[Source](https://www.gwern.net/docs/technology/2018-07-25-johnbackus-howdecentralizationevolves.html)

> Decentralization doesn't work in a vacuum, mainstream decentralized systems require a degree of activism to keep the system working

"BitTorrent seems to represent the minimum viable decentralization required to stay alive as defined by the law at the time"

Decentralization is a tactic for diffusing risk for many and lowering the risk for the activists that operate the most sensitive parts of the system.

**Over applying decentralization isn't a strategy unless your goal is obscurity**

### Counterpoints
#### Fault Tolerance
Common mode failure, all pieces can fail for the same reason. (e.g. all nodes in a blockchain run the same software but that software has a bug)

To counteract this,
- have multiple competing implementations
- knowledge of technical considerations behind underlying protocol must be public and democratized
- core stakeholders should be from multiple companies/orgs or just multiple volunteers
- use [proof of stake](thoughts/proof%20of%20stake.md) to move away from hardware centralization risk

#### Attack Resistance
From a purely mathematical and game theory perspective, decentralization may not even matter. In a finality reversion (e.g. 51% attack), a huge loss of say $50M is still $50M regardless of whether you have validators in 1 org or 10.

However, after considering coercion, decentralization becomes much more important. It's much harder to threaten 100 people than 1.

#### Collusion Resistance
> Collusion is "coorindation that we don't like"

[consensus](thoughts/consensus.md) model relies on **uncoordinated choice model**, the asusmption that the game consists of many small actors that make decisions independently

Yet, 90% of the entire Bitcion network's mining power can show up at the same conference (as 7 men). Yet, some coordination is good (e.g. strong community spirit and banding together to implement patches and fix bugs)

Ways to counteract:
1. Find a happy medium that allows enough coordination for a protocol to move forward but not enough to enable attacks
2. Try to make a distinction between beneficial coordination and collusion and make the former easier and the latter harder

