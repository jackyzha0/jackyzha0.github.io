---
title: "Illumination"
date: 2023-03-29
tags:
- seed
---

## Lighting Models
How do we simulate how light moves in a [[thoughts/computer graphics]] scene?

This is difficult as at any point in 3D space, light of all wavelengths may be going in all directions. We can vastly simplify this by assuming there are 'only' three wavelengths, red green and blue. This is a reasonable assumption as these map cleanly to the three types of cone-cells in the human eye

- Local illumination (naive simulation, assumes single bounce)
	- This is ignorant of shadows (except simple self-shadowing)
- Global illumination (physical based, computes light transport based off of reflectance, luminance, roughness, etc.)
	- Bidirectional Reflectance Distribution Function (BRDF): Measure how much light is reflected in every outgoing direction for each possible incoming direction of light.

### Phong Model
$$\underbracket{I_a k_a}_{\textrm{ambient term}} + \sum_L \left( \underbracket{ I_L k_d(N\cdot L)}_{\textrm{diffuse term}} + \underbracket{I_L k_s(R \cdot V)^n}_{\textrm{specular term}} \right)$$

- Ambient term provides default minimal illumination
- Diffuse term provides basic lighting depending on the angle of the surface w.r.t. the incoming light direction
	- Intuition is that the brightness depends on the angle of the surface with respect to the incoming light direction. Sharper angles mean that the surface receives less light.
	- Normally also clamp and normalize $N \cdot L$ to between 0.0 and 1.0
- Specular (phong) term
	- Many surfaces are not perfect mirrors, but still reflect much light in the general direction of the reflected ray

- $N$ is the surface normal
- $L$ is the light direction
- $R$ is the reflected ray (normally $R = -L + 2 (N \cdot L) N$)
- $V$ is the viewing direction
- $n$ is the shininess constant (sometimes also $\alpha$)
- $I$ is a property of the scene
	- $I_a$ is the ambient light colour
	- $I_L$ is the intensity of the diffuse component of the light source $L$
- $k$ is a property of the surface
	- $k_a$ is the ambient colour of the surface
	- $k_d$ is the diffuse reflection constant
	- $k_s$ is the specular reflection constant

### Shadow Mapping
1. Render scene from the light source and store the distances in a z-buffer (normally called $d_{\textrm{shadowmap}}$)
2. Render scene from the camera view. If the depth computed at the fragment is greater than the depth in the shadowmap, it is in shadow

However, this model only produces hard shadows