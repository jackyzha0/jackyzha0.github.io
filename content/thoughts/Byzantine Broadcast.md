---
title: "Byzantine Broadcast"
date: 2022-07-01
tags:
  - seed
aliases:
  - BB
---

In Byzantine broadcast (BB) or Byzantine reliable broadcast (BRB), there is a designated sender that sends its input value to all parties, and all non-[[thoughts/fault tolerance|faulty]] parties must deliver the same value.

Assumptions:

1. Honest users all output a message if the leader is honest (termination)
2. Honest users never output different messages (consistency)

One way to do it is using a single leader, but what happens if the leader crashes/becomes unavailable? We can just manually failover: human operator chooses a new leader and reconfigures each node to use new leader, but this is non-ideal.

Normally, we solve BB using consensus algorithms to solve this. Some common consensus algorithms include (all assume partially synchronous, crash-recovery [[thoughts/system model|system model]]):

- Paxos: single-value consensus
- Multi-Paxos: generalization to [[thoughts/message broadcast#Total order broadcast|total order broadcast]]
- [[thoughts/Raft Consensus Algorithm|Raft]], Viewstamped Replication, Zab: [[thoughts/message broadcast#Total order broadcast|total order broadcast]] by default

Blockchain consensus models are slightly different as they assume partially synchronous Byzantine [[thoughts/system model|system model]].

For all approaches below, we assume

1. Public Key Infrastructure exists (i.e. nodes know the mapping of public key to entity)
2. Internet exists (i.e. there is a reliable way to send message between nodes)

We denote $f$ as the number of Byzantine nodes

## Naive Approach

Reliant on a synchronous [[thoughts/system model#Timing behaviour e g latency|system model]]

1. `t=0`: sender sends a signed value $v^*$ to all other nodes
2. `t=1`: nodes echo msg from sender to all other nodes, signed again (cross-checking)
3. `t=2`: each node $i$ chooses output $v_i$ by majority vote (at most one vote from sender, at most $n-2$ from other peers). Break ties consistently (e.g. lexicographically)

Solves BB for $f \leq 1$, $n \geq 4$. Doesn't hold for Byzantine sender, only Byzantine peers.

## Dolev-Strong (1983)

Trying to generalize the naive approach for potentially Byzantine senders by utilizing [[thoughts/digital signatures|signature]] chains

In essence, node $i$ is only convinced of value $v$ at time $t$ if it receives a message that

- references the value $v$
- is signed first by the sender
- is also signed by $\geq t-1$ other distinct nodes (none of which are node $i$)

The principle is to only accept a value in the last round if its contents can certify that all parties have received this value. This leads to a very powerful idea in the synchronous model: The validity of a message is a function also of the time it is received

At the end of $f$ rounds of cross-checking (one round per possible Byzantine node), if node $i$ is convinced of exactly one value, that is the correct value. Otherwise, output the. default value (e.g. an empty list of txs)

Solves BB for $f < n$, but really only useful at $f < \frac n 2$ for [[thoughts/State Machine Replication (SMR)|state machine replication]]. If $f < \frac n 2$ then we can take majority vote to arrive at consistent state (not the case if $f \geq \frac n 2$). This bypasses the [[thoughts/PSL-FLM Impossibility Result|PSL-FLM Impossibility Result]] because we assume [[thoughts/Public-key Infrastructure|PKI]] exists
