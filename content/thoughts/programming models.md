---
title: "Programming Models"
date: 2023-03-18
tags:
  - seed
---

[[thoughts/system model|System models]] for programming.

## Technical Dimensions of Programming Systems

[Source](https://tomasp.net/techdims/)

![[thoughts/images/tech-dims.png|500]]

7 clusters

1. Interaction: how do users manifest their ideas, use the system to get a result, and generate new ideas in response?
   - How many layers of [[thoughts/feedback loops]] are present when translating a user's intention to getting a response?
     - For example, statically typed languages have three layers of feedback loops that are nested within each other
       1. Translating ideas into code
       2. Satisfying the type checker. Errors here will send programmers back to the first feedback loop (i.e. there is a mismatch between what user thinks the program does and what it actually does)
       3. Running the program and evaluates the run time behaviour.
     - The idea is that static checks can push bugs from cycle 3 to cycle 2, reducing the evaluation gulf at cycle 3 at the cost of increasing the total execution gulf in cycle 2 (and thus cycle 3 as well)
     - When the total evaluation gulf across all the cycles is minimized as to be imperceptible, we call this _immediate feedback_. Once the user has caused some change to the system, its effects (including errors) are immediately visible (automatically demanded).
       - Direct manipulation is a special case of an immediate feedback loop. The user sees and interacts with an artefact in a way that is as similar as possible to real life; this typically includes dragging with a cursor or finger in order to physically move a visual item, and is limited by the particular haptic technology in use.
   - How does the system facilitate the construction of abstractions?
     - A first principles approach involves thinking ahead of time about what the required abstraction will be (in the case of a programming language, perhaps an interface) and then encoding it in the system
     - Other systems may actually limit the construction of abstractions in order to encourage end users to work with concrete objects (direct manipulation)
       - Examples of this are Jupyter notebooks (previews after individual cells discourage creating abstractions, because then you would not be able to look inside your execution such a fine grained level) and spreadsheets
   - See also: [[thoughts/mental model]], [[thoughts/feedback loops#Interaction Design|feedback loops in interaction design]]
2. Notation: how are the different textual and visual programming notations related?
   - What notations are used to program the system and how are they related?
   - Surface vs internal notation
     - All programming systems build up structures in memory, which we can consider as an *internal notation* not usually visible to the user
     - What the user interacts with instead is the *surface notation*, typically one of text or shapes on a screen. Every interaction with the surface notation alters the internal notation in some way
   - Notational geography: do *similar expressions* in a particular notation represent *similar behavior*?
   - Is it good to have overlapping notations to do the same thing in an application? e.g. a keyboard shortcut and GUI menu?
     - For programming systems that use *overlapping notations*, we need to describe how the notations are synchronized.
   - See also: [[thoughts/notation]]
3. Conceptual structure: how do the parts fit together?
   - [[thoughts/composable|Composability]]: There exist building blocks which span a range of useful combinations. Composability is, in a sense, key to the notion of "programmability" and every programmable system will have some level of composability
   - Convenience: are there ready-made solutions to specific problems? i.e. what is the 'standard library' of the system?
   - Composability vs Convenience
     - Composability without convenience is a set of atoms or gears; theoretically, anything one wants could be built out of them, but one must do that work
     - Convenience without Composability is a bunch of standalone tools, none of which work with each other. You can do anything that each individual tool but nothing that combines them together. A lot of modern web applications are like this
   - Conceptual integrity: a drive exists in the Python programming language, which follows the principle that “There should be one—and preferably only one—obvious way to do it” in order to promote community consensus on a single coherent style.
     - The apotheosis of this approach can be found in early Smalltalk and Lisp machines, which were complete programming systems built around a single language.
     - Everything was done in one language, and so everything was represented with the datatypes of that language.
   - Conceptual openness: can be seen as championing the values of *[[thoughts/plurality|pluralism]]*, *compatibility*, or *conceptual openness* over conceptual integrity
   - See also: [[thoughts/Gall's law]]
4. Customizability: once a program exists in the system, how can it be extended and modified?
   - There are a number of interesting questions related to staging of customization. First, what is the notation used for customization? This may be the notation in which a program was initially created, but a system may also use a secondary notation for customization (consider Emacs using Emacs Lisp).
   - *Additive authoring* requires that system behaviours can be *changed* by simply *adding* a new expression containing addresses—in other words, anything can be *overriden* without being *erased*.
     - One example of this is CSS on the web. Given a web page, it is possible to modify almost any aspect of its appearance by simply *adding* additional rules to a CSS file.
5. Complexity: how does the system structure complexity and what level of detail is required?
   - There is a massive gap between the level of detail required by a computer, which executes a sequence of low-level instructions, and the human description of a program in higher-level terms.
   - Declarative vs imperative programming systems
     - [[thoughts/declarative programming|Declarative programming]] systems like SQL, Prolog or Datalog, the meaning of a program is still unambiguous, but it is not defined operationally—there is a (more or less deterministic) inference engine that solves the problem based on the provided description.
     - Whereas imperative programming systems rely on the programmer explicitly defining the steps and using the right abstractions
   - See also: [[thoughts/complexity]]
6. Errors: what does the system consider to be an error? How are they prevented and handled?
   - Distinguish between 4 types of errors
     1. Slip: transient human attention failure (e.g. typos)
     2. Lapse: caused by memory failure (e.g. incorrectly remembered method name)
     3. Mistake: logical error (e.g. bad design of an algorithm)
     4. Failure: system error caused by the system itself that the programmer has no control over (e.g. a hardware or a virtual machine failure)
   - Normally, error detection occurs in the feedback loops that the system implements.
     - What errors can be detected in which feedback loops and how?
     - How does the system respond when an error is detected?
       - The system may try to automatically recover from the error as best as possible ([[thoughts/CRDT|CRDTs]] take this approach)
       - The system may proceed as if the error did not happen
       - The system may ask a human to resolve the issue. This is common for errors that occur on a [[thoughts/semantics|semantic]] level
7. Adoptability: how does the system facilitate or obstruct adoption by both individuals and communities?
   - Learnability: systems can be made easier to learn in several ways:
     - Specializing to a specific application domain
     - Specializing to simple small-scale needs
     - Leveraging the background knowledge, skills, and terminologies of specific communities
     - Supporting learning with staged levels of complexity and assistive development tools
     - Collapsing heterogeneous technology stacks into simpler unified systems.
   - Adopting a technology is a costly investment in terms of time, money, and foregone opportunities. Can people be assured that the programming system will still be there in 5 years? A century?
   - See also: [[thoughts/design goals]], [[thoughts/notation]]
