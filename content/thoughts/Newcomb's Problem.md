---
title: "Newcomb's Problem"
date: 2022-10-28
tags:
  - seed
  - PHIL321A
---

|                 | $1M in Box 2 | $0 in Box 2 |
| --------------- | ------------ | ----------- |
| Take only box 2 | $1M          | $0          |
| Take both boxes | $1M + $1000  | $1000       |

## Background

There is a predictor that is 99% accurate is predicting whether people will only take box 2 or both boxes

## Procedure

- Predictor makes their prediction
- They put $1000 in box 1 (which you know)
- They put $0 in box 2 if they think you will take both and $1M if they think you will only take box 2
- Choose either both boxes or box 2

## Arguments

1. Two-box argument: dominance argument
   1. We can perhaps rule out the dominance argument because it only applies when states are independent of our actions (which is not the case here)
2. One-box argument: taking only box 2 almost guarantees $1M. Calculate using expected utility
   1. EU(both) = 0.01(1M + 1k) + 0.99(1k) = 11k
   2. EU(box 2) = 0.99(1M) + 0.01(0) = 990k
