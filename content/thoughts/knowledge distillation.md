---
title: "Knowledge Distillation + Teaching"
date: 2021-08-29T00:20:50-04:00
tags:
  - sapling
---

[Source: Patterns in confusing explanations by _Julia Evans_](https://jvns.ca/blog/confusing-explanations/)

Heavily linked with [research debt](thoughts/research%20debt.md). What makes for effective [teaching](thoughts/teaching.md) and knowledge distillation?

- [Games](thoughts/game%20design.md) + interactive content (a [[thoughts/constructionist]] approach) > just reading
  - How can we create worlds for people to explore on their own? How do we give [[thoughts/agency]] back to students?
- How do we create content that caters for all levels of understanding? Possible relation to a thing in [project list](thoughts/idea%20list.md) where I thought about creating multi-level blogs

## Confusing Explanations

Top things to avoid in explanations and blog posts

1. **Inconsistent expectations of the reader's knowledge**: it might explain in great detail how a `for` loop works but the next paragraph immediately following implicitly assumes knowledge like how `malloc` works for example. In this case, nearly zero people will understand how `malloc` works without understanding how a `for` loop works. Pick 1 specific person and write for them
2. **Strained Analogies**: don't try too hard to write a Big Complex Analogy, otherwise more energy will be spent by the user trying to figure out what exactly are the similarities and differences between the two
3. Jargon without providing context
4. Unsupported information and statements
5. Explaining the "wrong" way to do something without saying it’s wrong
6. "What" without the "why"
