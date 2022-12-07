---
title: "Transformer Models"
date: 2022-12-07
tags:
- seed
---

![[thoughts/images/transformer supremacy.png]]

## Attention
Each decoding can use hidden state from each encoding step. Used to re-weight during decoding to emphasize important parts. Can be seen as a variant of skip-connections.

At each time step:
1. Prepare inputs (encoder hidden states from previous input)
2. Score each hidden state
3. Softmax the scores and multiply each input by its score
4. Sum up all the vectors

Context vector is usually appended to decoder’s state when going to next layer

This is a single-head attention mechanism. Most transformers use multiple heads to attend to different aspects of the input (e.g. for text, one focuses on grammar, another may focus on counts of things)

## Transformers
CNNs are less sequential, but take multiple steps to combine distant information. “Attention is all you need”: keep the attention, ditch the RNN/CNN. Uses “self-attention” layers to model relationship between all words in input

![[thoughts/images/transformers.png]]