---
title: "Textures"
date: 2023-04-03
tags:
- seed
---

Detail in an image that is at a scale too small to be resolved into its constituent elements and at a scale large enough to be apparent in the spatial distribution of image measurements

Sometimes thought of as patterns composed of repeated instances of one or more identifiable elements called *textons*

Can be used for
- object identity (tell what it is from the textures)
- object's shape (based on spatial deformation of texture)

**Shape from texture**: Estimating surface orientation or shape from texture

Typically, texture is a property of a region, not a point. But, then we run into a boundary segmentation problem. We compromise by using a local window to compute a texture and assign it to a point.

See also: [[thoughts/texture mapping]]

### Synthesis
1. Inpainting (filling in holes)
2. Produce large quantities of texture for [[thoughts/computer graphics|computer graphics]]
3. [Wave function collapse](https://github.com/mxgmn/WaveFunctionCollapse)

Randomness parameter is actually the size of the patch (less randomness means sample is larger thus more accurate)

