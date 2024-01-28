---
title: "Complexity"
date: 2021-12-24
tags:
  - seed
---

## Measures of Complexity

- [Vapnik–Chervonenkis dimension](https://en.wikipedia.org/wiki/Vapnik%E2%80%93Chervonenkis_dimension): cardinality of the largest set of points that a binary classification algorithm can learn.
- [Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity): length of the shortest computer program that produces the object as output. (see also [[thoughts/Gall's law|Gall's Law]])
- Essential Complexity: irreducible, non-eliminable part of the system
- Accidental Complexity: everything else to make it work

## Making Simple Software

[Source talk by pvh](https://vimeo.com/780013486)

- Why is example code normally so simple? Well, it lives in an ideal world. It only cares about the happy path. **Defensive code is complex**
- Vigilance works for small systems... but not large complex ones!
  - Type systems off-load mental state and assumptions about the code and make it explicit

## Essential vs Accidental Complexity

- Essential complexity is inherent in the problem domain of the application.
- Accidental complexity arises only because of limitations of our tooling.

Unfortunately, this distinction is also flawed, because boundaries between the essential and the accidental shift as our tooling evolves

One of the best tools we have for managing complexity is abstraction. A good abstraction can hide a great deal of implementation detail behind a clean, simple-tounderstand façade