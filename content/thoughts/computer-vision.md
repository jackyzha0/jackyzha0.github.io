---
title: "Computer Vision"
date: 2021-09-15T21:49:18-07:00
---

> CV, broadly speaking, is a research field aimed to enable computers to process and interpret visual data, as sighted humans can

Typically, it's a pipeline from
1. Image
2. Sensing Device
3. Interpreting Device
4. Interpretation

## Problems in CV
1. Measurement. Algorithms for computing properties of the 3D world from visual data. This is literally impossible to invert the image formation process. The best we can do is guess.
2. Perception and interpretation. Algorithms and representations to allow a machine to recognize objects, people, scenes, and activities. We don't fully understand how human processing mechanisms work yet!
3. Search and organization. Algorithms to mine, search, and interact with visual data. Scale is absolutely enormous.
4. Visual imagination. Algorithms for manipulation or creation of image or video content

## Image Formation, Cameras, and Lenses
Image formation depends on
1. Lighting conditions
2. Scene geometry
3. Surface properties
4. Camera optics
5. Sensor properties

### Examples
#### Reflection
Surface reflection depends on viewing $(\theta_v,\phi_v)$ and illumination $(\theta_i,\phi_i)$ direction along with the Bidirectional Reflection Distribution Function: $BRDF(\theta_v,\phi_v,\theta_i,\phi_i) = \frac{\rho_d}{\pi}$

All angles are spherical coordinates w.r.t. the normal line of the surface.

A Lambertian (matte) surface is one which appears the same brightness from all directions. A mirror (specular) surface is one where all incident light is reflected in one direction $(\theta_v,\phi_v)=(\theta_r,\phi_r)$

#### Cameras
![Bare-sensor imaging](/thoughts/images/bare-sensor-imaging.png)*All scene points contribute to all sensor pixels*

As a result, the image is really blurry.

![Pinhole camera](/thoughts/images/pinhole.png)*Pinhole camera*

The image here is flipped, but no longer blurry. Roughly, each scene point contributes to one sensor. Pinhole camera means you need to get the right size of pinhole. If the pinhole is too big, then many directions are averaged, blurring the image. If the pinhole is too small, then diffraction becomes a factor, also blurring the image.

A few perspective 'tricks' arise out of the pinhole
1. Size is inversely proportional to distance
2. Parallel lines meet at a point (vanishing point on the horizon)

Side note, pinhole cameras are really slow because only a small amount of light actually makes it through the pinhole. As a result, we have lenses

#### Lenses
The role of a lens is to capture more light while preserving, as much as possible, the abstraction of an ideal pinhole camera

$$\frac{1}{z'} - \frac{1}{z} = \frac{1}{f}$$

where $f$ is the focal point, $z'$ is the distance to the image plane, and $z$ is the distance to the object.

Focal length can be thought of as the distance behind the lens where incoming rays parallel to the optical axis converge to a single point.

Different effects can be explained using physics phenomena. Vignettes are simply light that reaches one lens but not the other in a compound lens. Chromatic aberration happens because the index of refraction depends on wavelength of the light so not all colours can be in equal focus.

Similarities with the human eye
- pupil is analogous to the pinhole/aperture
- retina is analogous to the film/digital sensor

#### Weak Perspective
Only accurate when object is small/distant. Useful for recognition

![Weak Perspective Equation](/thoughts/images/weak-perspective.png)*Weak Perspective Equation*

#### Orthographic Projection

![Orthographic Project](/thoughts/images/orthographic-projection.png)*Orthographic Projection*

#### Perspective Projection

![Perspective Projection](/thoughts/images/perspective-projection.png)*Perspective Projection*

## Image as functions
### Grayscale images
2D function $I(x,y)$ where the domain is $(x,y) \in ([1, width], [1, height])$ and the range is $I(x,y) \in [0, 255] \in \mathbb{Z}$

### Point Processing
Apply a single mathematical operation to each individual pixel

### Linear Filters
Let $I(x,y)$ be an $n \times n$ digital image. Let $F(x,y)$ be the $m \times m$ filter or kernel. For convenience, assume $m$ is odd and $m < n$. Let $k = \lfloor \frac{m}{2} \rfloor$, we call $k$ the half-width.

For a correlation, we then compute the new image $I'(x,y)$ as follows:
$$I'(x,y) = \sum_{j=-k}^k\sum_{i=-k}^k F(i, j) I(x + i, y + j)$$

For a convolution, we then compute the new image $I'(x,y)$ as follows:
$$I'(x,y) = \sum_{j=-k}^k\sum_{i=-k}^k F(i, j) I(x - i, y - j)$$

A convolution is just the correlation with the filter rotated 180 degrees. We denote a convolution with the $\otimes$ symbol.

Each pixel in the output image is a linear combination of the central pixel and its neighbouring pixels in the original image. This results in $m^2 \times n^2$ computations. When $m \approx n$, then this is a $\mathcal{O}(n^4)$

#### Properties of Linear Filters
1. Superposition: distributive law applies to convolution. Let $F_1$ and $F_2$ be digital filters. Then $$(F_1 + F_2) \otimes I(x,y) = F_1 \otimes I(x,y) + F_2 \otimes I(x,y)$$
2. Scaling. Let $F$ be a digital filter and let $k$ be a scalar. $$(kF) \otimes I(x,y) = F \otimes (kI(x,y)) = k(F \otimes I(x,y))$$
3. Shift invariance: output is local (doesn't depend on absolute position in image)

#### Characterization Theorem
Any operation is linear if it satisfies both superposition and scaling. Any linear, shift-invariant operation can be expressed as a convolution.

#### Boundary Effects
1. Ignore these locations: make the computation undefined for the outsize $k$ rows/columns
2. Pad with zeroes: return zero whenever of value of $I$ is required at some position outside the image
3. Assume periodicity: wrap image around
4. Reflect border