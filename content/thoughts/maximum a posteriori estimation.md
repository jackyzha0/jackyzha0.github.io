---
title: "Maximum a Posteriori (MAP) Estimation"
date: 2022-11-23
tags:
- seed
- CPSC340
aliases:
- MAP
---

Maximizes $\hat w \in \arg\max_w \{ P(w|D) \}$

Given our data, what is the model $w$ is the best model?

This is connected to [[thoughts/maximum likelihood estimation|MLE]] through [[thoughts/probability#Bayes' Theorem|Bayes' Rule]]:

$$P(w|D) = \frac{P(D|w)P(w)}{P(D)} \propto P(D|w)P(w)$$

Intuitively, $P(w)$ is accounting for how 'likely' this model is.