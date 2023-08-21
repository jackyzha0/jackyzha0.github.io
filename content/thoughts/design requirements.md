---
title: "Double Diamond Model of Design"
date: 2021-10-02
tags:
  - seed
---

Two main 'diamonds' of diverge-converge, one to find the right problem and the other to find the right solution (fulfilling human needs).

![Double-Diamond Model: Discover, define, develop, deliver](https://upload.wikimedia.org/wikipedia/commons/b/bd/Double_diamond.png)_Discover, define, develop, deliver_

![Interaction Design Lifecycle](https://www.researchgate.net/profile/Andre-Andre-8/publication/327907730/figure/fig1/AS:675449290100740@1538051068743/Interaction-Design-Lifecycle-Model.ppm)

The 4 basic activities for interaction design are as follows:

1. Discovering requirements (discover/define phase). Deciding what to design is key, and exploring the problem space is one way to decide. The goal is understanding the target users and the support an interactive product could provide.
2. Designing alternatives (develop phase). This can be 2 parts, conceptual design (producing the conceptual model of the product) or concrete design (detail of the product like colours, sounds, images, etc.)
3. Prototyping alternative designs to be communicated and assessed (develop phase). The process of designing behaviour of interactive products as well as look and feel. Doesn't necessarily need working software!
4. Evaluating the product and the UX it offers (develop phase). Determine the usability and acceptability of the product or design measured in terms of a variety of usability and user-experience criteria.

A few good questions to ask to better understand the problem:

- what are the human needs?
- who are the stakeholders?
- what are the central tasks?
- what might we want to learn? (evaluation goals)
- who should our participants be?

## Requirements

Requirements are **stable** descriptions of users' aspirations, goals, constraints, expectations etc that form a sound basis from which to start design activities (not rigid, might shift over long periods of time). They are also statements about an intended product that specifies what it is expected to do or how it will perform.

Discovering and communicating reqs is important bc defining what needs to be built supports technical developers and allows users to contribute more effectively

### Steps

1.  identify **human needs**

- which the proposed interactive system will support; task, goals, conditions; current problems and strengths

2.  identify all **users and other stakeholders**

- who do or perform the activity: groups, capabilities, motives, needs

3.  set **levels of support (metrics)**

- functionalities the system will provide; environmental constraints and user/stakeholder characteristics
- metrics: how we know if we have succeeded → can be quantitative or qualitative
- fit criterion is something that can be used to assess when the solution meets the requirement

### Kinds

1. **functional requirements:** describe what the product will do
2. **nonfunctional requirements:** describe the characteristics (sometimes called constraints) of the product
   1. **data requirements:** capture type, volatility, size/amount, persistence, accuracy, and value of required data
      - eg. app for buying/selling stocks has to have up-to-date and accurate data which is likely to change many times a day
   2. **environmental requirements:** context of use; circumstances in which the interactive product will operate. made up of:
      1. **physical environment:** lighting, noise, movement, dust expected in operational environment. Will users need to wear protective clothing, which may affect the choice of interface type?
      2. **social environment**: will data need to be shared? does sharing have to be synchronous or async?
      3. **organizational environment**: how good is user support likely to be, how easily is it obtained, how efficient or stable is the communication infrastructure, etc?
      4. **technical environment**: what tech will the product run on or need to be compatible with, and what technological limitations might be relevant?
   3. **user characteristics:** capture key attributes of user group. collection of characteristics for a typical user is a **user profile**
      - eg. abilities and skills, educational background, preference, personal circumstances, disabilities, novice/expert/casual or frequent user etc
   4. **usability goals and user experience goals**
      - **usability engineering:** approach in which specific measures for usability goals are agreed upon early in the dev process and used to track progress
