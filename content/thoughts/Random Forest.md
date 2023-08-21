---
title: "Random Forest"
date: 2022-09-23
tags:
  - seed
  - CPSC340
---

Example of an [[thoughts/Ensemble method|Ensemble method]]. They are non-parametric

They work by taking a vote from a set of deep [[thoughts/decision tree|decision trees]]. Two key ingredients to help ensure the deep decision trees make independent errors

1. Bootstrap sampling: generate different "versions" of your dataset
   - Usually done by sampling with replacement $n$ times, this creates a bootstrap sample
   - On average, this maintains roughly the same distribution as the original
2. Random Trees: grow decision trees that incorporates some randomness
   - Randomly sample a small number of possible features (typically $\sqrt d$)
   - Only consider these random features when searching for the optimal rule so splits will tend to use different features in different trees
