---
title: "Security"
date: 2021-10-14
tags:
- seed
---

[Source: Playdough Protocols in *Kernel*](https://kernel.community/en/learn/module-1/playdough-protocols)

Integrity of information is critical to relationships of [trust](thoughts/trust.md) as we saw in the episode on [game theory](thoughts/game%20theory.md).

## Internet
On security in [[thoughts/internet computing|the internet]]

Main excuse: "when $x$ was designed, there were only a few players and they all know and trusted each other"

> "Secure" web servers are the equivalent of heavy armoured cars. The problem is, they are being used to transfer rolls of coins and checks written in crayon by people on park benches to merchants doing business in cardboard boxes from beneath highway bridges. Further, the roads are subject to random detours, anyone with a screwdriver can control the traffic lights, and there are no police. -- Garfinkel, Spafford, "Web Security and Commerce"

A lot of the internet is based on good faith and relying on users to be good actors

What level of the [[thoughts/internet computing|internet computing stack]] should be responsible for security? Options:
- New network-layer protocol
- New transport-layer protocol
- New 'pseudo-layer' between transport and application (SSL, TLS)
- Responsibility of the application (SSH)

### Terminology
- confidentiality: only the sender and the intended receiver should "understand" message contents
- authentication: the sender and receiver want to confirm each other's identity
- message integrity: the sender and receiver want to ensure that the message is not altered without detection
- access and availability: services must be accessible and available to users
- Actors: can be people or entities
	- Alice, Bob: want to communicate securely
	- Trudy: intruder, may
		- eavesdrop: intercept messages
		- delete/add messages
		- impersonation: can fake source
		- hijacking: 'take over' ongoing connection
		- denial of service: prevent service from being used by others
- Given that Trudy can see all the data, how do we provide confidentiality? [[thoughts/encryption|Encryption]]!