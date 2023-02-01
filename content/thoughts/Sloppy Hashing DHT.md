---
title: "Sloppy Hashing DHT"
date: 2023-01-29
tags:
- seed
draft: true
---

[Source](https://www.cs.princeton.edu/~mfreed/docs/coral-iptps03.pdf)

Main problems with [[thoughts/Kademlia DHT]] is that it has poor locality.

Locality through clustering


isochrone clustering?

downsides:
- privacy kinda sucks
	- publish not only addresses but the path to get there
- requires network size estimation
- not BFT