---
title: "Computer Vision"
date: 2021-09-15T21:49:18-07:00
tags:
  - seed
  - technical
---

> CV, broadly speaking, is a research field aimed to enable computers to process and interpret visual data, as sighted humans can

It can also be thought of as the inverse of [[thoughts/computer graphics]].

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

Problem subtypes

1. Categorization
2. Detection
3. Segmentation
4. Instance segmentation
5. Image captioning

Subnotes:

- [Images, Cameras, Lenses, Filters, Sampling](thoughts/imaging.md)
- [Colour](thoughts/colour.md) and [[thoughts/texture]]
- [Optical Flow and Stereo Vision](thoughts/optical%20flow.md)
- [Object detection/recognition (Template Matching, Keypoint Descriptors)](thoughts/object%20detection.md)
- [Object classification (Model fitting, CNNs, Clustering) ](thoughts/object%20classification.md)
