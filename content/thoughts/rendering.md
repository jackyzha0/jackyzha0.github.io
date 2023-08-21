---
title: "Rendering"
date: 2023-01-11
tags:
  - seed
---

## Projective Rendering

1. For each triangle of the object/mesh
   1. Project its vertices onto the screen
   2. For each pixel in the triangle on the screen
      1. Compute the colour

Utilizes parallelism to take advantage of SIMD (GPUs are fast at this!)

- Vertex shader: run for every vertex to transform it to normalized screen space
- Fragment Shader: run for every pixel to compute the pixel colour

### Visibility Methods

How do we avoid rendering things that don't contribute to the final image?

1. View volume culling, vertex level: Cull iff all vertices are outside w.r.t to a single view volume plane
2. View volume culling, object level: Cull iff distance between center of bounding sphere and any view volume plane is greater than the radius of the bounding sphere
3. View volume clipping: add/modify vertices so that they are all within bounds
4. Backface culling: we never see the backside of the object, cull if $P_{eye}$ is below the plane of the polygon
5. Occlusion culling, pixel level: use a z-buffer to determine depth at every pixel, only render if what you are about to render is closer (lower z) than what is currently in the buffer
6. Occlusion culling, object level: build a bounding box and do a "virtual render" of the box. If no pixels passed the z-buffer then cull the whole object

## Raytracing

### Classical

1. For each pixel in the image
   1. Generate a single ray from eye to the pixel
   2. `P :=` Intersection of closest triangle with ray
   3. `colour_local :=`
      1. `shadow` if not visible
      2. `Phong(N, L, rayDir)` if visible
   4. `colour_reflect := raytrace(R)` if reflective
   5. `colour_transmit = raytrace(T)` if refractive
   6. `colour = k_local * colour_local + k_reflect * colour_reflect + k_transmit * colour_transmit`

We stop ray tracing if

- Ray hits a diffuse object
- Ray exits the scene
- Exceeding some maximum recursion depth
- Contribution to final pixel colour will be too small

Because it only uses a single ray, most shadows are pretty hard.

This is noticeably different from _path_ tracing, which produces incredibly realistic looking renders that look indistinguishable from photos. Path tracing uses many rays per pixel with the colour averaged across them. At each interaction (bounce/reflection/etc.), the ray direction changes randomly with some distribution. However, this is significantly more expensive to compute.

### Path tracing

We can get more effects by adding more rays. Each path can be thought of as a random walk of light through the scene, with each bounce determined probabilistically based on the material properties of the objects and the lighting environment.

- Anti-aliasing: multiple samples per pixel
- Motion blur: multiple samples over time
- Depth-of-field (lens blur): multiple samples over lens aperture
- Glossy reflections: multiple reflected rays with random distribution
- Soft shadows: multiple shadow rays for area light sources

## Coordinate Systems

Which way is up?

1. Y is up
2. Z is up

Can also either be (imagine both of the following where X is thumb, Y is pointer, Z is middle)

1. Left-handed
2. Right-handed

See also: [[thoughts/NeRF]], [[thoughts/coordinate system]]

## Intersection Tests

### Line-plane

- Plane equation: $F(P) = \vec N \cdot \vec P + D = 0$
  - $\vec N = (P_2 - P_0) \times (P_1 - P_0)$, cross any three points on the plane that are not colinear
  - $\vec P$ is any point
  - $D = - N \cdot P_1$ or $D = -N \cdot P_2$
- Line equation: $P(t) = P_a + t(P_b - P_a)$
- Plug line equation into plane equation and solve for $t$

### Ray-Triangle

### Ray-Sphere

- Sphere equation: $F(P) = r^2 - (x - C.x)^2 - (y - C.y)^2 - (z - C.z)^2$
  - Each of $x$, $y$ and $z$ are equations of the form $x(t) = P_{ax} + t(P_{bx} - P_{ax})$
  - $C$ is the center point of the sphere
- Take smallest positive $t$ value
