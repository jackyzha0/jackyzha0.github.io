---
title: "Network Block Device"
date: 2023-06-16
tags:
  - seed
---

Network block device (NBD) is a network protocol that can be used to forward a block device (typically a hard disk or partition) from one machine to a second machine

We can think of a block device as a big array of bytes that file system drivers can build file/directory support on top of

A network block device is realized by three components:

1. the server part,
2. the client part, and
3. the network between them
