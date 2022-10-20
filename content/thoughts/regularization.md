---
title: "Regularization"
date: 2022-10-19
tags:
- seed
---

A method for controlling [[thoughts/complexity|complexity]]. Our main tools:
1. Model averaging (e.g. [[thoughts/Ensemble method|ensemble methods]])
2. Regularization (this)

When we have multiple models with the same training models, we should pick models that are *more conservative* (e.g. in [[thoughts/Linear Regression|linear regression]], pick smaller slope)

We should regularize $w_j$ so that they don't explode.
