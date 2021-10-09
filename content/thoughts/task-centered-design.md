---
title: "Task-Centered System Design"
date: 2021-10-09
---

-   articulate concrete descriptions of real-world people doing their real-world tasks
-   use these description to determine which users and what tasks the system should support
-   prototype an interface that satisfy these requirements
-   evaluate the interface by performing a task-centred walkthrough

Strengths
-   practical way to ground designs to real user tasks
-   finding requirements at pre and early design stages

Limitations:
-   tasks almost always embody a process even if they are not specific to a specific technological implementation
-   may not encourage consideration of alternate ways to do tasks
-   may be hard to produce pure system- or process- independent tasks

## Understanding Tasks
Establishing requirements starts with identifying and understanding **task examples** (users and their tasks).

## Steps
1.  Identification (in pre-design)
    -   identify specific users (both status quo and [extremes](thoughts/data-distributions.md))
    -   ideally, this involves observing/interviewing the real end user. The next best option is to interview the end-user representative. When all else fails, articulate *expected* end-users
    -   articulate and analyze examples of realistic tasks
		-   say what the user *wants* to do but not how they would do it (should be interface agnostic, more like human needs)
2.  Requirements (finishing pre-design)
    -   decide which of these tasks and users the design will support
    -   rarely design a system that handles all possible users and tasks equally well (limitations: budget, diversity of possible users and tasks, can't cost-justify certain features)
    -   success is usually if around 90% coverage of users can do 90% of tasks reasonably well (these need to be defined well)
3.  Conceptual design (in early design)
    -   basic 'wireframe' of design representation and interaction sequences on these tasks, emphasizing user "mental model"
    -   each design should account for the expected user knowledge and motivation, where it takes into consideration the real world contexts of real users
4.  Walkthrough evaluation (earliest evaluations of designs)
    -   using your design(s), walk through the tasks to test proposed interface
	-   essentially role-playing; stay true to the spirit of what the person is trying to accomplish, what they know, and what is reasonable for them to do

## Personas
Personas are rich descriptions of typical users of the product under development on which the designers can focus on in designing products.

Based off of user profiles, they include description of user's behaviour, attitudes, activities, environment

A persona has 2 goals:
-   to help the designer make design decisions
-   reminds the team that real people will be using the product

## Scenarios
Scenarios show how tasks are handled by design:
-   what the user would see / do step-by-step when performing the task
-   task + design = scenario

Scenario is design-specific; task is design-independent

Natural way to explain what people are doing and stakeholders relate easily