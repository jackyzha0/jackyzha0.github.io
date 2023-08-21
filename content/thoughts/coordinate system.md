---
title: "Coordinate systems"
date: 2023-04-08
tags:
  - seed
---

## Homogenous

We add a new coordinate $h$ (sometimes also $w$). To convert homogenous coordinates $(x,y,z,h)$ back into Cartesian coordinates, we divide through by $h$: $(\frac x h, \frac y h, \frac z h)$

### As groundedness

If we interpret $h$ as groundedness, it measures how 'translateable' it is:

- $h=0$ for directions/vectors
- $h=1$ for positions
- $h \not \in \{ 0, 1\}$ need to be divided by $h$ to come back into real space

### As depth

We can also interpret $h$ as camera depth.

What makes something look 3D?

- Relative size (far objects are smaller)
- Perspective (far objects converge on the origin)
- Motion parallax (far objects move slowly)

Dividing through $h$ gives us these three effects.

In order to make distant objects appear smaller and closer to the center of the screen, we use a coordinate system with $(0, 0, 0)$ at the center of the screen (this is done in the [[thoughts/computer graphics#Transformations|CCS]]).

This effectively projects onto the 'near' plane

![[thoughts/images/homogenous.png|300]]

## Barycentric Coordinates

Mostly used for interpolation. Given values known at the vertices (e.g. depth, colour, texture, surface normals), we wish to linearly interpolate their values for the interior pixels

Barycentric coordinates can be seen as a weighted combination of vertices.

- $P = \alpha P_1 + \beta P_2 + \gamma P_3$
- $\alpha + \beta + \gamma = 1$
- $0 \leq \alpha, \beta, \gamma \leq 1$

To interpolate, $v = \alpha v_1 + \beta v_2 + \gamma v_3$

We use barycentric coordinates instead of screen space coordinates because the mid-point in screen-space may _not_ be the midpoints along the real line/object.

Calculating the weighted value $\alpha$ for the vertex $P_1$:

1. Write an explicit line equation for the edge opposite the vertex
2. Convert it into an implicit line equation ($F_{2,3}$ in this example, line connecting $P_2$ and $P_3$)
3. Evaluate the implicit line equation at the vertex, let this be $k_1$
4. $\alpha(P) = F_{2,3}(P) / k$

## Spherical

$\theta$ represents the polar angle (angle from the vertical $z$ axis) and $\phi$ represents the azimuthal angle (angle from the $x$ axis)

![[thoughts/images/spherical coordinate system.png]]
