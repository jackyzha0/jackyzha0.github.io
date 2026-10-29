---
title: "Tango"
date: "2026-08-05"
tags:
  - seed
---

> *Distributed Data Structures over a Shared Log*

[Source Paper](https://www.cs.cornell.edu/~taozou/sosp13/tangososp.pdf)

A system for building highly available metadata services where the key abstraction is a Tango object, a class of in-memory data structures built over a durable, [[thoughts/fault tolerance|fault-tolerant]] shared log

![[thoughts/images/tango-diagram.png|400]]

Tango can be viewed as a synthesis of [[thoughts/State Machine Replication (SMR)|SMR]], log-structured storage, and history-based systems

Its design is enabled by the existence of fast, decentralized shared log implementations that can scale to millions of appends and reads per second; the papers implementation runs over a modified version of [[thoughts/CORFU|CORFU]]

## OIDs and versions

- An OID is a unique integer for each Tango object. The runtime uses it to tag the object's entries in the shared log, so many objects can share one log
- A version is the last log offset that modified the object
	- As for versioning granularity, one version per object is fine for registers and counters, but for maps and trees it could abort transactions that touch unrelated parts
	- In these cases, a structure can provide its own scheme and upcalls to check and update versions

## Anatomy of a Tango object

- A Tango object is an in-memory data structure (the view) whose only source of truth is the shared log. It has three parts
	- the view: ordinary in-memory state, like a map, a list, or a register's one integer
	- an `apply` upcall, which the Tango runtime calls with new log entries. The view may only change through `apply`, never from application threads
	- mutators and accessors, which are the object's external interface (`get`/`put`, `read`/`write`)
	- The runtime gives the object two calls
		- `updateHelper(record, oid)` appends an opaque update record to the log
		- `queryHelper(oid)` plays new log entries up to the current tail, calling `apply` on each
- By deriving views from the log, it inherits a few properties for free:
	- Consistency: all writes go through the shared history and synchronize on reads
	- Durability: clients can recover views after crashes by playing back the history in the shared log
	- History: previous state can be accessed by instantiating a new view from a prefix of the history
	- Elasticity: the aggregate throughput of [[thoughts/linearizability|linearizable]] reads can be scaled simply by adding new views

```ts
class TangoRegister {
  private state = 0 // the view

  constructor(private oid: number, private runtime: TangoRuntime) {}

  // upcall: only the runtime calls this, with entries read from the log
  // all records are just bytes
  apply(record: Uint8Array) {
    this.state = decodeInt(record)
  }

  // mutator: append an update record, don't touch the view
  write(value: number) {
    this.runtime.updateHelper(encodeInt(value), this.oid)
  }

  // accessor: catch up to the log tail, then read the view
  read(): number {
    this.runtime.queryHelper(this.oid)
    return this.state
  }
}
```

## Transactions

- A transaction is optimistic: it runs without locks and is validated at commit
- `beginTX` and `endTX` bracket ordinary accessor and mutator calls
- While it runs
	- `beginTX` creates a transaction context in thread-local storage
	- `queryHelper` now just adds the object's `(oid, version)` to the read set
	- `updateHelper` now just buffers writes and nothing reaches the log
- `endTX` flushes the buffered writes to the log as speculative entries and appends a commit record carrying the read set
	- Clients replaying these skip speculative entries.
	- When any client's replay reaches a commit record, it compares each version in the read set with the object's current version at that point in the log
		- none changed: commit. The speculative writes are applied through each object's `apply` upcall
		- any changed: abort. The speculative writes are never applied

## Streams

- A stream is the part of the shared log that belongs to one object (identified by its OID). A client only hosts some objects, so it should only have to read those streams and not the whole log
- That needs a way to find a stream's next entry without reading the entries in between. `readnext` returns it, and `multiappend` puts one entry on several streams
- CORFU does this with backpointers: each entry's header lists the previous K entries of every stream it belongs to. They point backward because log pages are write-once, so an old entry can't be updated with a forward pointer, and the sequencer already knows each stream's last K offsets when it hands out the next position

```plaintext /B/#dim
  offset    0   1   2   3   4   5   6   7
  stream    A   A   B   A   A   B   B   A

                        ▲───▲───────────┘   entry 7 points to 4 and 3
                ▲───────▲───┘               entry 4 points to 3 and 1
            ▲───▲───────┘                   entry 3 points to 1 and 0
            ▲───┘                           entry 1 points to 0
```

- Stream A above is entries 0, 1, 3, 4 and 7, with K = 2. Each row starts at an entry and the arrows point at the entries its backpointers refer to. To catch up, a client asks the sequencer for the stream's last entry and walks backward: read entry 7, then jump to entry 3 (its Kth pointer), and it has the whole list after two reads instead of four. In general N entries cost about N/K reads. It then keeps the offsets in memory, and `readnext` walks that list forward
	- K > 1 also keeps the chain alive when an entry is junk, since a hole filled with junk has no backpointers
- A transaction across several objects multiappends its commit record to all their streams, so a client hosting any of them sees it
