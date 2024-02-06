---
title: Overtone
date: 2024-02-04
tags:
  - seed
---
An overtone is any resonant frequency above the fundamental frequency of a sound. While the fundamental is usually heard most prominently, overtones are actually present in any pitch except a true sine wave. The relative volume or amplitude of various overtone partials is one of the key identifying features of timbre, or the individual characteristic of a sound.

If the fundamental frequency is $f$ then the overtones are $nf$ where $n \in \mathbb{N}^+$

| Frequency | Order | Name 1 | Name 2 |
| ---- | ---- | ---- | ---- |
| $f = 440$Hz | $n=1$ | fundamental tone | 1st harmonic |
| $2f=880$Hz | $n = 2$ | 2nd overtone | 2nd harmonic |
| $3f = 1320$Hz | $n = 3$ | 3rd overtone | 3rd harmonic |
| $4f=1760$Hz | $n = 4$ | 4th overtone | 4th harmonic |

![[thoughts/images/overtone.png|500]]

## Timbre
Both instruments can sound equally tuned in relation to each other as they play the same note, and while playing at the same amplitude level each instrument will still sound distinctively with its own unique tone color.

The concept of tristimulus originates in the world of [[thoughts/colour|colour]], describing the way three primary colors can be mixed together to create a given colour. By analogy, the musical tristimulus measures the mixture of harmonics in a given sound, grouped into three sections.

- The first tristimulus measures the relative weight of the first harmonic;
- the second tristimulus measures the relative weight of the second, third, and fourth harmonics taken together;
- and the third tristimulus measures the relative weight of all the remaining harmonics.

$$
T_1 = \frac{a_1}{\sum_{h=1}^Ha_h}
$$

$$
T_2 = \frac{a_2 + a_3 + a_4}{\sum_{h=1}^Ha_h}
$$

$$
T_3 = \frac{\sum_{h=5}^Ha_h}{\sum_{h=1}^Ha_h}
$$