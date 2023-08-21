---
title: "Texture Mapping"
date: 2023-03-28
tags:
  - seed
---

Hides geometric simplicity by using images convey illusion of geometry. Usually maps points on a 3D surface to a 2D point on a [[thoughts/texture|texture]] to modify some property of the 3D surface (e.g. displacement, colour, reflectance, etc.)

## Mipmapping

Similar to [[thoughts/object detection#Gaussian Image Pyramid|Gaussian Image Pyramids]]

Mipmaps (also MIP maps) or pyramids are pre-calculated, optimized sequences of images, each of which is a progressively lower resolution representation of the previous.

(fun fact: MIP stands for _multum in parvo_ -- many things in a small place)

They are intended to increase rendering speed and reduce aliasing artifacts. A high-resolution mipmap image is used for high-density samples, such as for objects close to the camera; lower-resolution images are used as the object appears farther away.

Interpolation within a MIPMAP level is done either by using the nearest texel or interpolating between neighbouring texels. Interpolation between MIPMAP levels can be done by doing linear interpolation of the values of the location at the two levels.

### Figuring out which MIPMAP level to use

On a pixel, we calculate the area that it takes up on the texture (the pixel footprint area). By projecting the boundaries of the pixel onto the texture, the area of the pixel footprint area can be computed using the magnitude of the cross product $A = \lVert r_1 \times r_2 \rVert$

See notes on [[thoughts/imaging#Sampling|sampling]]
