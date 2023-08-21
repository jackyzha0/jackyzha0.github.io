---
title: "Ensemble method"
date: 2022-09-23
tags:
  - seed
  - CPSC340
---

Ensemble methods are classifiers that have classifiers as input (and often have higher accuracy than regular input classifiers). This is also called “meta-learning” and it **only works if the individual classifiers make independent errors**

See also: [[thoughts/emergent behaviour]]

## Boosting/Stacking

Improves training error of classifiers with high $E_{train}$

Models that use the boosting ensemble method:

1. [[thoughts/XGBoost]] (regularized regression trees)

## Averaging/Voting

Improves approximation error of classifiers with high $E_{approx}$

Models that uses the averaging ensemble method:

1. [[thoughts/Random Forest|Random Forest]]

### Methods

1. Voting: take the mode of the predictions across the classifiers
2. Stacking: fit another classifier that uses the predictions as features
