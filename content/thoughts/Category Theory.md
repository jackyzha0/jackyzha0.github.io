---
title: Category Theory
date: 2023-10-14
tags:
  - seed
---
A lot of this is sourced from [Category Theory for Programming](https://arxiv.org/pdf/2209.01259.pdf)

The power of category theory arises from abstraction: by boiling down constructions to their essence, analogous situations can be formally identified using category theory.

In essence, a simple collection which can be thought of as a graph. Three components

1. A collection of objects (nodes)
2. A collection of morphisms (edges).
   - If $f$ is a morphism with source C and target B, we write $f: C \rightarrow B$
3. A notion of composition of morphisms.
   - If we have $g: A \rightarrow B$ and $f: B \rightarrow C$, they can be composed resulting in a morphism $f \circ g: A \rightarrow C$
   - Composition of morphisms needs to be associative. Typically applied right to left

## Categories

A category $\mathcal C$ consists of 
- A collection of objects, denoted by $\mathcal C_0$
- For any given $X, Y \in \mathcal{C}_0$, a collection of morphisms from $X$ to $Y$ denoted by $\text{hom}_{\mathcal{C}}(X,Y)$ or $\mathcal{C}(X,Y)$ or even $X \rightarrow Y$
- An identity morphism for each object $X \in \mathcal{C_0}$ such that $\text{Id}_X \in \text{hom}_{\mathcal{C}}(X,X)$
- A binary infix composition operator $\circ$ that takes $\text{hom}(Y,Z) \rightarrow \text{hom}(Y,Z) \rightarrow \text{hom}(X,Z)$ (this can be thought of as $X \rightarrow Y \land Y \rightarrow Z \implies X \rightarrow Z$)

See also: [[thoughts/functional programming|functional programming]], [[thoughts/Homotopy Theory|Homotopy Theory]]