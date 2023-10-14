---
title: "File system"
date: 2022-06-23
tags:
  - seed
---
## Overlay File System

[Source](https://docs.kernel.org/filesystems/overlayfs.html)

Sometimes referred to as union-filesystems. You can think about it like different 'layers' of file systems, much like those laminated overhead projector sheets. If there are duplicated files, the file from a higher layer will take precedence.

## Virtual Distributed File System

From [Alluxio's Technical Paper by Haoyuan Li](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2018/EECS-2018-29.pdf)

> Alluxio is an append-only file system, similar to HDFS, that supports standard file operations, such as create, open, read, write, close, and delete

The storage layer of the ecosystem grew from the Apache Hadoop Distributed File System (HDFS) to a variety of choices, such as file systems, object stores, blob stores, key-value systems, and NoSQL databases to realize different tradeoffs in cost, speed and semantics

One way of solving the n-to-n problem is to use a VDFS as opposed to exposing APIs. Reduces a lot of overhead in

- Work: needing to solve similar problems around storage
- Data storage: ETL (extract, transform, load) pipelines

For the benefits and values the VDFS provides, we can make the analogy to [[thoughts/IP Address|IP]]. The IP layer is the narrow waist that enables the higher layer to innovate without worrying about the lower IP layer, and vice-versa. In the meantime, the virtual file system is an abstraction layer on top of a concrete file system implementation, and it allows applications to be able to access different types of concrete file systems in a uniform way.

### Performance

While caching can dramatically improve read performance, unfortunately, it does not help much with write performance. This is because highly parallel systems need to provide fault-tolerance, and the way they achieve it is by replicating the data written across nodes.

Interesting to note: in big data processing, the same operation is repeatedly applied on massive data. Therefore, replicating programs is much less expensive than replicating data in many cases

## CRDT (ElmerFS)

[Source](https://hal.inria.fr/hal-03278658/document)

The design of ElmerFS leverages the properties of [[thoughts/CRDT|CRDTs]]) to ensure that concurrent operations on different replicas always converge to a correct state while preserving the semantics of a traditional POSIX file system

Challenges

1. Unique identifiers: Any operation that creates inodes needs to generate 2 a unique identifier. Without coordination among replicas, generated ids might conflict.
2. Named links: Operations that create or move objects (files or directories) may result in conflicts in which concurrent operations on different replicas create objects with the same name in the same directory.
3. Cycles: Concurrent move operations without coordination may violate the file system invariant. For example, merging an operation that moves a directory A into a directory B with a concurrent operation that moves B into A can result in a cycle.
4. Divergent renames: The rename operation is semantically a move operation, it move a link from one folder to another. When two concurrent renames move the same link to two different places, if both rename are ultimately accepted, a additional link of the inode will be created.
5. Permissions changes: Updating permission from a replica may take some time to be enforced in other replicas. Merging an operation that removes a Bob’s permission to write to file with a concurrent operation in which Bob writes to that file will result in a different outcome depending on the order in which operations are applied.

The four main entities are inode objects, symbolic links, blocks and directories. We represent a file as a collection of fixed-size blocks. Each block is represented using a LWWR.

> Note: Further work needs to be done for allowing file content to diverge without loss of data or to use a CRDT that would be appropriate for a given file format. This means this is _not_ ideal for collaborative text editing for example

It is based on the FUSE protocol, a user-space protocol used to implement file systems. The interface layer receives a FUSE request, calls the corresponding operation in the translation layer, and creates the appropriate response.

The translation layer is responsible for translating FUSE requests to CRDT operations.
