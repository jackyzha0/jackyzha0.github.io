---
title: "GLSL"
date: 2023-03-28
tags:
  - seed
---

Types of variables:

- `uniform`: constant across all vertices (normally textures)
- `attribute`: per vertex value (normally positions, normals, UVs)
- `varying`: per pixel (fragment) value (normally colours, UV coordinates)

Special variables shaders can write to:

- Vertex shader:
  - `gl_Position`
- Fragment shader:
  - `gl_FragColor`
  - `gl_FragDepth`
