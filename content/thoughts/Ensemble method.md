---
title: "Ensemble method"
date: 2022-09-23
tags:
- seed
- CPSC340
---

Ensemble methods are classifiers that have classifiers as input (and often have higher accuracy than regular input classifiers)
- Also called “meta-learning”.

Only works if the individual classifiers make independent errors

Models that uses the ensemble method:
1. [[thoughts/Random Forest|Random Forest]]

## Methods
1. Voting: take the mode of the predictions across the classifiers
2. Stacking: fit another classifier that uses the predictions as features