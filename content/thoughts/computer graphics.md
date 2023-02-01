---
title: "Computer Graphics"
date: 2023-01-23
tags:
- seed
---

## Coordinate Frames
Let $A$ be the original basis and $B$ be the new basis

$$\begin{bmatrix}x \\ y \\ 1 \end{bmatrix}_B = \begin{bmatrix}a & b & c \\ d & e & f \\ 0 & 0 & 1\end{bmatrix}\begin{bmatrix}x \\ y \\ 1\end{bmatrix}_A$$

Then:
- $\begin{bmatrix}a \\ d\end{bmatrix}$ is $i_A$, how to transform the $x$ coordinate
	- $a$ is how much of $i_B$ we need to make one $i_A$
	- $d$ is how much of $j_B$ we need to make one $i_A$
- $\begin{bmatrix}b \\ e\end{bmatrix}$ is $j_A$, how to transform the $y$ coordinate
	- $b$ is how much of $i_B$ we need to make one $j_A$
	- $e$ is how much of $j_B$ we need to make one $j_A$
- $\begin{bmatrix}c \\ f\end{bmatrix}$ is $O_A$, the translation of the entire frame
	- $c$ is how much of $i_B$ we need to get from $O_B$ to $O_A$
	- $f$ is how much of $j_B$ we need to get from $O_B$ to $O_A$

The translation from $P_A$ to $P_B$ can be represented as $P_B = O_A + x_Ai_A + y_Aj_A$

## Transformation Matrices
- `Translate(x,y,z)`
	- $$\begin{bmatrix}x' \\ y' \\ z' \\ 1 \end{bmatrix} = \begin{bmatrix}1 & & & a \\ & 1 & & b \\ & & 1 & c \\ & & & 1\end{bmatrix}\begin{bmatrix}x \\ y \\ z \\ 1\end{bmatrix}$$
- `Rotate(z,theta)`
	- $$\begin{bmatrix}x' \\ y' \\ z' \\ 1 \end{bmatrix} = \begin{bmatrix}\cos \theta & -\sin \theta & \\ \sin \theta & \cos \theta & \\ & & 1 & \\ & & & 1 \end{bmatrix}\begin{bmatrix}x \\ y \\ z \\ 1\end{bmatrix}$$
- `Scale(x,y,z)`
	- $$\begin{bmatrix}x' \\ y' \\ z' \\ 1 \end{bmatrix} = \begin{bmatrix}a & & & \\ & b & & \\ & & c & \\ & & & 1\end{bmatrix}\begin{bmatrix}x \\ y \\ z \\ 1\end{bmatrix}$$