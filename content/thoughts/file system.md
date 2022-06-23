---
title: "File system"
date: 2022-06-23
tags:
- seed
---

## Virtual Distributed File System
From [Alluxio's Technical Paper by Haoyuan Li](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2018/EECS-2018-29.pdf)

> Alluxio is an append-only file system, similar to HDFS, that supports standard file operations, such as create, open, read, write, close, and delete

The storage layer of the ecosystem grew from the Apache Hadoop Distributed File System (HDFS) to a variety of choices, such as file systems, object stores, blob stores, key-value systems, and NoSQL databases to realize different tradeoffs in cost, speed and semantics

One way of solving the n-to-n problem is to use a VDFS as opposed to exposing APIs. Reduces a lot of overhead in
- Work: needing to solve similar problems around storage
- Data storage: ETL (extract, transform, load) pipelines

For the benefits and values the VDFS provides, we can make the analogy to [[thoughts/IP Addresses|IP]]. The IP layer is the narrow waist that enables the higher layer to innovate without worrying about the lower IP layer, and vice-versa. In the meantime, the virtual file system is an abstraction layer on top of a concrete file system implementation, and it allows applications to be able to access different types of concrete file systems in a uniform way. 

### Performance
While caching can dramatically improve read performance, unfortunately, it does not help much with write performance. This is because highly parallel systems need to provide fault-tolerance, and the way they achieve it is by replicating the data written across nodes.

Interesting to note: in big data processing, the same operation is repeatedly applied on massive data. Therefore, replicating programs is much less expensive than replicating data in many cases

