---
title: "Fair Betting Quotient (FBQ)"
date: 2022-10-21
tags:
  - seed
  - PHIL321A
aliases:
  - FBQ
---

Your fair betting quotient (FBQ) for A is p if you think that the following is a fair bet (you are willing to take either side):

- If A is true, you win $(1 - p)S$
- If A is not true, you lose $pS$

Betting table is different from [[thoughts/Decision theory|decision tables]]. Columns are different bets.

| A   | Bet for A | Bet against A |
| --- | --------- | ------------- |
| T   | $(1-p)S$  | $-(1-p)S$     |
| F   | $-pS$     | $pS$          |

Suppose a set of credences (or FBQ’s) is incoherent. We can always construct a [[thoughts/Dutch Book]]. Have the agent bet for propositions with credences (or FBQs) that are too high, and against propositions with credences (or FBQs) that are too low.
