---
title: "NeRF"
date: 2023-04-08
tags:
  - seed
---

A [neural radiance field](https://arxiv.org/abs/2003.08934) (NeRF) is a fully-connected neural network that can generate novel views of complex 3D scenes, based on a partial set of 2D images.

We represent a static scene as a continuous 5D function that outputs the radiance emitted in each direction $(\theta, \phi)$ at each point $(x, y, z)$ in space (see: [[thoughts/coordinate system]])

The radiance function is represented as a 4D function, with volume density value (opacity, represented as $\sigma$) and a view-dependent RGB [[thoughts/colour]].

We train a simple MLP to map from position and direction to radiance. We also encourage the representation to be multiview consistent by restricting the network to predict the volume density $\sigma$ as a function only of the location. That is:

- We train an MLP on the input 3D coordinate with 8 fully connected layers (with 256 channels per layer) to output $\sigma$ and a 256 dimensional feature vector
- This feature vector is then concatenated with the camera ray's viewing direction and is passed to one additional fully-connected layer (with 128 channels) that output the view-dependent RGB colour

It can be seen as interpolating between the input images to render new views

![[thoughts/images/nerf-example.png]]

To [[thoughts/rendering|render]] an image, we

1. Generate a ray from the camera viewpoint to the viewing plane
2. For each ray, pass the position and viewing direction as input into the neural network to produce a set of output colours and densities
3. Accumulate this into a final colour and collapse it into a 2D image

Because this process is naturally differentiable, we can use [[thoughts/supervised learning]] to optimize this model by minimizing the error between each observed image and the corresponding views rendered from our representation

Minimizing this error across multiple views encourages the network to predict a coherent model of the scene by assigning high volume densities and accurate colors to the locations that contain the true underlying scene content

### Optimizations

- Hierarchical volume sampling
  - Our rendering strategy of densely evaluating the neural radiance field network at $N$ query points along each camera ray is inefficient: free space and occluded regions that do not contribute to the rendered image are still sampled repeatedly
  - Instead of just using a single network to represent the scene, we simultaneously optimize two networks: one “coarse” and one “fine”
  - We first sample a set of Nc locations using stratified sampling, and evaluate the “coarse” network at these locations. Given the output of this “coarse” network, we then produce a more informed sampling of points along each ray where samples are biased towards the relevant parts of the volume

## PlenOctrees

For Real-time Rendering of Neural Radiance Fields

[Source](https://alexyu.net/plenoctrees/#demo-section), [Demo](https://alexyu.net/plenoctrees/demo/?load=https://people.eecs.berkeley.edu/~kanazawa/cachedir/plenoctree_data/lego_cams.draw.npz;https://people.eecs.berkeley.edu/~kanazawa/cachedir/plenoctree_data/lego.npz&hide_layers=1#)

We propose a framework that enables real-time rendering of NeRFs using plenoptic octrees, or "PlenOctrees". Our method can render at more than 150 fps at 800x800px resolution, which is over 3000x faster than conventional NeRFs, without sacrificing quality.
