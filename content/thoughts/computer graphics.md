---
title: "Computer Graphics"
date: 2023-01-23
tags:
  - seed
---

See also: [[thoughts/rendering]], [[thoughts/imaging]], [[thoughts/illumination]], [[thoughts/colour]], [[thoughts/GLSL]]

## Coordinate Frames

Let $A$ be the original basis and $B$ be the new basis

$$
\begin{bmatrix}x \\ y \\ 1 \end{bmatrix}_B = \begin{bmatrix}a & b & c \\ d & e & f \\ 0 & 0 & 1\end{bmatrix}\begin{bmatrix}x \\ y \\ 1\end{bmatrix}_A
$$

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

### Transformations

1. Object Coordinate System: modeling transformation
2. World Coordinate System: viewing transformation
3. Viewing Coordinate System (Camera): projection transformation
4. Clipping Coordinate System: /h
5. Normalized Device Coordinate System (NDCS): viewport transformation
6. Device Coordinate System

In a scene hierarchy, the Camera Coordinate Frame ($F_{VCS}$) is generally the root.

Transformations in scene graphs are written right to left, starting with source frame and ending with target frame.

## Viewing Transformation

- Defined using
  - eye point
  - target point
  - up vector

$$
\vec k = \frac{P_{eye}-P_{ref}}{\lVert P_{eye}-P_{ref} \rVert}
$$

$$
\vec i = \frac{V_{up} \times \vec k}{\lVert V_{up} \times \vec k \rVert}
$$

$$
\vec j = \vec k \times \vec i
$$

$$
M_{cam} = \begin{bmatrix}
i_1 & j_1 & k_1 & P_{eye1} \\ 
i_2 & j_2 & k_2 & P_{eye2} \\
i_3 & j_3 & k_3 & P_{eye3} \\
0 & 0 & 0 & 1
\end{bmatrix}
$$

$$
M_{view} = M_{cam}^{-1}
$$

