---
title: "Notation"
date: 2023-03-18
tags:
  - seed
---

See also: [[thoughts/design goals]]

## Cognitive Dimensions of Notations

1. Abstraction Gradient (Efficiency)
   - Abstractions make it hard for first-time programmers to understand it
   - Abstractions are powerful for professional software developers to make easy to write, read, and maintain software
   - There should be a **gradual** increase in complexity ![[thoughts/images/abstraction-gradient.png|500]]
   - Languages with a high abstraction floor are called abstraction-hungry
   - Languages with a low abstraction ceiling are called abstraction-hating
2. Consistency
   - Coherence across the features of a language. It is easier to learn something if there are few exceptions to learn
3. Diffuseness (Learnability)
   - How many things there are to learn about a language
   - Number of keywords is a good approximation for diffuseness
4. Error-proneness
   - Bloch: make it _easy to do it right, hard to do it wrong_
   - The more guarantees you want to make about the program at compile time, the more work the programmer needs to do to get something running
5. Secondary Notation
   - Anything that is only there to help the programmer but does not affect what the code actually does
