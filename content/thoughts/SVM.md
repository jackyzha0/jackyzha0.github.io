---
title: "Support Vector Machine"
date: 2022-10-28
tags:
  - seed
  - CPSC340
---

An SVM is just Hinge loss with L2-regularization

$$f(w) = \sum_{i=1}^n \max\{0, 1-y_iw^Tx_i\}$$

They can also be viewed as 'maximizing the margin':

![[thoughts/images/maximizing margin.png]]
