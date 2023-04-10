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
3. View volume clipping:
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

This is noticeably different from *path* tracing, which produces incredibly realistic looking renders that look indistinguishable from photos. Path tracing uses many rays per pixel with the colour averaged across them. At each interaction (bounce/reflection/etc.), the ray direction changes randomly with some distribution. However, this is significantly more expensive to compute.

### Distributed Ray Tracing
We can get more effects by adding more rays
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

See also: [[thoughts/NeRF]]