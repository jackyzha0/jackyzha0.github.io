---
title: "Social Choice Problem"
date: 2022-12-02
tags:
  - seed
  - PHIL321A
---

1. How do we aggregate many individual preference orderings into a single group or social preference ordering; or,
2. How can rational individuals make rational choices as a group

We can define a Social welfare function (SWF) combining individual preference orderings (over social states) into a social preference ordering (over those same states).

## Initial Attempts

1. Use majority rule to aggregate individual preferences into group preferences.
   - **Problem**: The voting paradox. Individual preferences may be transitive but the group preference _can_ be cyclic when we do a majority vote. The violates [[thoughts/probability#Kolmogorov Axioms|a Klmogorov Axiom]] about ordering
2. Use maximum total utility to determine group preference
   - Different scales (equivalent vNM scales) yield a different social preference ordering
3. Just use ordinal rankings
   - [[thoughts/Arrow's Impossibility Theorem]]

Definitions:

1. A group $D \in G$ is decisive with respect to some pair of social states $(a,b)$ iff $a \succ b$ by the whole group $G$ whenever everyone in $D$ prefers $a \succ b$
2. A group is decisive if it is decisive over all pairs of social states

See: [[thoughts/Arrow's Impossibility Theorem]]
