---
title: "HoneyBadgerBFT"
date: 2022-08-10
tags:
  - seed
aliases:
  - HBBFT
---

> An asynchronous [[thoughts/system model|system model]] total-order [[thoughts/message broadcast|message broadcast]] protocol

Key features:

- Asynchrony: no timing assumptions. Messages can arrive at any time, and network speed determines the transaction rate
- Leaderless consensus: every node is a proposer. This eliminates potential attacks where a leader node can be stalled indefinitely, bringing the entire network to a halt

HoneyBadgetBFT (HBBFT) can be decomposed into nested subproblems:

- Queuing Honey Badger (QHB)
- Honey Badger (HB)
- Subset
- Reliable Broadcast (RB)
- Binary Agreement (BA)
- Threshold Sign

An example flow of how message broadcast might work with a transaction $x$

- QHB places this transaction, along with others it has received, into a queue of pending transactions
- A random process determines which transactions to include in the next block
  - When $x$ is included in the contribution, it is submitted to Honey Badger. HB encrypts the list using threshold cryptography, creating a garbled version that contains your transaction but can’t be read. This is submitted to the Subset algorithm
    - Subset puts it into a Reliable Broadcast instance for `Node 1`. This distributes the contribution to every other node in the network
      - Once every node has received the encrypted contribution via RB, they know that all other correct nodes will also receive this contribution. They vote `Yes` in the Binary Agreement instance labelled `Node 1`, meaning that this contribution should be included as part of the next block
    - Going back up to Subset, we now have $> \frac 2 3$contributions from all the nodes which are all encrypted
  - In HB, we now have enough contributions to decrypt all of them. Each node gets $n$ lists of decrypted transactions, including $x$
- QHB then makes a union of the contributions and creates a single finalized list of transactions that all nodes have agreed on
- This final list is sent out of QHB and back to the application client

Some faster and more efficient alternatives have also been developed:

- [Dumbo1 and Dumbo2](https://eprint.iacr.org/2020/841.pdf)
- [BEAT](https://www.csee.umbc.edu/~hbzhang/files/beat.pdf)
