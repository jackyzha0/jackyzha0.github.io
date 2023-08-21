---
title: "Urbit"
date: 2022-02-20
tags:
  - seed
---

## Terminology

- Arvo: OS
- Hoon: language
- Tlon: company
- Azimuth: ID
- Ames: Network

> imo, falls into the category of vaporwave tech that never manifested itself into anything useful

## OS

In 1974 a computer was a mainframe the size of a room and was shared by hundreds of people. By 1984 a computer was the size of a desk and everyone had their own PC. The PC was more flexible and more fun, so it won by a wide margin. Then, with the rise of the internet, the PC’s flexibility slowly became irrelevant -- we’re more or less back to the timesharing model of the 1970s.

Urbit OS is the PC to MEGACORP’s mainframe.

![](https://media.urbit.org/site/understanding-urbit/technical-overview/technical-overview-kernel@2x.png)

## ID

Urbit ID is a decentralized addressing and public key infrastructure designed for Urbit OS.

The Urbit ID registry is live and deployed to the Ethereum blockchain. Urbit ID isn’t specifically wedded to Ethereum – someday we’d like it to be hosted by Urbit OS itself.

Related: [internet computing](thoughts/internet%20computing.md)

- 256 (2^8) Galaxies
  - Web analogue: DNS Root Servers
  - The senate that can upgrade the logic of the Urbit ID system by majority vote
- 65,280 (2^16) Stars
  - Web analogue: ISP, for routing packets
- 4,294,901,760 (2^32) Planets
  - Individual ID
- 2^64 Moons

In a way, upgraded version of ENS?

Uses [Kelvin Versioning](https://jtobin.io/kelvin-versioning) which is an interesting exercise in [digital permanence](thoughts/digital%20permanence.md)

Libraries

- Profile picture generation from Urbit: https://github.com/urbit/sigil-js
- Phonetically pronounceable data: https://github.com/urbit/urbit-ob
