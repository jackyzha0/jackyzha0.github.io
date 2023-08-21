---
title: "Arrow's Impossibility Theorem"
date: 2022-11-25
tags:
  - seed
---

Related: [[thoughts/Social Contract Theory#Social Choice|social choice]]

Assume there is more than one individual, and there are at least three distinct social states. Then there is no SWF that meets the following four conditions:

1. Non-dictatorial: no individual is decisive
2. Ordering: must produce social preference orderings which are complete, asymmetric and transitive (see also: [[thoughts/utility#Interval Scales]])
3. [[thoughts/Pareto optimality|Pareto condition]]: If every voter prefers alternative X over alternative Y, then the group prefers X over Y.
4. Independence of Irrelevant Alternatives (IIA): If every voter's preference between X and Y remains unchanged, then the group's preference between X and Y will also remain unchanged

Unstated: Arrow also requires the unrestricted domain assumption (U)

How can we get around this?

- Sen says that we should give up liberalism (the Pareto condition). He argues that liberalism + Pareto leads to a contradiction in ordering axioms
- Nozick's solution is to give up the unrestricted domain assumption (U). Liberalism excludes certain kinds of states (‘private’ alternatives) from social scrutiny in advance.

## Similarities to Group Membership

Rough thoughts on how we might prove decentralized [[thoughts/access control]] to be impossible.

Suppose we encode access in terms of some function $A_{i,j}$ where $A_{i,j}$ is true if subject $i$ considers $j$ to be in the group and false otherwise.

A social state $S$ for some collection of individuals $G$ is $i \in G$ such that $A_{j,i} \forall j \in G$.

We suppose there is some function that takes in individual preference orderings (what it thinks the group membership currently looks like) and produces a group preference ordering (what the true group membership is). This is normally called the SWF.

Some properties of said SWF:

- Non-dictatorial: we don't want a single admin who has power to dictate who is in the group. If this were to happen, we couldn't remove the admin if they were compromised
- Intention-preserving: If every voter prefers alternative X over alternative Y, then the group prefers X over Y.
  - Strong requirement is needed. Consider a weaker version: If the majority of voters prefers alternative X over alternative Y, then the group prefers X over Y
  - This may not work when we have a Sybil actor that can add new accounts to overwhelm the majority
- ...anything else I'm missing?

If we can show that these properties are equivalent to the Arrow Axioms, then there may be no way to come to a singular group where all members agree.
