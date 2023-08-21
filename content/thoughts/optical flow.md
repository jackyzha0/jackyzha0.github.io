---
title: "Optical Flow"
date: 2021-12-24
tags:
  - seed
---

How do we determine how objects (and/or the camera itself) move in the 3D world? Difficulty comes as motion is geometric whereas optical flow is radiometric (about an origin)

See also: [aperture problem](thoughts/aperture%20problem.md)

### Constraint Equation

Let image intensity be denoted by $I(x,y,t)$. Then, applying chain rule, we obtain $\frac{dI(x,y,t)}{dt} = I_x\frac{dx}{dt} + I_y\frac{dy}{dt} + I_t$.

Let $u = \frac{dx}{dt}$ and $v = \frac{dy}{dt}$. Then $[u, v]$ is the 2D velocity space.

If we set $\frac{dI(x,y,t)}{dt} = 0$, then we get the **optical flow constraint equation**: $I_xu+I_yv + I_t=0$.

We assume constant brightness for this, meaning $I(x(t), y(t), t) = C$.

We measure each of the following:

- Spatial Derivative: $I_x = \frac{\partial I}{\partial x}$, $I_y = \frac{\partial I}{\partial y}$
  - Forward difference
  - Sobel filter
  - Scharr filter
- Optical Flow: $u = \frac{dx}{dt}$, $v = \frac{dy}{dt}$
  - We need to solve for this! (the unknown in the optical flow problem)
- Temporal Derivative: $I_t = \frac{\partial I}{\partial t}$
  - Frame difference

### Lucas-Kanade

A dense method to compute motion $[u,v]$ at every location in an image.

Where can you see movement that can be effectively computed? A corner!

Solve for $\mathbf v$ in $\mathbf v = (A^TA)^{-1}A^Tb$ where $\mathbf v$ is the 1-by-2 column matrix of $u$ and $v$. $A$ is the $n$-by-2 column matrix of $I_x(q_i)$, $I_y(q_i)$ partial derivatives evaluated at point $q_i$ ($A$ is actually the same matrix $C$ used in Harris corner detection). $b$ is the 1-by-$n$ matrix consisting of the negative of the temporal partial derivative for each point.

$$A = \begin{bmatrix}I_x(q_1) & I_y(q_1) \\ I_x(q_2) & I_y(q_2) \\ \vdots & \vdots \\ I_x(q_n) & I_y(q_n)\end{bmatrix} \qquad v=\begin{bmatrix}V_x \\ V_y\end{bmatrix} \qquad b = \begin{bmatrix}-I_t(q_1) \\ -I_t(q_2) \\ \vdots \\ -I_t(q_n)\end{bmatrix}$$
_Lucas-Kanade Method_

Assumptions

- Motion is slow enough that partial derivatives $I_x$, $I_y$, and $I_t$ are well-defined
- The optical flow constraint equation holds ($\frac{dI(x,y,t)}{dt} = 0$)
- Window size is chosen so that motion $[u,v]$ is constant in the window
- Window size is chosen so that the rank of $A^TA$ is 2 for the window (required inverse exists)

## Stereo

Computing depth from multiple images. Formulated as a correspondence problem: dtermine match between location of a scene point in one image and its location in another.

Disparity: $d = x - x' = \frac{bf}{Z}$ where $b$ is baseline, $x$ is distance from $O$ to epipolar line, and $x'$ is distance from $O'$ to epipolar line. $Z$ is distance from $b$ to target $X$.

Simple stereo algorithm

1. Rectify images (make epipolar lines horizontal)
   1. Rectified images have these properties:
      1. Image planes of cameras are parallel
      2. Focal points are at same height
      3. Focal lengths are the same
      4. Epiolar lines fall along the horizontal scan lines
2. For each pixel
   1. Find epipolar line
   2. Scan line for best match
   3. Compute depth from disparity

Naive approach, pixel-based often lacks content. What we can try is min SSD-error of a window-based approach.

Another approach is to match the edges (the zero-crossings) at different scales.

Note: Sum squared differences (SSD) is the same as Normalized Cross Correlation (NCC)
