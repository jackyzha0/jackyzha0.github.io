---
title: "Formality considered harmful"
date: 2022-11-01
tags:
  - seed
  - pattern
---

See also: [[thoughts/cozy software|cozy software]]

[Paper](https://www.csdl.tamu.edu/~shipman/papers/cscw.pdf) by Frank M. Shipman III and Catherine C. Marshall with the same name. On experiences, emerging themes, and directions on the use of formal representations in [[thoughts/interaction design|interactive designs]]

> The cause of a number of unexpected difficulties in human-computer interaction lies in users’ unwillingness or inability to make structure, content, or procedures explicit

When people use computer systems, their interaction is usually mediated by abstract representations that describe and constrain some aspect of their work or its content. Computer systems use these abstract representations to support their users’ activities in a variety of ways, like for [[thoughts/information retrieval]]. These abstractions are frequently referred to as formalisms.

At the formal end of the spectrum, knowledge-based systems require people to encode materials in a representation that can be fully interpreted by a computer program.

A la [[thoughts/Seeing like a State|Seeing like a State]]: excessive formalization may cause people to lose information that falls outside the prescribed structure, and in general require people to make knowledge explicit that may be difficult or undesirable to articulate

## Examples

- Experiences training information analysts to use NoteCards revealed that they had difficulties
  - Chunking information into cards (“How big is an idea? Can I put more than one paragraph on a card?”)
  - Naming cards (“What do I call this? Do I have to name this card before I can get it off the screen?”)
    - Once again, naming things is one of the most difficult parts of anything
  - Filing cards (“Where do I put this?”)
- People tend to cluster things spatially than via links
  - Instead of building large interconnected networks of nodes (like the designers expected), users created linkless spaces of nodes arranged in regular graphical patterns that indicated relationships among nodes spatially and visually
- There are many cognitive costs associated with adding formalized information to a computer system
  1.  Foremost, users must learn a system’s formal language
  2.  Even if they know a system’s formal language, users face a mismatch between their understanding of the information and the system’s formal representation (good teachers help to bridge this)
- Tacit knowledge poses a particularly challenging problem for adding formal structure and content to any system since, by its very nature, people do not explicitly acknowledge tacit knowledge
  - When a person is asked to breath normally, their normal breathing will be interrupted
- Structure changes with time
  - Since a user’s understanding of any non-trivial task, such as performing an analysis or completing a design, evolves as they attempt to complete the task, users resist making such commitments
  - Same with [[thoughts/terminology#Terminological anchoring|terminological anchoring]]
  - There is a perception that information formalized incorrectly or inconsistently will be more difficult to use or simply be of less use than information not formalized.
    - Hence why we leave many tabs open or things on our desk/desktop

## Fixes

- Keep things simple and out of the way for the user ([[thoughts/Gall's law]]).
- Incremental formalization
  - In the Hyper-Object Substrate (HOS) (Shipman, McCall, 1994) we have investigated the potential to support users by suggesting possible formalizations based on recognized patterns in textual information. In HOS, suggestions for new attributes or relations in the knowledge base were presented to the user for acceptance, modification, rejection, or just to be ignored
  - These are effective as long as they don’t overwhelm a user with too many requests to acknowledge inferred structure

## [[thoughts/tools for thought|Tools for thought]]

I think this applies for thinking and note-taking too. My thesis is that having a scratch space be incredibly low friction to access (on par with or lower than Apple Notes) is incredibly important to cultivating good knowledge/deadline management. See: [[thoughts/Projects#Tabspace - a scratchspace for your new tab page|TabSpace]]
