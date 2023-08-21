---
title: "OODA"
date: 2023-03-18
tags:
  - seed
  - pattern
---

OODA stands for observe, orient, decide, act. Initially developed by a military strategist, it is now applied to understand commercial operations and [[thoughts/information behaviour]]

### Wilson's Information-seeking Model

![](/thoughts/images/wilson.png)

Perceived information need is bounded in a [context](thoughts/context.md) (column 1). This perceived need may not be enough if there isn't enough to activate actions if the stress isn't high enough (column 2). Intervening variables may become either barriers to or in support of information seeking activities (column 3). The actual activation mechanism itself is driven by social learning theory.

8 main types of information activities

1. Starting: initial info-gathering (e.g. searching or asking colleagues)
2. Chaining: going down the rabbit-holes found in Starting
3. Browsing: casual search for info in different sources (generally non-intentional)
4. Differentiating: rough grouping and separating of different identities/origin of sources
5. Monitoring: keeping updated with developments
6. Extracting: finding relevant materials in source
7. Verifying: making sure info is correct
8. Ending: final search

## LLMs

[Source](https://arxiv.org/abs/2210.03629)

Instead of asking GPT to simply do smart-autocomplete on your text, you prompt it to respond in a thought/act/observation loop. So you ask GPT to respond like:

> Thought: Let’s think step by step. I need to find out X and then do Y.
> Act: Search Wikipedia for X
> Observation: From the Wikipedia page I have learnt that …
> Thought: So the answer is …

And it is allowed to repeat as many times as necessarily, iterating towards its goal.

This allows [[thoughts/LLMs|LLMs]] to go from a constant number of compute per token (a single forward pass) to effectively unbounded computation. This feels significantly closer to how humans process information, where some queries take more brain power to mull over the possibility space rather than responding directly.
