---
title: "Computer Vision"
date: 2021-09-15T21:49:18-07:00
---

> CV, broadly speaking, is a research field aimed to enable computers to process and interpret visual data, as sighted humans can

It can also be thought of as the inverse of graphics.

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

## Colour Filter Arrays
One implementation of photo sensors 
1. Microlens
2. [optional] Colour Filter (what spectral sensitivity functions do we use for each colour? Human colour sensitivity differs between colours as well)
3. Photodiode
4. Potential well

Two design choices to make when designing CFAs:
1. What spectral sensitivity functions (SSFs) do we use for each colour filter?
2. How do we spatially arrange filters to create the best mosaic for CFAs?

RAW Bayer Image gives us direct pixel data

### Demoisaicing
How do we produce the full RGB image from mosaiced sensor output?

- Bilinear Interpolation: average your 4 neighbours
- Bicubic Interpolation -> needs more neighbours, may overblur
- Edge-aware interpolatin 

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

## Template Matching
Linear filtering is also known as template matching. Convolution/correlation can be thought of as comparing a template (the kernel) with each section of the image.
- Consider the filter and image section as vectors
- Applying the filter can be interpreted as computing the dot product between the filter and the local image patch

The correlation is then normalized to between -1 and 1 using cosine similarity, where 1 is the value when the filter and image region are identical. This process is essentially finding the cosine similarity between template and local image neighbourhood

$$\cos\theta = \frac{a \cdot b}{|a||b|} = \frac{a \cdot b}{\sqrt{(a \cdot a)(b \cdot b)}} = \frac{a}{|a|} \frac{b}{|b|}$$

Then, we can map over the image and create a correlation map. Thresholding this gives us detections.

Good:
1. Robust against noise
2. Relatively easy to compute
Bad:
1. Scaling (we can address this using scaled representations like a Gaussian image pyramid)
2. Rotation
3. Lighting conditions
4. Sensitive to viewing direction and pose (in 3D worlds)

### Gaussian Image Pyramid
Collection of representations of an image. Typically, each layer of the pyramid is half the width and half the height of the previous layer. In the Gaussian version, each layer is smoothed by a Gaussian then resampled to get the next layer.

Details get smoothed out (are completely lost) as we move to higher levels, only large uniform regions of colours in the original image are left.

![Upsampling Process](https://miro.medium.com/max/1016/1*Q9UKqUC6OqpR3KL1yRrXxA.png)

### Laplacian Pyramid
To do this, create a Gaussian pyramid and take the difference between one pyramid level and the next after smoothing but before subsampling. 

At each level, retain the residuals (difference between smoothed image and normal image) instead of the blurred images themselves.

Constructing the pyramid, we repeat until min resolution reached:
1. Blur
2. Compute Residual
3. Subsample

Reconstructing, we repeat until original resolution reached:
1. Upsample
2. Blur
3. Sum with residual

## Local Feature Detection
> Moving from global template matching to local template matching (e.g.edges and corners)

As differentiation is linear and shift invariant, we can implement it as a convolution.

The discrete approximation is $\frac{\partial f}{\partial x} \approx \frac{F(X+ \Delta x, y) - F(x,y)}{\Delta x}$ where $\Delta x$ is usually $1$. This is equivalent to a convolution $F$ is a $1 \times 2$ filter with the first element is $-1$ and the second element is $1$. Note that the derivatives go up for the Y direction and the right for the X direction.

We usually smooth the image prior to derivative estimation. Increased smoothing
- eliminates noise edges
- makes edges smoother and thicker
- removes fine detail

Weights of a filter for differentiation should sum to 0 as a constant image should have derivative 0.

### Edge Detection
The goal here is to identify sudden changes in image brightness as this encodes the vast majority of shape information.

An edge is a location with high gradient.

Mainly caused by
- Depth discontinuity
- Surface orientation discontinuity
- Reflectance discontinuity (e.g. change in material)
- Illumination discontinuity (e.g. shadows)

As we usually smooth prior to derivative calculation and convolution is associative, we can combine both steps and use derivatives of Gaussian filters.

$$D \otimes (G \otimes I(X,Y)) = (D \otimes G) \otimes I(X,Y)$$

#### Sobel (Gradient Magnitude)
Let $I(X,Y)$ be an image. Then, we let $I_x(X,Y)$ and $I_y(X,Y)$ be estimates of the partial derivatives in the $x$ and $y$ directions, respectively. Then, the vector $[I_x, I_y]$ or $\nabla f = [\frac{\partial f}{\partial x}, \frac{\partial f}{\partial y}]$ is the gradient and $\sqrt{I_x^2+I_y^2}$ is the gradient magnitude.

The gradient points in the direction of most rapid increase of intensity. The direction is then $\theta = \arctan{\frac{\frac{\partial f}{\partial y}}{\frac{\partial f}{\partial x}}}$. The strength of the edge is then the magnitude $||\nabla f|| = \sqrt{\frac{\partial f}{\partial x}^2 + \frac{\partial f}{\partial y}^2}$.

#### Marr/Hildreth (Laplacian of Gaussian)
**Design Criteria**
1. localization of space (find where the edge is)
2. localization in frequency (identify high frequency and low frequency edges)
3. rotationally invariant (rotation shouldn't affect edges)

Find the zero-crossings (intercepts) of the Laplacian of the Gaussian. This is $\nabla^2 G(x,y) = \frac{-1}{2\pi\sigma^4}[2-\frac{x^2+y^2}{\sigma^2}]\exp{(-\frac{x^2+y^2}{2\sigma^2})} = 0$

Alternatively, we can say that subtracting the delta function from the Gaussian gives you an approximation of the Laplacian

#### Canny (Local Extrema of 1st deriv)
**Design Criteria**
1. good detection (reduce missed edges, reduced edges where edges don't exist)
2. good localization (accurate edge detection)
3. one (single) response to a given edge

Find the local extrema of a first derivative operator.

Steps
1. Apply directional derivatives of Gaussian
2. Computer gradient magnitude and gradient direction
3. Perform non-max suppression
	Non-max suppression allows us to suppress near-by similar detections to obtain one "true" result. In images, we select the maximum point across the width of the edge (following the direction of the gradient).
 
	In implementations, the value at a pixel $q$ must be larger than its interpolated values at $p$ (the next pixel in the direction of the gradient) and $r$ (the previous pixel in the direction of the gradient). Interpolate as needed.
4. Linking and thresholding
	Trying to fix broken edge chains by linking separate edge pixels through taking the normal of the gradient and linking it if the nearest interpolated pixel is also an edge pixel. Accept all edges over low threshold that are connect to an edge over high threshold.
	
|Author|Approach|Detection|Localization|Single Resp|Limitations|
|--|--|--|--|--|--|
|Sobel|Gradient Magnitude Threshold|Good|Poor|Poor|Thick edges|
|Marr/Hildreth|Zero-crossings of 2nd Derivative|Good|Good|Good|Smooths Corners
|Canny|Local extrema of 1st Derivative|Best|Good|Good||

### Boundary Detection
How closely do image edges correspond to boundaries that humans perceive to be salient or significant? 

One approach is using circular windows of radii $r$ at each pixel $(x,y)$ cut in half by a line that bisects the circle in half. Then, compare visual features on both sides of the cut and if the features are statistically different, then the cut line probably corresponds to a boundary.

For statistical significance:
1. Compute non-parametric distribution (histogram) for left side
2. Compute non-parametric distribution (histogram) for right side
3. Compare two histograms, on left and right side, using statistical test

Example features include
- Raw Intensity
- Orientation Energy
- Brightness Gradient
- Color Gradient
- Texture gradient

For this implementation, we consider 8 discrete orientations ($\theta$) and 3 scales ($r$)

### Features
Corners are locally distinct 2D image features that (hopefully) correspond to a distinct position on a 3D object of interest in the scene.

Cannot be an edge as estimation of a location along an edge is close to impossible (the aperture problem)

### Autocorrelation
Correlation of the image (distribution of pixel values) with itself. At each pixel, compute its partial derivative w.r.t. either the $x$ or the $y$ axis, $I_y = \frac{\partial I}{\partial y}, I_x = \frac{\partial I}{\partial x}$.

Windows on an edge will have autocorrelation that falls of slowly in the direction of the edge but rapidly orthogonal to the edgge. Windows on a corder will have autocorrelation that falls off rapidly in all directions.

#### Harris Corner Detection
As a stats reminder, covariance is the *direction* of the correlation. The closer the covariance is to 1, the closer it is to a perfect positive correlation. -1 implies perfect negative correlation.

When drawing distrubtion, draw normals to edges going from low values (dark) to high values (white).

1. Compute image gradients over small region
2. Compute covariance matrix ![Covariance Matrix](/thoughts/images/covmat.png) (essentially fitting a quadratic to the gradients over the small image patch $P$)
4. Computer eigenvectors and eigenvalues of the covariance matrix.
5. Use threshold on eigenvalues to detect corners ($>0$ is a corner)

We can visualize the covariance matrix $C$ as an ellipse whose axis lengths are determined by the eigenvalues and orientation determined by $R$ (the rotation matrix). It tells us the dispersion of the gradients nearby.

As $C$ is symmetric, we have 

![Covariance matrix as ellipse equation](/thoughts/images/covellipse.png)

Where the minor axis is $\lambda_{max}^{-1/2}$ and the major axis is $\lambda_{min}^{-1/2}$

Then, this is what the eigenvalues tell us:
- Case 1 (both $\lambda_1$ and $\lambda_2$ are close to zero): flat region
- Case 2 ($\lambda_2$ is much greater than $\lambda_1$): horizontal edge
- Case 3 ($\lambda_1$ is much greater than $\lambda_2$): vertical edge
- Case 4 ($\lambda_1$ are both rather large $\lambda_2$): corner

To threshold, we can pick a function
1. Harris & Stephens: $\lambda_1 \lambda_2 - \kappa (\lambda_1 + \lambda_2)^2$ which is equivalent to $\det(C) - \kappa \textrm{trace}^2(C)$. $\kappa$ is usually 0.4 or 0.6.
2. Kanade & Tomasi: $\min(\lambda_1, \lambda_2)$
3. Nobel: $\frac{\det(C)}{\textrm{trace}(C)+\epsilon}$

#### Linear Algebra Aside/Review
Given a square matrix $A$, a scalar $\lambda$ is called an **eigenvalue** of $A$ if there exists a nonzero vector $v$ that satisfies

$$Av = \lambda v$$

The vector $v$ is called an eigenvector for $A$ corresponding to the eigenvalue $\lambda$. The eigenvalues of $A$ are obtained by solving $\det(A-\lambda I) = 0$

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
2. Produce large quantities of texture for computer graphics

Randomness parameter is actually the size of the patch (less randomness means sample is larger thus more accurate)

## Colour
Two lights whose spectral power distributions appear identical to most observers are called metamers

Chromatic Adaptation: colour perception starts to skew if exposed to a certain colour light for an extended period of time

Contrast effects: nearby colours affect what is perceived

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

## Keypoint Description
### Scale Invariant Features (SIFT)
David Lowe

Invariant to translation, rotation, scale, and other imaging parameters. (Generally works for about ~20% change in viewpoint angle)

Advantages:
- Locality: features are local (robust to occlusion and clutter)
- Distinctiveness: individual features can be matched to a large database of objects
- Quantity: many features can be generated (even for small objects)
- Efficiency: fast (close to real-time performance)

Describes both a **detector** and **descriptor**
1. Multi-scale local extrema detection
	- Use difference of gradient pyramid (3 scales/octave, down-sample by a factor of 2 each octave)
2. Keypoint localization
	- We then remove low constrast or poorly localized keypoints. We can determine good corners by using the covariance matrix! (Threshold on magnitude of extremum, ratio of principal curvatures)
3. Orientation assignment
	- Create histogram of local gradient directions computed at selected scale multiplied by the gaussian kernel at the center
	- Assign canonical orientation at peak of smoothed histogram (mode)
4. Keypoint description (SIFT Descriptor)
	- histogram of local gradient directions
		- (8x(4x4)) = 128 dims
		- 4x4 = 16 histograms
		- 8 orientations each
	- Normalized to unit length to reduce the effects of illumination change
	Robust to affine changes (rotation and scaling)
	
### Histogram of Oriented Gradients (HOG)
- uses 8x8 cells and blocks which consist of 2x2 cells
- then for each cell, create a histogram of 'unsigned' gradients
	- perform soft binning (adding to one bin also adds to neighbour bins)
- concatenate then L2 normalize
- 15x7x4x36 = 3780

### 'Speeded Up' Robust Features (SURF)
- 4x4 cell grid of 5x5 cells
- each cell is represented by 4 values
	1. sum of all x derivatives
	2. sum of all y derivatives
	3. abs of 1
	4. abs of 2
- use Haar wavelets filters (simple derivative filters where all black on one side and all white on the other, weighted by gaussian)
- 4x4x4 = 64 dims

## Object Recognition
1. Match each keypoint to the database of keypoints
	To find out probability of correct match, we can compare the ratio of distance between nearest neighbour and 2nd nearest neighbour. A threshold of 0.8 provides great separation.
2. identify clusters of at least 3 features that agree on an object and pose
	Lowe uses a generalized Hough transform
3. check each cluster found by performing detailed geometric fit of affine transformation to the model
4. accept/reject interpretation accordingly
	
### Approximate Nearest Neighbour
- generally, finding nearest neighbour in high-dimensional data is linear in time (even for KD trees)

### Transformations
Degrees of freedom (DOF)
1. translation: 2
2. rigid (euclidean): 3
3. similarity: 4
4. affine: 6
5. projective: 8

## Data to Model
### Random Sample Consensus (RANSAC)
1. randomly choose minimal subset of data points necessary to fit model
2. points within some distance threshold of model are a consensus set, the size of the consensus set is the model's support
3. repeat for N samples, model with biggest support is most robust fit

Choosing number of samples $k$
1. let $\omega$ be the fraction of inliers
2. let $n$ be the number of points needed to define hypothesis (e.g. $n=2$ for a line)
3. suppose $k$ samples of $n$ points are chosen. then
	1. the probability that all $n$ in a sample are correct is $\omega^n$
4. the probability that all $k$ samples fail is $(1-\omega^n)^k$, thus we choose a $k$ large enough to keep this below a targe failure rate

Advantages
- general method
- easy to implement and calculate failure rate
Disadvantages
- only handles a moderate percentage of outliers without cost blowing up
- many real problems have high rate of outliers (e.g. noise)

### Hough Transform
- For each token, vote for all models to which the token could belong
- Return model with most votes

e.g. for each point, vote for all lines that *could* pass through it; true lines will pass through many points and thus receive many votes

Turning image space into parameter space. Rearranging $y = mx + b$ into $y - mx = b$ where $b$ and $m$ are the variables instead of $y$ and $x$.

We can alternative transform it using Book's Convention: $x\sin(\theta) + y\cos(\theta) + r = 0$. Then, $x\sin(\theta) + y\cos(\theta) = \rho$

Advantages
- Can handle high percentage of outliers: each point votes separately
- Can detect multiple instances of a model in a single pass
Disadvantages:
- Complexity of search time increases exponentially with the number of model parameters
- Can be tricky to pick a good bin size

## Stereo
Computing depth from multiple images. Formulated as a correspondence problem: dtermine match between location of a scene point in one image and its location in another.

Disparity: $d = x - x' = \frac{bf}{Z}$ where $b$ is baseline, $x$ is distance from $O$ to epipolar line, and $x'$ is distance from $O'$ to epipolar line. $Z$ is distance from $b$ to target $X$. 

Simple stereo algorithm
1. Rectify images (make epipolar lines horizontal)
2. For each pixel
	1. Find epipolar line
	2. Scan line for best match
	3. Compute depth from disparity

Naive approach, pixel-based often lacks content. What we can try is min SSD-error of a window-based approach.

Another approach is to match the edges (the zero-crossings) at different scales.

Note: Sum squared differences (SSD) is the same as Normalized Cross Correlation (NCC)

## Optical Flow
Determine how objects (and/or the camera itself) move in the 3D world

Difficulty comes as motion is geometric whereas optical flow is radiometric (about an origin)

### Aperture Problem
- Without distinct features to track, the true visual motion is ambiguous
- Locally, one can compute only the component of the visual motion in the direction perpendicular to the contour

### Constraint Equation
Let image intensity be denoted by $I(x,y,t)$. Then, applying chain rule, we obtain $\frac{dI(x,y,t)}{dt} = I_x\frac{dx}{dt} + I_y\frac{dy}{dt} + I_t$.

Let $u = \frac{dx}{dt}$ and $v = \frac{dy}{dt}$. Then $[u, v]$ is the 2D velocity space.

If we set $\frac{dI(x,y,t)}{dt} = 0$, then we get the **optical flow constraint equation**: $I_xu+I_yv + I_t=0$.

We assume constant brightness for this, meaning $I(x(t), y(t), t) = C$.

We measure each of the following:
- Spatial Derivative: $I_x = \frac{\partial I}{\partial x}$, $I_y = \frac{\partial I}{\partial y}$
	- Forward difference
	- Sobel filter
	- Scharr filter
- Optical Flow: $u = \frac{dx}{dt}$, $v = \frac{dy}{dt}$
	- We need to solve for this! (the unknown in the optical flow problem)
- Temporal Derivative: $I_t = \frac{\partial I}{\partial t}$
	- Frame difference

### Lucas-Kanade
A dense method to compute motion $[u,v]$ at every location in an image.

Where can you see movement that can be effectively computed? A corner!

Solve for $\mathbf v$ in $\mathbf v = (A^TA)^{-1}A^Tb$ where $\mathbf v$ is the 1-by-2 column matrix of $u$ and $v$. $A$ is the $n$-by-2 column matrix of $I_x(q_i)$, $I_y(q_i)$ partial derivatives evaluated at point $q_i$ ($A$ is actually the same matrix $C$ used in Harris corner detection). $b$ is the 1-by-$n$ matrix consisting of the negative of the temporal partial derivative for each point.

![](/thoughts/images/lucas-kanade.png)

Assumptions
- Motion is slow enough that partial derivatives $I_x$, $I_y$, and $I_t$ are well-defined
- The optical flow constraint equation holds ($\frac{dI(x,y,t)}{dt} = 0$)
- Window size is chosen so that motion $[u,v]$ is constant in the window
- Window size is chosen so that the rank of $A^TA$ is 2 for the window (required inverse exists)

## Classification
Classifier is a procedure that accepts as input a set of features and outputs a prediction for the class label.

### Standard Bag-of-Words pipeline
1. Dictionary Learning: learn visual words using clustering
2. Encode: build Bags-of-words vectors for each image
3. Classify: train and test data using BOW (KNN, naive Bayes, SVM)

### Bayes Rule
Let $c$ be the class label and $x$ be the measurement (evidence)

$$P(c|x) = \frac{P(x|c)p(c)}{P(x)}$$

- $P(c|x)$: the posterior probability is the probability of $c$ given $x$ (after the measurement). 
- $p(c)$: prior probability
- $P(x|c)$: class-conditional probability (likelihood)
- $P(x)$: unconditional probability (a.k.a. marginal likelihood)

Decision boundary, the location where one class becomes more probable than the other (e.g the point where the probability classes are equal). 

The Bayes' risk is the shaded region where one class's probability is still non-zero beyond its decision boundary.

![](/thoughts/images/bayes-risk.png)

### ROC Curve
Trade-off between true positive rate and false positive rate. A random classifier will always have 1:1 true positive and false positive rate

![](/thoughts/images/roc-curve.png)

### Parametric vs Non-parametric
- Parametric classifiers rely on a model
	- fast, compact
	- flexibility and accuracy depend on model assumptions
- Non-parametric classifiers are data driven (rely on comparing to training examples directly)
	- slow
	- highly flexible decision boundaries 

### K-Means
1.  pick some k
2.  assign data to k different clusters randomly
3.  iterate
    1.  center update → calculate average for each cluster (using euclidian distance)
    2.  label update → re-assign the data to the closest cluster center
    3.  if no labels changed, finish (model has converged)

Warning: the clustering is initialization dependent and converges to a local minimum. Often requires some amount of random runs to approximate a good solution, pick best one.

### Spatial Pyramid
Have multiple scales of the input image to compute histograms across. Train a classifier for each scale along with a combined weight to combine each classifier.

### VLAD (Vector of Locally Aggregated Descriptors)
Instead of incrementing the histogram bin by a single count, we increment it by the residual vector $x - c(x)$ (diff between cluster center and feature vector)

Dimensionality is $Kd$ where $K$ is number of codewords and $d$ is the dimensionality of the local descriptor (128 for SIFT)

### Decision Tree
Entropy of set $S$ of data samples is defined as

$$H(s) = - \sum_{c \in C}p(c)\log(p(c))$$

Where $C$ is the set of classes represented in $S$ and $p(c)$ is the empirical distribution of class $c$ in $S$.

Generally, select feature test that maximizes information gain

$$I = H(S) - \sum_{i \in {children}}\frac{|S^i|}{|S|}H(S^i)$$

### Classifier Boosting
- Train an ensemble of classifiers sequentially
- Bias subsequent classifiers to correctly predict training examples that previous classifiers got wrong

## CNNs
Standard is DxWxH

### Convolutional Layer
$K$ is the number of filters, $F$ is the spatial extend of filters (kernel size), $S$ is the stride, and $P$ is the padding

- $W_{out} = (W_{input} - F + 2P)/S + 1$
- $H_{out} = (H_{input} - F + 2P)/S + 1$
- $D_{out} = K$

Total number of learnable parameters: $(F*F*D_{input})*K + K$.

### Pooling Layer
- $W_{out} = (W_{input} - F)/S + 1$
- $H_{out} = (H_{input} - F)/S + 1$
- $D_{out} = D_{input}$

Total number of learnable parameters: 0.

### Layer Summary
- Convolutional Layer: applies a set of learnable filters
- Pooling Layer: performs spatial downsampling
- Fully-connected Layer: same as any regular neural network

A CNN then just learns a hierarchy of filters