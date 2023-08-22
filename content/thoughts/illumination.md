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
$$
\underbrace{I_a k_a}_{\textrm{ambient term}} + \sum_L \left( \underbrace{ I_L k_d(N\cdot L)}_{\textrm{diffuse term}} + \underbrace{I_L k_s(R \cdot V)^n}_{\textrm{specular term}} \right)
$$

- Ambient term provides default minimal illumination
- Diffuse term provides basic lighting depending on the angle of the surface w.r.t. the incoming light direction
  - Intuition is that the brightness depends on the angle of the surface with respect to the incoming light direction. Sharper angles mean that the surface receives less light.
  - Normally also clamp and normalize $N \cdot L$ to between 0.0 and 1.0
- Specular (phong) term

  - Many surfaces are not perfect mirrors, but still reflect much light in the general direction of the reflected ray

- $N$ is the surface normal
- $L$ is the light direction
- $R$ is the reflected ray (normally $R = -L + 2 (N \cdot L) N$, in [[thoughts/GLSL]]: `R = reflect(-L, N)`)
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

## Gouraud Shading

Gouraud shading, named after Henri Gouraud, is an interpolation method used in computer graphics to produce continuous shading of surfaces represented by polygon meshes.

Lighting computations based on a reflection model, e.g. the Phong reflection model, are then performed to produce colour intensities at the vertices. For each screen pixel that is covered by the polygonal mesh, colour intensities can then be interpolated from the colour values calculated at the vertices.

However, highly localized lighting effects (such as specular highlights, e.g. the glint of reflected light on the surface of an apple) will not be rendered correctly

## Caustics

Caustics are patterns of light that form when a light source is reflected or refracted by a curved surface.

1. Sunlight reflecting off a swimming pool: When sunlight enters a swimming pool, it is refracted by the water and then reflected off the bottom of the pool. The caustic appears as a series of bright, rippling lines on the surface of the water.
2. Light passing through a wine glass: When light passes through a wine glass, it is refracted by the curved surface of the glass. The caustic appears as a bright, elongated spot of light on the surface of the table or other surface where the glass is placed.

## Ambient Occlusion

Ambient occlusion refers to the soft shadows that form in areas where objects are close together, or where there are tight crevices or other areas where light has trouble reaching.

Specifically, ambient occlusion is calculated by casting rays from each point on an object's surface in multiple directions and then determining how many of those rays intersect with other objects in the scene. The more rays that intersect with other objects, the darker the ambient occlusion effect will be in that area.

One common approach to ambient occlusion is to use a technique called screen-space ambient occlusion (SSAO), which calculates ambient occlusion by examining the depth and color values of pixels on the screen.

## Light Transport Notation

- L: a light source
- E: the eye
- S: a specular reflection
- D: a diffuse reflection

Light takes a path from L, the light, to E, the eye.
