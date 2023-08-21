---
title: "Longest-chain consensus"
date: 2022-07-05
tags:
  - seed
aliases:
  - Nakamoto consensus
  - Nakamoto-style consensus
---

See also: [[thoughts/consensus|consensus]]

Requires $f < \frac n 2$

Primarily studied in the synchronous [[thoughts/system model|system model]]. Three forms:

1. Permissioned + [[thoughts/Public-key Infrastructure|PKI]]
2. Permissionless + [[thoughts/proof of work|PoW]]
3. Permissionless + [[thoughts/proof of stake|PoS]]

Pseudocode properties (all implementations should satisfy these!):

1. Initialize a hard-coded "genesis block" $B_0$ so everyone knows where the chain starts
2. In each round $r = 1,2,3, \dots$
   1. One node is chosen as a leader. This leader can prove itself as leader to other nodes, non-leaders cannot pretend to be a leader or manipulate their chances of becoming a leader.
   2. Leader can create a set of round-$r$ blocks where all of there predecessors are strictly created in some previous round, each with a predecessor block. Blocks form an in-tree rooted at the genesis block.

Honest behaviour

1. Form block $B$ using all known pending pending transactions
2. Set the predecessor of $B$ to be the current longest chain, break ties arbitrarily
3. Immediately broadcast $(B, predecessor)$ to all other nodes

## Balanced Leaders

We define a sequence $l_1, l_2, \dots, \in \{ H, A \}$ as $w$-balanced if in every window $l_i, l_{i + 1}, \dots, l_j$ where $j - 1 \geq w$ and a strict majority of leaders in that sequence are honest.

On finality: if $f < \frac n 2$, we can consider all but the last $k$ blocks in the chain finalized. $k$ is up to the user to determine what parts of the chain they want to consider finalized.

If we assume that the rate of block production is slow relative to the maximum message delay $\Delta$ then inadvertent honest forks rarely occur.

We define $B_k(G)$ as the last $k$ blocks of the longest chain where $G$ is the current tree of all transactions known. $B_k(G)$ is potentially ill-defined if there are multiple longest chains.

Theorem: if a leader sequence is $2k$-balanced, then for every possible sequence $G_0, G_1, \dots$ has

1. The common prefix property: $\forall i, B_k(G_i)$ is well defined
2. Finality: one a block is confirmed, it is always confirmed, $B_k(G_0) \leq B_k(G_1) \leq \dots$
3. Liveness: if a transaction is known to all honest nodes, it will eventually be included in $B_k(G)$

In the case that we chose completely random leaders:

- we can expect randomly chosen leaders to be reasonably balanced
  - on average, expect $1 - \frac f n > \frac 1 2$ nodes to be honest
  - bigger window length $w$ means that we are less likely to see $\geq 50\%$ Byzantine nodes
  - Probability of a given length $w$ window being $\geq 50\%$ Byzantine is $\leq e^{-cw}$ where $c$ is some constant (exponential is good!)
  - Probability of a given length $\geq w$ window being $\geq 50 \%$ Byzantine is $\leq T^2 e^{-cw}$ where $T$ is the length of the sequence we're considering
  - Thus we get a failure probability less than some $\delta$ if $w \geq c_2 (\ln T + \ln \frac 1 \delta)$
- however, there is a small but non-zero chance of balancing failure
