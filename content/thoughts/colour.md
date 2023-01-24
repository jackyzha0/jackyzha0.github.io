---
title: "Colour"
date: 2021-12-25
tags:
- seed
---

## Texture
Detail in an image that is at a scale too small to be resolved into its constituent elements and at a scale large enough to be apparent in the spatial distribution of image measurements

Sometimes thought of as patterns composed of repeated instances of one or more identifiable elements called *textons*

Can be used for
- object identity (tell what it is from the textures)
- object's shape (based on spatial deformation of texture)

**Shape from texture**: Estimating surface orientation or shape from texture

Typically, texture is a property of a region, not a point. But, then we run into a boundary segmentation problem. We comproimise by using a local window to compute a texture and assign it to a point.

### Synthesis
1. Inpainting (filling in holes)
2. Produce large quantities of texture for [[thoughts/computer graphics|computer graphics]]

Randomness parameter is actually the size of the patch (less randomness means sample is larger thus more accurate)

## Colour
Two lights whose spectral power distributions appear identical to most observers are called metamers

Chromatic Adaptation: colour perception starts to skew if exposed to a certain colour light for an extended period of time

Contrast effects: nearby colours affect what is perceived

### Colour Filter Arrays
One implementation of photo sensors 
1. Microlens
2. [optional] Colour Filter (what spectral sensitivity functions do we use for each colour? Human colour sensitivity differs between colours as well)
3. Photodiode
4. Potential well

Two design choices to make when designing CFAs:
1. What spectral sensitivity functions (SSFs) do we use for each colour filter?
2. How do we spatially arrange filters to create the best mosaic for CFAs?

RAW Bayer Image gives us direct pixel data

### CFA Demoisaicing
How do we produce the full RGB image from mosaiced sensor output?

- Bilinear Interpolation: average your 4 neighbours
- Bicubic Interpolation -> needs more neighbours, may overblur
- Edge-aware interpolatin 

### Grassman's Law
TL;DR, colour matching is, to an accurate approximation, linear

For colour matches
- symmetry ($U = V \iff V = U$)
- transitivity ($U = V$ and $V = W \implies U = W$)
- proportionality ($U = V \iff tU = tV$)
- additivity ($U=V$ and $W=X$, then $(U+W)=(V+X)$)

### Colour Space
Choice of primaries is equivalent to choice of colour space. In RGB, we choose monochromatic energies.

RGB is additive whereas CMY is subtractive.

RGB and CIE are linear.

McAdam ellipses are regions where colour differences are imperceptible to the average human eye.
