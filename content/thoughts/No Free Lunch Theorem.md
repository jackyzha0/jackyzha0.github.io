---
title: "No Free Lunch Theorem"
date: 2022-09-19
tags:
  - seed
  - CPSC340
---

> All optimization algorithms perform equally well when their performance is averaged across all possible problems.

There is no "best" machine learning model. This question is like asking which is “best” among “rock”, “paper”, and “scissors”.

## Caveat

The proof of the no-free-lunch theorem assumes any map from $x_i$ to $y_i$ is equally likely.

This may not be true in the real world: some datasets are more likely than others. Model A really could be better than model B on every real dataset in practice.
