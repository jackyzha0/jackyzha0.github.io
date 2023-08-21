---
title: "Credible exit"
date: 2022-08-02
tags:
  - seed
  - pattern
---

One sub-branch of the Exit, Voice, and Loyalty model (based on [[thoughts/game theory|game theory]]).

## Exit, Voice, and Loyalty

There are two agents.

1. The Citizen
2. The Government

The assumption is that there is a change implemented by the Government which negatively harms the Citizen. The Citizen has one of three actions:

1. Exit: Citizen leaves
2. Voice: Citizen attempts to change the situation
   1. Government can either respond with 1) Respond or 2) Ignore
   2. If the Government chooses 2) Ignore, then the Citizen must choose between Exit or Ignore
3. Loyalty: Citizen does nothing, waits passively for conditions to improve

## Credible Exit

A few dimensions for credible exit in software:

- **I can export my data.** But usually, this doesn't work as data is _application specific_. No other app knows how to interpret that export unless it is explicitly supported. Export has the downside of being static. If you continue to use the app, your export becomes invalid. This makes export only really useful for hard exit. (see also: [[thoughts/interoperability]])
- **Data should be in a useful format**: exit happens through a common formats that work in other apps
- **You have all the tools to use the data without the app**: in other words, either the data is independent of application logic, or the application logic is transparent (i.e. the app is open source)
