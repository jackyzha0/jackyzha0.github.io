---
title: "Solana"
date: 2022-05-03
tags:
  - seed
---

Solana is a [[thoughts/blockchain|blockchain]] that claims to be fast, secure, scalable, affordable, and resistant to [[thoughts/censorship|censorship]]

Main technical innovations

## Proof of History

For a blockchain to work, participant nodes need to reach an agreement on time. Traditional blockchains like [[thoughts/bitcoin|Bitcoin]] function by [[thoughts/proof of work|proof of work]].

The whole philosophy behind it is:

- Running the function takes some time
- Running the function is the only way to produce the output
- With the known input and output of the function, the only way of evaluating the output is to re-execute the function with the provided input

This guarantees that when an output is valid for an input, some time has passed for producing that output.

## Tower BFT

[[thoughts/PBFT|PBFT]] which uses proof of history as a reliable source of time.

From [Solana Documentation](https://docs.solana.com/implemented-proposals/tower-bft)

> The basic idea to this approach is to stack consensus votes and double lockouts. Each vote in the stack is a confirmation of a fork. Each confirmed fork is an ancestor of the fork above it. Each vote has a `lockout` in units of slots before the validator can submit a vote that does not contain the confirmed fork as an ancestor.
>
> When a vote is added to the stack, the lockouts of all the previous votes in the stack are doubled (more on this in [Rollback](https://docs.solana.com/implemented-proposals/tower-bft#Rollback)). With each new vote, a validator commits the previous votes to an ever-increasing lockout. At 32 votes we can consider the vote to be at `max lockout` any votes with a lockout equal to or above `1<<32` are dequeued (FIFO). Dequeuing a vote is the trigger for a reward. If a vote expires before it is dequeued, it and all the votes above it are popped (LIFO) from the vote stack. The validator needs to start rebuilding the stack from that point.

## Turbine

Similar to data sharing approaches in [[thoughts/peer-to-peer|p2p]], seed chunks to peers that can then share amongst themselves.

## Gulf Stream

> Each Validator knows the order of upcoming Leaders due to Solana's architecture. So clients and Validators forward transactions to upcoming Leaders before they act as a Leader in the network. This allows Validators to start processing transactions ahead of time. This results in fewer transactions cached in Validators’ memory and faster confirmations.

Isn't this potentially problematic? If all nodes know what the upcoming leader is, couldn't they just DDoS the next leader?

## Archiver Nodes

If each node in the network was required to store that much data, a limited group of participants who could afford and manage that kind of storage, could join the network and this makes the network centralized.

PoRep stands for proof of replication and it’s a system introduced by [[thoughts/Filecoin|Filecoin]] initially in which a prover defends a publicly verifiable claim that it is dedicating unique resources to storing one or more retrievable replicas of a data file.

Occasionally, the network will ask/challenge the archivers to prove they’re doing their job of storing data and at this point, archivers should complete PoRep.
