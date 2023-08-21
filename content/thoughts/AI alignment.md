---
title: "AI Alignment"
date: 2022-12-08
tags:
  - seed
---

How do we get [[posts/agi|AI systems]] to align with real human [[thoughts/social contracts|social contracts and values]]? Or, in more mathematical terms, how do we make [[thoughts/quantization|legible]] our soft and squishy human values into hard mathematical formula and policy?

Mostly sourced from [OpenAI's approach to alignment](https://aligned.substack.com/p/alignment-optimism)

- RLHF: [Summarization from human feedback](https://openai.com/blog/learning-to-summarize-with-human-feedback/) was really the first convincing proof-of-concept that RLHF works on language models and that you can optimize goals that are fuzzy and somewhat ambiguous.
  - How do we optimize for goals that are not easily [[thoughts/quantization|quantizable]]?
- [InstructGPT](https://openai.com/blog/instruction-following/) demonstrated that there is a real “alignment overhang” in language models that wasn’t very hard to access. The amount of human feedback needed to achieve an astounding 100x improvement was pretty moderate and achievable: ~50,000 comparisons, and ~300,000 episodes of training. That number is so small that we could actually have humans hand-label every training episode
- Using models to augment rather than replace. Helping humans find 50% more flaws that they would have unassisted with a model that isn't superhuman on a task that isn’t hard for humans is a surprisingly strong result, showing that our model can basically already add a lot of value for feedback assistance.
