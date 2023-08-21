---
title: "Mental Models"
date: 2021-12-12
tags:
  - seed
---

Mental models (cognitive frameworks) help us understand how people reason and react to interface experiences. They provide predictive and explanatory power for understanding user behaviour.

It is an inner [representation](thoughts/representation.md) of a system.

2 types:

1. Internal frameworks: about the mental process inside user's head
2. External frameworks: account for interactions with technologies, environment, and [context](thoughts/context.md)

Characteristics:

- constantly evolving
- not always an accurate representation (can contain errors and uncertainty measures)
- provide a simple representation of a complex phenomena

Models are runnable. We use Norman's seven stage model

1.  **Establish the goal** to be achieved
2.  **Form the intention** for action (what should I do?)
3.  **Specify the action** sequence (how do I do that?)
4.  **Execute** the action sequence (let's see how it goes)
5.  **Perceive** the system state (what am I seeing and hearing?)
6.  **Interpret** the perceived system state (what's actually happening?)
7.  **Evaluate** the system state (is this right?)

(realistically, this model is only good for exploratory learning when a user is learning a system for the first time or for encountering error cases)

If a breakdown occurs on the **left** (2-4), we call that the **gulf of execution**: the difference between the intentions and allowable actions

If a breakdown occurs on the **right** (5-7), we call that the **gulf of evaluation**: the difference between the actual system state and user's understanding

See also: [[thoughts/feedback loops]]

## Mental model vs Conceptual model

- mental models: something the **user has (forms)**
  - users **"see"** the system through mental models
  - users **rely** on mental models during usage
  - mental models can support or impede user's interaction
- [conceptual model](thoughts/conceptual%20model.md): something the **designer creates**
  - essentially a high level description of how a system _should_ work
  - to foster good mental model formation by the user

![](/thoughts/images/mental-vs-conceptual.png)

## Interface Types

Primarily concerned with:

- a function
- interaction style used
- input/output device used
- platform it's being designed for

E.g.:

- command
- graphical
- multimedia
- virtual reality
- web
- mobile
