---
title: "Fundamental Tradeoff"
date: 2022-12-08
tags:
  - seed
  - CPSC340
aliases:
  - fundamental trade-off
---

The fundamental tradeoff has two parts:

1. How small you can make the training error
2. How well training error approximates the test error.

$$\begin{aligned} E_\textrm{test}&= E_\textrm{approx} + E_\textrm{train} \\ &= (E_\textrm{test} - E_\textrm{train}) + E_\textrm{train}\end{aligned}$$

Generally,

- Training error goes down when the model gets more complicated, however
- Approximation error goes up when the model gets more complicated
