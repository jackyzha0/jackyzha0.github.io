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
6. Occlusion culling, object level

## Raytracing
1. For each pixel in the image
	1. Generate a ray
	2. For each triangle
		1. Test intersection of triangle and ray
	3. Compute colour based on closest object

## Coordinate Systems
Which way is up?
1. Y is up
2. Z is up

Can also either be (imagine both of the following where X is thumb, Y is pointer, Z is middle)
1. Left-handed
2. Right-handed

