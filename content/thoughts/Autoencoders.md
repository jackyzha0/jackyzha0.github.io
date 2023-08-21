---
title: "Autoencoders"
date: 2022-12-07
tags:
  - seed
  - CPSC340
---

Autoencoders are neural networks with same input and output. They are [[thoughts/latent-factor model|latent-factor models]]

Architecture:

- Includes a bottleneck layer: with dimension $k$ smaller than input $d$.
- First layers “encode” the input into bottleneck.
- Last layers “decode” the bottleneck into a (hopefully valid) input
  - Can be used as a [[thoughts/generative models|generative model]]!

Applications

- Superresolution
- Noise removal
- Compression

Relationship to principal component analysis ([[thoughts/latent-factor model|PCA]]):

- With squared error and linear network (no non-linear $h$), equivalent to PCA.
- Size of bottleneck layer gives number of latent factors $k$ in PCA.
