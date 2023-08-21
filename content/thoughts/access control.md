---
title: "Access control"
date: 2022-08-16
tags:
  - seed
---

> Access control systems guarantee that every action performed adheres to a set of rules, which can be dynamically changed at runtime.

In traditional systems, this guarantee can be enforced by relying on a central server. But this becomes a lot more difficult for eventually [[thoughts/consistency|consistent]] systems (e.g. [[thoughts/CRDT|CRDTs]])

There is a common perception of ACL systems and capability systems as merely alternative perspectives on Lampson’s access matrix:

|        | Asset 1                   | Asset 2                   | File | Device |
| ------ | ------------------------- | ------------------------- | ---- | ------ |
| Role 1 | read, write, execute, own | execute                   | read | write  |
| Role 2 | read                      | read, write, execute, own |      |        |

![[thoughts/images/acl vs capability.png]]

### Access Control Lists

An Access Control list (sometimes called ACL) is a data structure containing entries that specify an individual user or group’s rights to specific system objects. Generally good when the groups of individuals remains relatively static and objects change a lot.

In the Lampson's access matrix, they are normally seen as the columns.

### Capabilities

The capability list (sometimes called C-list) of a user or a process or domain is a list of rights that it has on the various objects. Generally good when groups of individuals changes a lot and objects remain relatively static.

In the Lampson's access matrix, they are normally seen as the rows.

Capabilities provide much better support for least-privilege operation and for avoiding confused deputy problems

From _[Capability Myths Demolished](https://srl.cs.jhu.edu/pubs/SRL2003-02.pdf)_:

1. Equivalence Myth: access control list systems and capability systems are formally equivalent
   - No description of any security mechanism is complete without a specification of how access relationships are allowed to evolve over time
   - False as shown in descriptions above
2. Confinement Myth: capability systems cannot enforce confinement
   - The argument assumes that subjects can transmit capabilities anywhere they can transmit data, which is not the case in most capability systems.
   - We can get around this by limiting connections between objects
     - In partitioned or type-enforced capability systems such as KeyKOS, W7, EROS, or E, capabilities and data are distinguished by the kernel or runtime
   - No capability transfer can introduce a new connection between two objects that were not already connected by some path
   - Suppose, for example, we decide not to trust Bob. To prevent Alice from delegating to Bob, we simply refrain from giving Alice access to Bob.
3. Irrevocability Myth: capability-based access cannot be revoked
   - It is true that capabilities themselves are not literally revocable.
   - Further, we know that the capability alone is sufficient to establish access to the resource.
   - However, we can create a pair of forwarders, F and R to get around this. Of this pair, we may call F the forwarding facet, and R the revoking facet. Any messages sent to F get forwarded through R to Carol, so Bob may use F as if it were Carol. This works as long as inter-object interactions are mediated by messages, and messages are handled generically, so that a reusable mechanism can forward any message. ![[thoughts/images/capabilityrevokation.png]]
   - When Alice wants to revoke Bob’s access to Carol, she invokes R, telling it to stop forwarding. R then drops its pointer to Carol, and F becomes useless to Bob.

Ambient Authority:

- We will use the term ambient authority to describe authority that is exercised, but not selected, by its user.
- The corresponding analogy is to imagine a world with doors but without keys. When a person walks up to a door, the door magically opens if it deems the person worthy.
- For example, [[thoughts/Unix|Unix]] filesystem permissions constitute an ambient authority mechanism, because the caller of a function such as `open()` does not choose any credentials to present with the request; the request merely succeeds or fails

Confused Deputy Problems:

- A deputy is a program that must manage authorities coming from multiple sources.
- A confused deputy is a deputy that has been manipulated into wielding its authority inappropriately.
- A big part of preventing confused deputy problems is by removing ambient authority
  - If the authority to write to BILL were not ambient, then the compiler could hold one key to BILL for the purpose of writing billing information, and accept another key from the user for the purpose of writing debugging information. Then, as long as the compiler uses each key for its intended purpose, the confused deputy problem cannot occur.
