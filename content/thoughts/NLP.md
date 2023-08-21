---
title: "NLP"
date: 2022-04-11
tags:
  - seed
aliases:
  - natural language processing
---

See also: [[thoughts/LLMs]]

## Chain of Thought Prompting

[ArXiv Link](https://arxiv.org/pdf/2201.11903.pdf)

- Flat scaling curves—simply increasing model scale does not lead to substantive performance gains
- Chain of thought prompting facilitating multistep reasoning in large language models
  - The intuition is that a chain of thought allows language models to decompose a multi-step problem into intermediate steps that are solved individually, instead of solving an entire multi-hop problem in a single forward pass
  - Another intuition behind chain of thought reasoning is that it allows the model to spend more computation (i.e., intermediate tokens) solving harder problems (though later sections of the paper rule this out as the primary factor for performance improvements)
  - Notably, chain of thought prompting only does better than standard prompting only at the scale of ~100B params
- Really cool side-effect is more [[thoughts/explainability|explainable]] decision making processes
  - Fully characterizing a model's computations that support an answer remains an open question

See: [[thoughts/OODA]]
