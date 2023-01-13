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