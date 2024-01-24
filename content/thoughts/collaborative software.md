---
title: "Collaborative software"
date: 2022-05-05
tags:
  - seed
  - pattern
---

> Collaborative computing focuses on group rather than individual problem solving and decision making tasks necessary to accomplish business and scientific objectives. It provides an environment in which people can share information without the constraints of space and time.

Each user device has a local replica of the data and this local replica can be updated anytime (ideally even while offline), and re-sync with others when network is available

Challenge: how do we reconcile concurrent updates?

Two main families of algorithms

- Conflict-free Replicated Data Types ([[thoughts/CRDT|CRDTs]]) -- persists the causal order of operations
- [[thoughts/Operational Transform]] -- persists the final output of operations

I hosted a session about this at Andy Matuschak's unconference! It turns out a lot of people are thinking about collaborative software. See what we brainstormed: [Full FigJam file](https://www.figma.com/file/fHnlhboanqVVE4IOp7zqR0/New-interfaces-for-new-thoughts-in-the-new-year?node-id=0%3A1&t=PBIeeb2LlMLj9ySZ-0)

## A spectrum of collaboration

[Source](https://publish.obsidian.md/jessmartin/Collaboration+is+a+spectrum+from+asynchronous+to+fully+synchronous)

- full async - no collaboration ever - has to be completely disconnected
- async branching - [[thoughts/git|git]] flow, working in parallel universes temporarily, then merging back together
- peripheral awareness - working in the same space while working separately (parallel play)
- fully sync - pair programming

When we're collaborating with others, there's a natural human tendency to desire some privacy while working through something, the freedom to take a piece of the creative work and play out different ideas, move things around, edit and refactor, without fear of judgement or the burden of having to explain or communicate our thinking or concern for overhauling sections where another is actively reading or working.

How do we make private 'forking' really easy and seamless?

## Knobs over Switches

[Source](https://medium.com/mit-media-lab/meet-coco-a-real-time-co-creative-learning-platform-for-young-people-bdfe23edd5a7)

CoCo has been doing a lot of important pioneering work in this direction.

Typically, in the context of digital creative tools, there are primarily two predominant modes of engagement that are often being developed or thought about.

1. Tools for working on your own on creative projects and then sharing the published works with others.
2. Tools for working together on the same creative project with others (such as, drawing on the same canvas, making edits to the code in the same project, or writing together in the same document, etc.)

Just like how a knob affords finer control over one’s preferences, similarly, a CoCo space is designed to provide creators with the agency to choose when and in what way they’d like to engage with their peers, based on their own comfort and preferences at any moment.

1. Just being together: parallel play
   - Just being together and sharing a context with someone is itself a form of communication. In a CoCo space, creators can work on their projects in a shared digital context, in the *presence* of others.
   - This is cursor chat and presence
2. Finding inspiration
   - It can be challenging for young people to get started on a blank canvas in any open-ended creative environment. In a CoCo space, even though learners get to work on their own projects, they are always surrounded by multiple points of inspirations in the form of the mini live windows showing their peers’ creative explorations in real-time.
3. Live remixing
   - CoCo spaces also support live remixing of code and other digital assets between peers. Any creator can drag and drop a piece of code from another creator’s project on to their mini window and it will instantly appear in their own project.
   - It is similar in essence to a sight of children sitting around the same table and freely passing and sharing craft materials with one another.
   - Part of why I think Midjourney was so successful was this! People could see what other people used as prompts and remixed it in their own work
4. Creative Interaction
   - The CoCo Blocks environment introduces a variety of new peer programming blocks — Signals, Waves, and Shared Variables. Creators can use these blocks to make their project trigger something in their peers’ projects in real-time and also get to see the outcome instantly.
5. Collaborative experiences
   - In addition to supporting *collaborative* *projects* where creators can contribute different parts to a single project, CoCo spaces also afford building new types of *collaborative* *experiences* as a group.
   - For instance, creators can collectively imagine and program a new kind of multiplayer pacman game where the pacman passes through each of their projects turn by turn and they can use shared variables to have a common score!

## Eras of Computing
  
Before the era of mainframe time sharing, computing relied heavily on batch processing, particularly punch card systems. In the early to mid-20th century, machines like the IBM 650 Magnetic Drum Data Processing Machine were pivotal in handling large volumes of data. Users would prepare decks of punched cards representing their tasks, and these cards would be processed sequentially in batches by the computer. The reliance on batch processing meant that users had to wait for the entire batch of cards to be processed before receiving results which meant that people make queues and schedules around when to run their jobs.

The transition to mainframe time sharing marked a departure from this sequential processing model. The IBM System/360, introduced in 1964, played a crucial role in this shift. It allowed multiple users to interact with the computer simultaneously, increasing efficiency compared to the earlier batch processing systems. Now, multiple people could connect their own terminal to the machine while maintaining their own individual workspaces. Because the underlying machine was the same, resources could be shared across sessions relatively easily.

The 1980s and 1990s witnessed the advent of personal computing, with machines like the IBM Personal Computer (IBM PC) and the Apple Macintosh. These personal computers became household fixtures, shared among family members. Because of the initial high price of these machines combined with the lack of sophisticated account management, these were mostly communal fixtures where there was only often one 'family computer' that was shared.

As the price of personal computers dropped and they became smaller, we finally saw a departure from shared home PCs as individuals sought the convenience of truly personal computing.

Now, we are seeing a return to communal computing as people are realizing the importance of collaboration and shared digital spaces.

### Questions for communal computing

1. Identity: do we know all of the people who are using the device?
2. Privacy: are we exposing (or hiding) the right content for all of the people with access? (see also: [[thoughts/privacy#Contextual Privacy]])
3. Security: are we allowing all of the people using the device to do or see what they should and are we protecting the content from people that shouldn’t?
4. Experience: what is the contextually appropriate display or next action?
5. Ownership: who owns all of the data and services attached to the device that multiple people are using?

## CRDT Unlocks

### Concurrent Editing plugins

We can treat all plugins/external things (e.g. `git`, filesystem) as actors. [[thoughts/CRDT|CRDTs]] allow these changes to happen asynchronously

- An actor makes an editing request, which is an insertion of a sequence at a point relative to its snapshot of the buffer
- When the result eventually returns, the editor commits that request which might require a coordinate transform based on other edits that have arrived in the meantime
