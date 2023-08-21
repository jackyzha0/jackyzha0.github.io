---
title: "PBFT"
date: 2022-08-05
tags:
  - seed
---

_[Practical Byzantine Fault Tolerance](http://css.csail.mit.edu/6.824/2014/papers/castro-practicalbft.pdf)_ by Miguel Castro and Barbara Liskov

TLDR; one of the first [[thoughts/State Machine Replication (SMR)|state machine replication]] algorithms with an asynchronous [[thoughts/system model|system model]] that can tolerate [[thoughts/Byzantine Faults|Byzantine faults]] (although it has a weak synchrony assumption where all messages are guaranteed to be delivered after a certain time bound by using timeouts).

It can drive a consensus decision in two rounds of message exchanges.

1. The first phase guarantees proposal uniqueness through the formation of a quorum certificate (QC) consisting of $(n − f)$ votes.
2. The second phase guarantees that the next leader can convince replicas to vote for a safe proposal.

It offers both [[thoughts/liveness|liveness]] and [[thoughts/safety|safety]] under the [[thoughts/33 percent Impossibility Result|33 percent Impossibility Result]] and only uses [[thoughts/Asymmetric Key Cryptography|public-key cryptography]] during faults to prevent major speed bottlenecks (typically just uses [[thoughts/digital signatures#Signed Message Digest|signed message digests]]). This circumvents the [[thoughts/FLP Result|FLP Result]] because it relies on a synchrony assumption to guarantee liveness, not safety.

For a faster alternative, consider [[thoughts/SBFT|SBFT]] (which provides a reduction from $O(n^2)$ to $O(n)$ normal-case communication and a best-case latency of only a single round of communication)

The primary of a view is replica $p$ such that $p = v \mod |\mathcal{R}|$ where $\mathcal{R}$ is the set of replicas. Note that this _explicitly allows for faulty primaries_ while the algorithm properly handles.

The algorithm works as follows

1. A client $c$ sends a request for operation $o$ to a node in the cluster: $\langle \textrm{Request}, o, t, c \rangle_{\sigma_c}$
   1. If a replica receives the request, it forwards it to the leader
2. The primary multicasts the request to the backup nodes in a three-phase protocol. The pre-prepare and prepare phases are used to totally order requests sent in the same view even when the primary, which proposes the ordering of requests, is faulty
   1. Pre-prepare: mainly used to ensure request was assigned sequence number $n$ in view $v$. Primary $p$ assigns a sequence number $n$ to the request and multicasts a pre-prepare message with digest $m$: $\langle \langle \textrm{Pre-prepare}, v, n, d \rangle_{\sigma_p}, m \rangle$
      1. A replica $i$ accepts a pre-prepare message iff:
         1. It is in view $v$
         2. $d$ is the digest for $m$ and the signature is correct
         3. has not seen a pre-prepare message with the same $v$ and $n$ with a different digest $d$
         4. sequence number is between some $h$ and $H$
   2. Prepare
      1. If replica $i$ accepts the pre-prepare message, it enters the prepare phase by multicasting a $\langle \textrm{Prepare}, v, n, d, i \rangle_{\sigma_i}$
      2. We define a replica $i$ as prepared iff $i$ has in its log:
         1. The request $m$
         2. A pre-prepare for $m$ in view $v$ with sequence number $n$
         3. $>2f$ prepares that match the pre-prepare based on $v$, $n$, and $d$
   3. Commit
      1. If we are prepared, we have supermajority agreement which means all honest replicas agree on the requests in view $v$
      2. Replica $i$ multicasts $\langle \textrm{Commit}, v, n, D(m), i \rangle_{\sigma_i}$
      3. Replicas accept commit messages and insert them in their log provided they are properly signed, the view number in the message is equal to the replica’s current view, and the sequence number is between $h$ and $H$
      4. This phase ensures that if a message is considered committed locally, then it should have been committed for the cluster
         1. A message $m$ is considered committed locally on replica $i$ if it has a log entry indicating it has prepared $m$ with view $v$ and sequence number $n$ and has also accepted $2f+1$ commits that match the pre-prepare for $m$
            1. After a $m$ is considered committed locally and all $m'$ with lower $n$ have been executed, $i$ executes $m$ and applies the state change (as we don't assume ordered message delivery, keeping messages until ready is critical to ensuring message ordering)
            2. $i$ then sends a reply to the client: $\langle \textrm{Reply}, v, t, c, i, r \rangle_{\sigma_i}$
         2. A message $m$ is considered committed on the cluster if for all $i$ in some $f+1$ honest replicas, it has a log entry indicating it has prepared $m$ with view $v$ and sequence number $n$
3. The client waits for $f + 1$ replies from different replicas with the same result; this is the end result
   1. If the client doesn't receive replies in a timely manner, it broadcasts the request to all replicas. If the request has already been processed, the replicas simply re-send the reply (as replicas cache the last reply sent to each client)

![[thoughts/images/3pc-pbft.png]]_Replica 0 is the primary, replica 3 is faulty, and C is the client_

## Garbage Collection

As we assume only asynchronous model, we can't assume any unresponsive node won't rejoin at some later point. So either, we need to keep all log entries around potentially forever (not idea), or have some way to transfer state between nodes (which requires nodes to prove correctness of state).

Generate state correctness proofs are expensive so only happen once every 100 sequence numbers (a stable checkpoint).

Proof generation:

1. When a replica $i$ reaches a checkpoint, it multicasts a message $\langle \textrm{Checkpoint}, n, d, i \rangle_{\sigma_i}$ where $d$ is the digest of the state
2. A replica collects checkpoint messages until they have $2f+1$ messages for the same sequence number $n$ and digest $d$
   1. $2f+1$ messages are the proof of correctness for the checkpoint
   2. A checkpoint with a proof means that the replica is safe to discard all log messages related to sequence number $n$

Additionally, this checkpointing determines what the waterlevel $h$ and $H$ are

- $h$ is the sequence number of the last stable checkpoint
- $H = h + k$ where $k$ is generally twice the gap between stable checkpoints (e.g. 200)

## View Changes

Similar to the concept of term changes and heartbeats in [[thoughts/Raft Consensus Algorithm|Raft]]

If the timer of replica $i$ expires in view $v$, it can broadcast a message to move the system to view $v + 1$

- It stops accepting messages (other than checkpoint, view change and new view messages)
- Multicasts a $\langle \textrm{View-change}, v + 1, n , \mathcal C, \mathcal P, i \rangle_{\sigma_i}$ to all nodes
  - $n$ is the sequence number of the last stable checkpoint $s$ known to $i$
  - $\mathcal C$ is the set of $2f+1$ certificates for $s$
  - $\mathcal P$ is a set of sets $\mathcal{P}_m$ for each message $m$ with a sequence number higher than $n$
  - Each $\mathcal{P}_m$ is the set containing
    - A valid pre-prepare message for $m$
    - $2f$ matching valid prepare messages from different replicas
- When the initiator $p$ of view $v + 1$ receives $2f$ valid view-change messages, it multicasts a new $\langle \textrm{New-view}, v + 1, \mathcal V, \mathcal O \rangle_{\sigma_p}$
  - $\mathcal V$ is the set of all received $2f$ view-change messages along with the initial view-change message $p$ sent out
  - $\mathcal O$ is the set of pre-prepare messages computed as follows:
    - _min-s_: latest stable checkpoint in $\mathcal V$
    - _max-s_: highest sequence number in a prepare message in $\mathcal V$
    - For each $n$ between _min-s_ and _max-s_
      - If there is some message in $\mathcal P$ where the sequence number matches $n$
        - Create a new message $\langle \textrm{Pre-prepare}, v+1, n,d \rangle_{\sigma_p}$
      - If there isn't
        - Create a new message $\langle \textrm{Pre-prepare}, v+1, n,d^{\textrm{null}} \rangle_{\sigma_p}$ where $d^{\textrm{null}}$ is the digest of a noop request
  - Leader appends all messages in $\mathcal O$ to its log and enters view $v + 1$
