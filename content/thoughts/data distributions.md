---
title: "Data Distributions"
date: 2021-08-18T20:19:51-07:00
tags:
  - sapling
  - pattern
---

[[thoughts/machine learning|Machine Learning]] and [AI Systems](posts/agi.md) excludes the tail ends of the distributions. Synthetic/generative/federated models suck at these. And, for a lot of industries, the most interesting cases _are_ outliers (esp. in medical AI)

This is where minorities live, and the result is that most ML systems end up reproducing existing systems of power (re: [To live in their Utopia](thoughts/To%20Live%20in%20their%20Utopia.md), [Matthew Effect](thoughts/Matthew%20Effect.md))

## Overfitting

Does “not trying to overfit” mean we perform badly on some groups?

- If you have 99% “Group A” in your dataset, model can do well on average by only focusing on Group A
- Treat the other 1% as outliers
- Doing well at test-time might mean ignoring outliers and minorities

## Contextual Data

Should data and [information](thoughts/information.md) be contextualized all the time?

1. [Context](thoughts/context.md) is important when dealing with historical data. Knowing why certain decisions were made is extremely important
2. We want data to be anonymized to a certain extent. Exposing patient data, for example, is a huge risk.

How do we choose what context to include and what not to include?
