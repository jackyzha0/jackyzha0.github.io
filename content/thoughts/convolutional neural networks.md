---
title: "Convolutional Neural Networks"
date: 2022-11-03
tags:
  - seed
  - CPSC425
  - CPSC340
aliases:
  - CNNs
---

Rather than picking from fixed convolutions, we learn the elements of the filters. A convolution is a [[thoughts/imaging#Linear Filters|linear filter]] that measures the effect one signal has on another signal.

If $x$ is the $(n,n)$ input signal (image) and $w$ is the $(2m+1, 2m+1)$ filter, then the 2D convolution is given by

$$z[i_1,i_2] = \sum_{j_1=-m}^m \sum_{j_2=-m}^m w[j_1,j_2] x[i_1+j_1,i_2+j_2]$$

### Convolutional Layer

Standard is DxWxH

$K$ is the number of filters, $F$ is the spatial extent of filters (kernel size), $S$ is the stride, and $P$ is the padding

- $W_{out} = (W_{input} - F + 2P)/S + 1$
- $H_{out} = (H_{input} - F + 2P)/S + 1$
- $D_{out} = K$

Total number of learnable parameters: $(F \times F \times D_{input}) \times K + K$.

### Pooling Layer

Makes representation smaller, more manageable and spatially invariant.

- $W_{out} = (W_{input} - F)/S + 1$
- $H_{out} = (H_{input} - F)/S + 1$
- $D_{out} = D_{input}$

Total number of learnable parameters: 0.

### Layer Summary

- Convolutional Layer: applies a set of learnable filters
- Pooling Layer: performs spatial downsampling
- Fully-connected Layer: same as any regular neural network

A CNN then just learns a hierarchy of filters

### Properties of Convolution

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

$$
f(x,y) = \frac{1}{\pi r^2}
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
