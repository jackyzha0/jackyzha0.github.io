---
title: Willow Protocol
date: 2024-02-02
tags:
  - seed
---
[Source](https://willowprotocol.org/)

A protocol for peer-to-peer data stores.

- We made Willow to make running a network _together_ a sustainable practice.
- We made Willow to reconcile peer-to-peer networks with social realities. Wrangling the complexity of distributed systems shouldn’t mean we trade away basic features like deletion, or accept data structures which can only grow without limit.

### Properties
- As many of these stores as you want, keyed to different namespaces. When stores from different devices belong to the same namespace, they deterministically sync with each other.
- Private and end-to-end encrypted. Other users can't find out what you’re interested in unless they already know about it themselves.
- Total [[thoughts/deletion|delete]] via prefix pruning (essentially cutting a tree of causal dependencies by trimming down to root and marking that with a single tombstone). Destructive edits. When you update a value, the old values and associated metadata are overwritten.
- Fine grained [[thoughts/access control|access control]]. Restrict read and write access by semantically meaningful ranges of data, or time range.
- Peers can communicate resource budgets, so devices with very limited memory can sync too.

## Data Model
[Source](https://willowprotocol.org/specs/data-model/index.html#data_model)

Willow is a system for giving meaningful, hierarchical names to arbitrary sequences of bytes (called _payloads_).

For any given subspace, you can address payloads via paths (e.g. `blog/idea/1` and `blog/idea/2`).
- Entries can be overwritten by more recent entries (Willow tracks timestamps and deletes actually delete everything except the metadata)
- Deletes are hierarchical (e.g. deleting `blog` will delete all of tis subpaths).
	- This is called prefix pruning

Entries live in separate subspace owned by different users (intuitively, each user writes to their own, separate universe of data. Willow allows for various ways of controlling who gets to write to which subspace)

![[thoughts/images/willow-subspaces.png]]

Interestingly, namespaces can also be aggregated into namespaces.

Some types
- `Payload`: at most $2^{64}-1$ bytes
- `Entry`: metadata for a payload
	- `NamespaceId`: keys namespaces
	- `SubspaceID`: keys subspaces
	- `Path`: parametrized by
		- `max_component_length`: max length for a path segment
		- `max_component_count`: max path segments in a path
		- `max_path_length`: overall limit for size of path
	- `Timestamp`: time in microseconds since Unix epoch time
	- `payload_length`
	- `PayloadDigest`: content addressing for a payload
		- calculated from `hash_payload(payload) -> hash`: maps `Payload` to `PayloadDigest`

An entry `e1` is newer than an entry `e2` if:
1. `e2.timestamp < e1.timestamp` or
2. `e2.timestamp == e1.timestamp && e2.payload_digest < e1.payload_digest` or
3. `e2.timestamp == e1.timestamp && e2.payload_digest == e1.payload_digest && e2.payload_length < e1.payload_length`

Auth:
- `AuthorisationToken`: proving write permission
- `is_authorized_write(entry, token) -> bool`: maps a path and token to whether that token proves a valid permission to write to entry
- `PossiblyAuthorisedEntry` is a pair of an `Entry` and an `AuthorisationToken`
- `AuthorisedEntry` is a `PossiblyAuthorisedEntry` for which `is_authorised_write` returns true

Stores are collection of `AuthorisedEntry`:
- All `Entry` have the same `NamespaceId`
- An invariant such that an `Entry` `a` cannot both a prefix of another `Entry` `b` _and_ `a` be newer than `b`
	- That is, updating `blog` will invalidate `blog/abc` (is this true?)

A join of two stores is obtained by:
- Start with the union of the two stores
- Remove all `Entry` `e1` where there is some `Entry` `e2` such that
	1. `e2.path` is a parent of  `e1.path` and
	2. `e2` is newer than `e1`
- For all `Entry` with the same `SubspaceID`, `Path`, and `Timestamp`, remove them all except for the one with the greatest `PayloadDigest`
- For all `Entry` with the same `SubspaceID`, `Path`, `Timestamp`, and `PayloadDigest`, remove them all except for the one with the greatest `payload_length`

Stores form a [[thoughts/CRDT#State-based|state-based CRDT]] under the join operation.

### Grouping Entries
[Source](https://willowprotocol.org/specs/grouping-entries/index.html#grouping_entries)

An application might want to access all chess games that a certain author played in the past week. This kind of query corresponds to a box in the three-dimensional Willow space.

There are one-dimensional queries called ranges which work along `SubspaceId`, `Path`, or `Timestamp`

A `3dRange` is a 3-tuple of ranges across all three dimensions:

```
struct 3dRange
  subspaces: SubspaceRange
  paths: PathRange
  times: TimeRange
```

## Sync Protocol
[Source](https://willowprotocol.org/specs/sync/index.html#sync)

Requirements:
- Incremental sync: peers can detect regions of shared data with relatively sparse communication to avoid redundant data transfer
- Partial sync: peers synchronise only those regions of data they both care about
- Private area intersection: peers can discover common interests without disclosing any non-shared information to each other
- Resource control: peers communicate (and enforce) their computational resource limits so as not to overload each other
- Transport independence
- General efficiency: peers can make use of efficient implementation techniques, and the overall bandwidth consumption stays low

