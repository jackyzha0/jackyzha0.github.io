---
title: "Transformer Models"
date: 2022-12-07
tags:
  - seed
---

![[thoughts/images/transformer supremacy.png]]

# Inference
## Embedding

The smallest unit of understanding for a transformer is a *token*. This is usually a character (e.g. 'a', 'b', etc.) but can sometimes be longer.

The collection of all the tokens the model understands is its vocabulary. The vocabulary maps the token to its index:

- Token A: index 0
- Token B: index 1
- Token C: index 2

The first step of a transformer is turning the input text into the appropriate index in the vocabulary table.

Then, we use the token index to select the associated column in the **token embedding matrix** (e.g. the 3rd token index corresponds to the 3rd column of the token embedding matrix). The values of the token embedding matrix are vectors which we call the **token embeddings**. Let's call the dimensionality of this embedding $C_\text{embed}$.

Then, based on the index of the token in the input, we use it to select an appropriate column of the **position embedding matrix**. The dimensionality of this is the same as $C_\text{embed}$.

Both token embeddings and position embeddings are learned during training. As both embeddings have the same dimensionality, we simply perform an element-wise addition to get the **input embedding**.

Running this for all $n$ the input tokens gives us a matrix of size $[n,C_\text{embed}]$

## Layer Norm

# Comparison to other models
[[thoughts/convolutional neural networks|CNNs]] are less sequential, but take multiple steps to combine distant information. “Attention is all you need”: keep the attention, ditch the RNN/CNN. Uses “self-attention” layers to model relationship between all words in input

![[thoughts/images/transformers.png]]
