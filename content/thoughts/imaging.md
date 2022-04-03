---
title: "Imaging"
date: 2021-12-24
tags:
- seed
---

## Image Formation, Cameras, and Lenses
Image formation depends on
1. Lighting conditions
2. Scene geometry
3. Surface properties
4. Camera optics
5. Sensor properties

### Image Processing Pipeline
The sequence of image processing operations applied by the camera's image signal processor (ISP) to convert a RAW image into a regular JPG/PNG.

1. Lens
2. CFA
3. Analog Front-end -> RAW image (mosaiced, linear, 12-bit)
4. White balance
5. CFA demoisaicing
6. Denoising
7. Colour transforms
8. Tone reproduction
9. Compression -> final RGB image (non-linear, 8-bit)

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
The role of a lens is to capture more light while preserving, as much as possible, the abstraction of an ideal pinhole camera, the thin lens equation

$$\frac{1}{z'} - \frac{1}{z} = \frac{1}{f}$$

where $f$ is the focal point, $z'$ is the distance to the image plane, and $z$ is the distance to the object.

Focal length can be thought of as the distance behind the lens where incoming rays parallel to the optical axis converge to a single point.

Different effects can be explained using physics phenomena. Vignettes are simply light that reaches one lens but not the other in a compound lens. Chromatic aberration happens because the index of refraction depends on wavelength of the light so not all colours can be in equal focus.

Similarities with the human eye
- pupil is analogous to the pinhole/aperture
- retina is analogous to the film/digital sensor

#### Weak Perspective
Only accurate when object is small/distant. Useful for recognition

$$P = \begin{bmatrix}x \\ y \\ z\end{bmatrix} \textrm{projects to a 2D image point} \ P' = \begin{bmatrix}x' \\ y'\end{bmatrix} \textrm{where} \ m = \frac{f'}{z_0}, x' = mx, y' = my$$


#### Orthographic Projection

$$P = \begin{bmatrix}x \\ y \\ z\end{bmatrix} \textrm{projects to a 2D image point} \ P' = \begin{bmatrix}x' \\ y'\end{bmatrix} \textrm{where} \ x' = x, y' = y$$

#### Perspective Projection

$$P = \begin{bmatrix}x \\ y \\ z\end{bmatrix} \textrm{projects to a 2D image point} \ P' = \begin{bmatrix}x' \\ y'\end{bmatrix} \textrm{where} \ m = \frac{f'}{z_0}, x' = f'\frac{x}{z}, y' = f'\frac{y}{z}$$

## Image as functions
### Grayscale images
2D function $I(x,y)$ where the domain is $(x,y) \in ([1, width], [1, height])$ and the range is $I(x,y) \in [0, 255] \in \mathbb{Z}$

### Point Processing
Apply a single mathematical operation to each individual pixel

## Linear Filters
Let $I(x,y)$ be an $n \times n$ digital image. Let $F(x,y)$ be the $m \times m$ filter or kernel. For convenience, assume $m$ is odd and $m < n$. Let $k = \lfloor \frac{m}{2} \rfloor$, we call $k$ the half-width.

For a correlation, we then compute the new image $I'(x,y)$ as follows:
$$I'(x,y) = \sum_{j=-k}^k\sum_{i=-k}^k F(i, j) I(x + i, y + j)$$

For a convolution, we then compute the new image $I'(x,y)$ as follows:
$$I'(x,y) = \sum_{j=-k}^k\sum_{i=-k}^k F(i, j) I(x - i, y - j)$$

A convolution is just the correlation with the filter rotated 180 degrees. We denote a convolution with the $\otimes$ symbol.

In general,
1. Correlation: measures similarity between two signals. In our case, this would mean similarity between a filter and an image patch it is being applied to
2. Convolution: measures the effect one signal has on another signal

Each pixel in the output image is a linear combination of the central pixel and its neighbouring pixels in the original image. This results in $m^2 \times n^2$ computations. When $m \approx n$, then this is a $\mathcal{O}(n^4)$

Low pass filters filter out high frequences, high pass filters filter out low frequencies.

### Properties of Linear Filters
1. Superposition: distributive law applies to convolution. Let $F_1$ and $F_2$ be digital filters. Then $$(F_1 + F_2) \otimes I(x,y) = F_1 \otimes I(x,y) + F_2 \otimes I(x,y)$$
2. Scaling. Let $F$ be a digital filter and let $k$ be a scalar. $$(kF) \otimes I(x,y) = F \otimes (kI(x,y)) = k(F \otimes I(x,y))$$
3. Shift invariance: output is local (doesn't depend on absolute position in image)

**Characterization Theorem**: Any operation is linear if it satisfies both superposition and scaling. Any linear, shift-invariant operation can be expressed as a convolution.

#### Properties of Convolution
1. Associative. $G \otimes (F \otimes I(x,y)) = (G \otimes F) \otimes I(x,y)$
2. Symmetric. $(G \otimes F) \otimes I(x,y) = (F \otimes G) \otimes I(x,y)$

Correlation, on the other hand, is generally not associative.

For 1D Gaussians, we note $G_{\sigma_1}(x) \otimes G_{\sigma_2}(x) = G_{\sqrt{\sigma_1^2 + \sigma_2^2}}(x)$. Convolving with $G_\sigma(x) \otimes G_\sigma(x) = G_{\sqrt 2 \sigma}(x)$

### Boundary Effects
1. Ignore these locations: make the computation undefined for the outsize $k$ rows/columns
2. Pad with zeroes: return zero whenever of value of $I$ is required at some position outside the image
3. Assume periodicity: wrap image around
4. Reflect border

### Pillbox
A 2D pillbox is rotationally invariant but not separable

$$f(x,y) = \frac{1}{\pi r^2}
\begin{cases} 
  1 & \textrm{if} x^2 + y^2 \leq r^2 \\
  0 & \textrm{otherwise}
\end{cases}
$$

An efficient implementation would represent a 2D box filter as the sum of a 2D pillbox and some "extra corner bits"

### Gaussian Filters
- Box filter doesn't apply well for lens defocus. A circular pillbox is a much better model for defocus
- Gaussian is a good general smoothing model
  - for phenomena
  - whenever the CLT applies

Gaussian filters are rotationally invariant.

We get $G_\sigma(x,y) = \frac{1}{2\pi\sigma^2}\exp^{-\frac{x^2+y^2}{2\sigma^2}}$ where $\sigma$ is the standard deviation

For a 3x3, we then need to quantize and truncate it, evaluating $G_\sigma(x,y)$ wherever in the filter. Increasing $\sigma$ means more blur. Problem with 3x3 is that it truncates too much of the distribution (does not sum up to one), this can cause unintentional darkening.

In general, the Gaussian filter should capture $\pm3\sigma$ for $\sigma = 1$ which gives us a 7x7 filter.

#### Efficiency
As both the 2D box filter and 2D Gaussian filter are separable, it can be implemented as two 1D convolutions which convolve each row and then each column separately.

A 2D filter is separable if it can be expressed as an outer product of two 1D filters

A seperable 2D Gaussian only does $2m$ multiplications at each pixel (one for each 1D filter). Considering the image has $n \times n$ pixels, then this is a $2m \times n^2$ multiplications. Assuming $m \approx n$, this is $\mathcal{O}(n^3)$

#### Fourier Transform
The basic building block of the fourier transform is the periodic function.

$$Asin(\omega x + \phi)$$

where $A$ is the amplitude, $\omega$ is the angular frequency and $\phi$ is the phase. Fourier's claim was that you could add enough of these to get any periodic signal!

### The Convolution Theorem
Let $i'(x,y) = f(x,y) \otimes i(x,y)$ be the convolution.

Then, $\mathcal{I}'(w_x,w_y) = \mathcal{F}(w_x,w_y)\mathcal{I}(w_x,w_y)$ which is just a simple element-wise multiplication after applying a Fourier transform to each.

At the expense of two Fourier transforms and one inverse Fourier transform, convolution can be reduced to (complex) multiplication. This speeds up the cost of FFT/IFFT for the image and filter to $\mathcal{O}(n^2\log n)$ and $\mathcal{O}(m^2\log m)$ respectively, dropping the total cost of convolution to $\mathcal{O}(n^2)$

### Convolution Sizing
Convolving two filters of size $m \times m$ and $n \times n$ results in a filter of size

$$(n + 2 \lfloor \frac m 2 \rfloor) \times (n + 2 \lfloor \frac m 2 \rfloor)$$

More broadly for a set of $K$ filters of sizes $m_k \times m_k$ the resulting filter will have size 

$$(m_1 + 2 \sum_{k=2}^K \lfloor \frac{m_k}{2} \rfloor) \times (m_1 + 2 \sum_{k=2}^K \lfloor \frac{m_k}{2} \rfloor)$$

## Non-linear filters
- Median Filter (take the median value of the pixels under the filter), effective at reducing certain kinds of noise, such as impulse noise ('salt and pepper' noise or 'shot' noise)
- Bilateral Filter (edge-preserving filter). Effectively smooths out the image but keeps the sharp edges, good for denoising. Weights of neighbour at a spacial offset $(x,y)$ from the center pixel $I(X,Y)$ given by a product $\exp^{-\frac{x^2+y^2}{2\sigma_d^2}}\exp^{-\frac{(I(X+x, Y+y) - I(X,Y))^2}{2\sigma_r^2}}$. We call the first half of the product the *domain kernel* (which is essentially a Gaussian) and the second half the *range kernel* (which depends on location in the image).
- ReLU. $x$ for all $x > 0$, $0$ otherwise.

## Sampling
Images are a discrete (read: sampled) representation of a continuous world.

An image suggests a 2D surface which can be grayscale or colour. We note that in the continuous case that 

$i(x,y)$ is a real-valued function of real spatial variables, $x$ and $y$. It is bounded above and below, meaning $0 \leq i(x,y) \leq M$ where $M$ is the maximum brightness. It is bounded in extent, meaning that $x$ and $y$ do not span the entirety of the reals.

Images can also be considered a function of time. Then, we write $i(x,y,t)$ where $t$ is the temporal variable. We can also explicitly state the dependence of brightness on wavelength explicit, $i(x,y,t,\lambda)$ where $\lambda$ is a spectral variable.

We denote the discrete image with a capital I as $I(x,y)$. So when we go from continuous to discrete, how do we sample?
- Point sampling is useful for theoretical development
- Area-based sampling occurs in practice

We also quantize the brightness into a finite number of equivalence classes. These values are called gray-levels

$$I(x,y) \implies \lfloor \frac{i(x,y)}{M} (2^n - 1) + 0.5\rfloor$$

Typically, $n=8$ giving us $0 \leq n \leq 256$

Is it possible to recover $i(x,y)$ from $I(x,y)$? In the case when the continuous is equal to the discrete, this is possible (e.g. a completely flat image). However, if there is a discontinuouty that doesn't fall at a precise integer, we cannot recover the original continuous image.

A bandlimit is the maximum *spatial frequency* of an image. The audio equivalent of this is audio frequency, the upper limit of human hearing is about 20kHz which is the human hearing bandlimit.

Aliasing is the idea that we don't have have enough samples to properly reconstruct the original signal so we construct a lower frequency (fidelity) version.

We can reduce aliasing artifacts by doing
1. Oversampling: sample more than you think you need and average
2. Smoothing before sampling: reduce image frequency

This creates funky patterns on discrete images called moire patterns. This happens in film too (temporal aliasing), this is why wheels sometimes look like they go backwards.

The fundamental result (Sampling Theorem): For bandlimited signals, if you sample regularly at or above twice the maximum frequency (called the Nyquist Rate), then you can reconstruct the original signal exactly.

- Oversampling: nothing bad happens! Just wasted bits.
- Undersampling: things are missing and there are artifacts (things that shouldn't be there)

### Shrinking Images
We can't shrink an image simply by taking every second pixel

Artifacts will appear:
1. Small phenomena can look bigger (moire patterns in checkerboards and striped shirts)
2. Fast phenomena can look slower (wagon wheels rolling the wrong way)

We can sub-sample by using Gaussian pre-filtering (Gaussian blur first then throw away every other column/row). Practically, for ever image reduction of a half, smooth by $\sigma = 1$
