---
title: "Building a BFT JSON CRDT"
date: 2022-11-16
tags:
- fruit
- technical
- Rhizome
enableToc: true
---

CRDTs are a family of data structures that are designed to be replicated across multiple computers without needing to worry about resolving conflicts. If you've ever had to deal with a nasty `git` merge conflict, you know how painful these can be to resolve.

We can mathematically guarantee that an application can *safely* update their local state without needing to coordinate with all of its peers. By avoiding the extra coordination overhead, they have very good latency properties which means they work well in scenarios where real-time collaboration is needed (e.g. text editing, presence, chat, etc.).

Over the past few years, really cool open source CRDT libraries like [Automerge](https://github.com/automerge) and [Yjs](https://github.com/yjs/yjs) have emerged that enable developers to easily add these replicated data types to their own applications. Their support for JSON means that most web-applications can just plug-and-play, enabling collaborative experiences to be created easily.

What normally would have taken weeks or months of engineering to setup infrastructure for a collaborative web experience can be done in a day, bringing us one step closer to a future where the internet feels default-multiplayer, more cozy, and alive with life.

I learn best through building so I set out to write my own CRDT from scratch to really grok what was going on under the hood. A lot of the literature I spent a good few months scratching my head over took a really long time for me to understand and required me to learn a non-trivial amount about [[thoughts/Order theory|order theory]] and [[thoughts/distributed systems|distributed systems]].

I write this blog post mostly as a note to my past self, distilling a lot of what I've learned since into a blog post I wish I had read before going in.

This post will be rather long so use the Table of Contents at the top to jump to whatever section interests you the most.

## How CRDTs differ from traditional databases
- first need to understand how this is different from databases, the normal way of achieving distributed state
- traditional databases focus on linearizability -> basically strong consistency, every read returns a globally up to date value
	- Simultaneous n-way [[thoughts/consensus]]
- good for reasoning at an application level (you can treat your distributed database like a single database)
- Not without downsides
	- Performance costs: lots of messages and waiting for responses
		- traditional consensus needs many rounds of communication, making it infeasible for real-time communication (especially with many nodes)
	- Availability problems: if you can't contact a quorum of nodes, you can't process any operations
		- can 'predict' a successful outcome
		- for smooth experiences, sometimes predictive
		- but if the result is not what we expected, we may sometimes need to 'rollback' what the user sees which is not ideal
- NB: we dont use CAP theorem (footnote) very narrow description of systems
	- https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html
	- Even Eric Brewer admits that CAP is misleading and oversimplified
- basically prevents conflicts by never allowing them to arise in the first place
- but what if we embraced the 'eventual' nature of how the real world works?
	- allowing peers to actually have different states as long as they *eventually* converge to a correct result
	- removes the need to 'wait' for all of our replicas
- in distributed systems talk: we trade linearizability for strong eventual consistency
- [[thoughts/CRDT]]s allow us to achieve that (with some caveats)
	- allow each peer to have its subjective view of the world but mathematically guarantee that when exchanging messages, they'll all still eventually see the same thing
	- This doesn't mean that conflict doesn't ever occur, but we are able to always determine the output up front (without user intervention), based on a metadata contained within the structure itself

## What actually is a CRDT
- ok wtf is a CRDT
	- actually turns out there is no consensus (pun intended) on what the C actually stands for
	- Conflict-free
	- commutative
	- NB: CmRDT vs CvRDT distinction, we use CRDT to refer to CmRDTs (aka op-based crdt) for the rest of this blog post
- regardless of the name, the TLDR is that: over time, all actors converge to same state without data loss *but* there is no guarantee of exact same state across actors at any given moment
- at this point, you may be thinking, why do we need a CRDT? doesn't TCP already guarantee message ordering?
	-  it works for two people communicating directly with each other
	- but as soon as you have 3 people, how do you deal with messages arriving at the same time? concurrency is hard
- to understand how we can reconcile concurrent updates without conflicts, we must take a quick dive into [[thoughts/Order theory]]

### Ordering Messages
we dive briefly into order theory and timekeeping here

basically think about less than equal to and greater than defined but more general
we can defined this relation for members of sets

in this case, we want to define some way to compare messages that we have received from peers so that no two messages are considered happening at the same time (in academic terms, we define a total ordering)

if we can do so, we've mathematically avoided conflicts! so how do we do that?

we can't trust clocks unfortunately
- people can have different wall times
- time is famously non-monotonic (cite)

we can instead use logical clocks

NB: following section on clocks will get a bit in the weeds so if you dont really care about how we make sure theres a total ordering, you can skip ahead

lamport clocks count events, e.g. messages sent rather than seconds elapsed
- everytime we do something locally, we increment our counter by one
- everytime we send a message, we attach this counter
- everytime we receive a message, the new timer is the max of our current one and the one we just received + 1

(diagram showing two peers communicating with a logical clock)

this establishes a partial ordering on events. however, two identical Lamport timestamps might not correspond to the same unique event (both nodes could emit t = 1 for example even though they are different events)

However if we give each node a unique ID, we can actually tie-break on this ID to provide a deterministic way to order concurrent events

### Causality
This is great except for one problem:
- we know that if a causes b, a will definitely have a lower lamport clock
- but we dont know the converse
- if a is a lower lamport clock than b, we cant be sure if a caused b or not

- say we receive a b that is more than one ahead of what we expect it to be
- so we know we are missing at least one message
- can we still deliver it?
- yes if b does not causally depend on that message

- we can encode this by sending causal dependencies with each message

(diagram that indicates causal dependency)

- so that way if we receive a message and we know we've received all of its causal dependencies, it should be safe to deliver
- if we haven't queue it up to deliver whenever that message gets delivered
- basically, [[thoughts/message broadcast#Causal Broadcast]]

NB: this is a more complex form of [[thoughts/TCP]]s windowing technique

### Intuition behind CRDTs
ok enough about theory, how do we actually go about making a CRDT

- ingredients (assumptions)
	- we can pass messages around through connections between computers
	- we need to have a total ordering on the messages so we dont get any conflicts
		- fulfilled because of lamport clocks + unique node ids
	- we need some way of indicating causality
		- fulfilled because we have a message queue and include dependencies in metadata

(diagram of node receiving messages)

great so now we have this ever-growing log of messages. how do we build something useful out of this?

probably the most trivial thing i can think of is a LWW-register
- insert code for LWW register

ok great! can we do something similar for lists? turns out no
you may think that well... the log of operations is a list already right, isn't that just our list crdt?

here it is good to make the distinction between the data itself and the view
the data itself is the messages that are coming in
the view is the data structure we compute from it (and what applications end up seeing)

the data is append-only
thus, the only data structures we can make using CRDTs are ones in which all of operations commute with each other (an equivalent expression of this is the [[thoughts/CALM Theorem]])

basically, do we know how to apply an operation based on what we already know? if we get more information in the future, it shouldn't make any of our previous operations invalid

an example:
1. addition is commutative: doesnt matter how you add numbers, you always end up at the same result
2. set subtraction is not commutative: consider the following operations which happen concurrently
	1. add A
	2. remove A
	4. depending on the order, these will produce different results
	5. we can technically hardcode it to prioritize add over remove (or vice versa) but this wouldnt be a proper set

(converging hasse diagram vs divergent non-commutative)

### List CRDTs (RGA Explained)
that leads us to the biggest problem in the room: lists

on the surface, list operations could not possibly be commutative
inserts and deletes both change indices

1. given a starting string "cat"
2. A inserts "b" at position 0
3. B deletes a character at position 0

swapping 2 and 3 produce different results

luckily some smart people have figured it out for us and instead of using relative addressing (e.g. positional indexing), we can use absolute addressing (e.g. using IDs)

TODO: explain total ordering in terms of absolute indices (example of diving a number line in half for floating point indices)

So... instead of saying “insert ‘A’ after the character at position 4” we say “insert ‘A’, give it ID 3, and insert it after the character with ID 2.”

yup, it requires the notion of causal dependencies we talked about earlier

- the underlying algorithm is RGA
- we represent the list as a causal tree, making the causal parent of each item the character it was inserted after
- (diagram of the tree representation)
- when adding, we basically 1) find the parent item 2) find the right spot to insert before the next node
- (diagram)
- we
	- seek to the position of causal parent (if it doesnt exist, we queue it up for later)
	- keep looking until we reach a node whose causal parent is before ours
	- everything between was inserted concurrently
	- we tie break these like we did earlier
		- we sort them by their lamport clocks (in the implementation, we call this the sequence number, like TCP)
		- if we have a tie, we tie break by their ID.
- this produces the 'internal' representation of the CRDT
-  the 'view' or actual list can be made by flattening the tree with a depth-first traversal

NB: performance enthusiasts will be quick to point out how to make this go faster
- this is a terribly unbalanced tree (need O(n) to find parent, another O(n) to insert)
- yjs uses a doubly-linked list for faster insert + a cursor to track last visited position
	- assumes that editing patterns are *not* random (which is true for most applications due)
- diamond-types (josephg) and the new automerge uses a b-tree for even faster insert + find

## Adding Byzantine Fault Tolerance for free (almost)
- what does bft mean?
	- https://arxiv.org/abs/2012.00472 
	- Citation: Martin Kleppmann and Heidi Howard. 2020. Byzantine Eventual Consistency and the Fundamental Limits of Peer-to-Peer Databases
	- a P2P system cannot rely on nodes always behaving the way that the designers of the system intended
- why are normal CRDTs not BFT?
	- basically, any one node can do something bad and cause state to diverge permanently
	- In some circumstances, the lack of Byzantine fault tolerance can be justified by restricting CRDT-based collaboration to small, trusted groups of nodes: for example, in a collaborative editor, the set of users who are authorised to edit a document may be limited to immediate colleagues, who may trust each other to run the CRDT algorithm correctly
- different from BFT in a consensus context
	- consensus is notably different from collaborative algorithms like CRDTs
		- consensus focuses on choosing one correct value
			- footnote: if you want this behaviour, you can use supermajority quorums like what Tendermind and PBFT do
		- collaborative algorithms focus on converging to a correct state while attempting to preserve everyone's intentions
	- a byzantine actor can attempt to
		- send malformed updates
		- attempt to DDOS the network
		- not forward information from honest nodes (eclipse attack)
		- send invalid updates
			- messages that have duplicate IDs
			- send incorrect sequence numbers (equivocation attack)
			- 'forge' updates from another user
	- we want to prevent these from causing state divergence
	- however, this means that byzantine actors can still send a bunch of 'valid' updates that may be unwanted
	- imagine you sent a Google Docs link to a group of people
		- one of them is mucking around and inserting a bunch of images and removing information
		- these are all 'valid' operations as what everyone sees on their screen is still the same thing
- allow us to use CRDTs in untrusted/permissionless environments! huge win
- Kleppmann calls this BEC -- byzantine eventual consistency
- traditionally up until $f < \frac n 3$ as per [[thoughts/33% Impossibility Result]], most blockchains tout this
- but we can get a stronger property of $f < n$
- https://arxiv.org/pdf/2109.10554.pdf
	- Citation: Florian Jacob, Saskia Bayreuther, and Hannes Hartenstein. 2021. On Conflict-Free Replicated Data Types and Equivocation in Byzantine Setups
	- Operation-based CRDTs that provide inherent identity and inherent ordering of operations are equivocation-tolerant
	- A hash-chained directed acyclic graph as described in, is the only operation-based CRDT with non-commutative operations that provides SEC for any number of Byzantine faults, i.e., has fault tolerance n > f.
-  the cool part is that we don't need to modify the underlying CRDT itself, it can be fully retrofit on top of it
	- we can create a 'bft adapter' layer between the transport and application layer that is responsible
	- insert diagram
	- modify two places
		- generating IDs for operations
		- checking if an operation is valid
- it has two major components
	- hashes + signed message digests
	- causal broadcast with retry

### Hashes as IDs and Signed Message Digests
- hash graph + signed message digests -> can no longer fake operations
- essentially [[thoughts/content addressed storage]] for our operations
	- slightly weird
	- because ID is hash of the content, updating a node would inherently change its ID
	- really need to emphasize difference between inner representation and view
		- when we get the hash of a struct, we need to make sure it is constant -> this is just the handle into the position
		- NOT consistent with the hash of the content
			- if this was the case, things would change ID all the time!
		- so, what does this mean for BFT? can we send an update that contains different content but same hash?
			- yes unfortunately
			- how do we prevent this?
		- for lists, we never incorporate the delete operations into the data layer
			- show code snippet
			- delete op has its own ID
			- the actual op its deleting is referenced in the origin field
				- we essentially require original to be delivered first
				- then modify parent directly WITHOUT adding new node to list of ops
			- when we apply it, we just mark the origin as deleted
			- this is fine because delete can't be a causal origin for something else at an individual CRDT level (but we can do this at a document-level by tracking what messages we've received so far)
- technically this is enough if every node is connected to each other

### Causal Broadcast and Retries
- we just need to make sure that there is a way to get messages between honest nodes such that byzantine faulty nodes cant block it
- (diagram of connected component)
- the easiest way is an eager reliable causal broadcast
	- first time a node receives a message, re-broadcast to each other node
	- on receiving an 'out of order' message, save it in a queue until it is ready
	- occasionally retry
- (diagram of every node connected)
- potential optimizations
	- Reliable but expensive! $O(n^2)$ messages for $n$ nodes
	- consider the worst case scenario where all the honest nodes are in a line
	- we can reformulate this problem kind of like pull requests where nodes ask for updates from other nodes periodically
	- NB: kleppmann on hashgraph reconciliation

## A JSON CRDT
- how do we make a JSON crdt?
	- automerge and Yjs are both JSON crdts
	- normally, there is no fixed schema
	- its a bunch of nested crdts
		- values are LWW registers
		- lists are RGA lists
		- maps are lists of key value pairs
		- include an additional piece of metadata 
- making a BFT JSON CRDT is difficult because data types can change!
- example
	- think about A assigning a key a as a list and adds b as an element
	- B assigns a key as a map and adds an entry c
	- how do we resolve this? we use LWW but this is not ideal
	- we can somewhat abate this by using a fixed schema
- additional uhoh
	- id → hash of all the content
	- can we make this NOT include the path?
	- this can be included in signed digest check
	- content CANNOT depend on id
	- this includes path
	- basically, what if we move BFT checking to the root level
- using a fixed schema JSON-like datatype with the flexibility if we need it

### Putting it all together
- automatically derive nested crdts from programmer-defined data structures
- strong type safety
- clear boundary between bft and non-bft as distinguished by data types
- (TBD) compiling to wasm and building a transport layer

- finally, a word of warning
	- this is *not* a production ready library by any means
		- first and foremost for educational purposes but I think is a very solid PoC to demonstrate its potential
		- i do not consider myself to be proficient at rust so may have lots of bad code smells/mistakes sprinkled throughout (please do PR if you have any fixes/suggestions!)
		- really lacking in performance
	- the safety of building applications on top of CRDTs (especially BFT ones)
		- One might say that CRDTs provide Schrödinger consistency guarantees: they are guaranteed to be consistent only if they are not viewed
			- can help by baking in causal assumptions at the API level
			- https://arxiv.org/pdf/2210.12605.pdf
		- additionally, anything a real user could plausibly do, a byzantine actor can do
		- if you have a google doc, they can delete the doc

## Future directions for CRDTs
- theres a lot more to explore in the realm of CRDTs
- really think they are promising
- CALM conjecture
	- more projects like BLOOM which compile this away at the language level, preventing entire classes of consistency bugs at the type level 
	- rust for replicated data structures
- applications to games and other real-time things
	- GGPO or other interpolation (like perfect-cursors)