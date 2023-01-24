---
title: "Computer Graphics"
date: 2023-01-23
tags:
- seed
---

## Coordinate Frames
Let $A$ be the original coordinate frame and $B$ be the target coordinate frame

$$\begin{bmatrix}x \\ y \\ 1 \end{bmatrix}_B = \begin{bmatrix}a & b & c \\ d & e & f \\ 0 & 0 & 1\end{bmatrix}\begin{bmatrix}x \\ y \\ 1\end{bmatrix}_A$$

Then:
- $\begin{bmatrix}a \\ d\end{bmatrix}$ is $i_A$, how to transform the $x$ coordinate
- $\begin{bmatrix}b \\ e\end{bmatrix}$ is $j_A$, how to transform the $y$ coordinate
- $\begin{bmatrix}c \\ f\end{bmatrix}$ is $O_A$, the translation of the entire frame

Overall,
- $x_B = x_A * a + y_A * b + c$
- $y_B = x_A * d + y_A * e + f$

The translation from $P_A$ to $P_B$ can be represented as $P_B = O_A + x_Ai_A + y_Aj_A$