---
title: "Distributed Systems"
date: 2022-05-03
tags:
  - seed
---

A distributed system can be defined as multiple computers (nodes) communicating via a network trying to achieve some task together.

## Martin Kleppmann's Course

Notes from [Martin Kleppmann's Distributed Systems Course](https://www.youtube.com/watch?v=UEAMfLPZZhE&list=PLeKd45zvjcDFUEv_ohr_HdUFe97RItdiB). He has a set of [course notes on his teaching site as well](https://www.cl.cam.ac.uk/teaching/2122/ConcDisSys/dist-sys-notes.pdf).

> How do we share data amongst different concurrent entities?

- Recommended Reading
  - "Distributed Systems" by van Steen & Tanenbaum: Implementation detail heavy, more practical
  - "Introduction to Reliable and Secure Distributed Programs" (2nd ed) by Cachin, Guerraoui & Rodrigues: Theory heavy
  - "Designing Data-Intensive Applications" by Kleppmann: More oriented toward distributed databases
  - "Operating Systems: Concurrent and Distributed Software Design" by Addison-Wesley: links to Operating Systems

### Why distributed?

- Things are inherently distributed: sending a message from your phone to your friend's phone
- Reliability: even if one node fails, the system as a whole keeps functioning
- Performance: get data from a nearby node rather than one centralized server halfway around the world
- Solve bigger problems: some amounts of data can't fit on just one machine

### Why _not_ distributed?

- Communication may fail (and we might not even know it has failed)
- Processes may crash (and we might not know)
- All of this can happen nondeterministically
- Thus we need to think about [[thoughts/fault tolerance|fault tolerance]]

### Notes

- [[thoughts/RPC|RPCs]]
- [[thoughts/fault tolerance|Fault Tolerance]]
  - See [[thoughts/fault tolerance#Two Generals Problem|Two Generals Problem]] and [[thoughts/fault tolerance#Byzantine Generals Problem|Byzantine Generals Problem]]
- [[thoughts/system model|System models]]
- [[thoughts/clocks|Physical and Logical Time]]
- [[thoughts/causality|Message ordering and Causality]]
- [[thoughts/message broadcast|Message broadcast]]
- [[thoughts/replication|Replication]]
- [[thoughts/quorum|Quorum]]
- [[thoughts/consensus#Distributed Systems|Consensus]]
- [[thoughts/consistency|Consistency]]
