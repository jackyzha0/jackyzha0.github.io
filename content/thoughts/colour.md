---
title: "Colour"
date: 2021-12-25
tags:
  - seed
---

See also: [[thoughts/texture]]

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
- Bicubic Interpolation: needs more neighbours, may overblur
- Edge-aware interpolation

### Grassman's Law

TL;DR, colour matching is, to an accurate approximation, linear

For colour matches

- symmetry ($U = V \iff V = U$)
- transitivity ($U = V$ and $V = W \implies U = W$)
- proportionality ($U = V \iff tU = tV$)
- additivity ($U=V$ and $W=X$, then $(U+W)=(V+X)$)

### Colour Space

Choice of primaries is equivalent to choice of colour space. In RGB, we choose monochromatic energies.

- RGB is additive whereas CMY is subtractive.
- RGB and CIE are linear.
- McAdam ellipses are regions where colour differences are imperceptible to the average human eye.
- A colour gamut is the range of colours that can be displayed or captured by a particular device or technology.

- CIE is defined with 3 imaginary lights X, Y, Z
  - Any wavelength $\lambda$ can be matched perceptually by positive combinations
  - X is approximately R, Y is approximately G, Z is approximately B
  - The XYZ colour space is a device-independent colour space, which means that it is not tied to any particular device or display technology.
- As the RGB colour cube sits within the CIE colour space, it can only display a subset of perceivable colours
  - One way to clamp: construct ray to white point, find closest displayable point within gamut
- `(C, M, Y) = (1 - R, 1 - G, 1 - B)`

### Physiology

Retina contains an uneven distribution (clustered around fovea) of rods and cones

- Rods: sense in black and white, mainly for edge detection
- Cones: 3 types, mostly for colour sensing
  - L: most sensitive to red
  - M: most sensitive to green
  - S: most sensitive to blue

Colour blindness results from missing cone types

- Deuteranope (green deficiency)
- Protanope (red deficiency)
- Tritanope (blue deficiency)
