---
title: "LSTM"
date: 2022-12-07
tags:
  - seed
  - CPSC340
---

Long short term memory (LSTM) models are variant of RNNs. They are modified to try to remember short-term $z$ and long-term dependencies $c$. The purpose of memory cells is to remember things for a long time.

LSTMs were the practical analogy of [[thoughts/convolutional neural networks]] for RNNs

- Forget gate $f_t$
  - If element ‘j’ of $f_t$ is 0, then we clear element $c_{tj}$ from the memory (set it to 0).
  - If it is 1, then we keep the old value.
  - “Given the input and previous activation, are the elements in memory still relevant?”
- Input gate $i_t$
  - If element ‘j’ of $i_t$ is 0, then we do not add any new information to $c_{tj}$ (no input).
  - If it is 1, then we “value” to the memory (where “value” is also a function of input and previous at ).
  - “Given the input and previous activation, should I write something new to memory?”
- Output gate $o_t$
  - If element ‘j’ of $o_t$ is 0, then we do not read value $c_{tj}$ from the memory (no output).
  - If it is 1, then we load from the memory.
  - “Given the input and previous activation, should I read what is in memory?”
