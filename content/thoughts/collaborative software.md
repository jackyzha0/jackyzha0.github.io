---
title: "Collaborative software"
date: 2022-05-05
tags:
- seed
- pattern
---

Each user device has a local replica of the data and this local replica can be updated anytime (ideally even while offline), and re-sync with others when network is available

Challenge: how do we reconcile concurrent updates?

Two main families of algorithms
- Conflict-free Replicated Data Types ([[thoughts/CRDT|CRDTs]]) -- persists the causal order of operations
- [[thoughts/Operational Transform]] -- persists the final output of operations

I hosted a session about this at Andy Matuschak's unconference! It turns out a lot of people are thinking about collaborative software. See what we brainstormed: [Full FigJam file](https://www.figma.com/file/fHnlhboanqVVE4IOp7zqR0/New-interfaces-for-new-thoughts-in-the-new-year?node-id=0%3A1&t=PBIeeb2LlMLj9ySZ-0)

## A spectrum of collaboration
[Source](https://publish.obsidian.md/jessmartin/Collaboration+is+a+spectrum+from+asynchronous+to+fully+synchronous)

-   full async - no collaboration ever - has to be completely disconnected
-   async branching - [[thoughts/git|git]] flow, working in parallel universes temporarily, then merging back together
-   peripheral awareness - working in the same space while working separately (parallel play)
-   fully sync - pair programming  

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
	- Just being together and sharing a context with someone is itself a form of communication. In a CoCo space, creators can work on their projects in a shared digital context, in the _presence_ of others.
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
	- In addition to supporting _collaborative_ _projects_ where creators can contribute different parts to a single project, CoCo spaces also afford building new types of _collaborative_ _experiences_ as a group.
	- For instance, creators can collectively imagine and program a new kind of multiplayer pacman game where the pacman passes through each of their projects turn by turn and they can use shared variables to have a common score!

## CRDT Unlocks
### Concurrent Editing plugins
We can treat all plugins/external things (e.g. `git`, filesystem) as actors. [[thoughts/CRDT|CRDTs]] allow these changes to happen asynchronously

- An actor makes an editing request, which is an insertion of a sequence at a point relative to its snapshot of the buffer
- When the result eventually returns, the editor commits that request which might require a coordinate transform based on other edits that have arrived in the meantime