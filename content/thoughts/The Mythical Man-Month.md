---
title: The Mythical Man-Month
date: 2023-12-26
tags:
  - seed
  - book
---

## Quotes

- Men and months are interchangeable commodities only when a task can be partitioned among many workers *with no communication among them*. The bearing of a child takes 9 months, no matter how many women are assigned.
- The second system an engineer ever builds is the most dangerous one they ever design; the general tendency is to over-design it.
- Brook's law: *Adding manpower to a late software project makes it later.*
- "Never go to sea with two chronometers; take one or three." The same thing clearly applies to prose and formal definitions. If one has both, one must be the standard and the other must be a derivative description, clearly labeled as such.
- The programmer at wit's end can often do best by disentangling himself from his code, rearing back, and contemplating his data. Representation *is* the essence of programming.
- The reluctance to document designs is not due merely to laziness or time pressure. Instead it comes from the designer's reluctance to commit himself to the defense of decisions which he knows to be tentative. "By documenting a design, the designer exposes himself to the criticisms of everyone, and he must be able to defend everything he writes. If the organizational structure is threatening in any way, nothing is going to be documented until it is completely defensible."
	- The corollary being that nothing meaningful or forward-leaning is completely defensible so will never be documented.
- Niklaus Wirth's refinement steps:
	1. One sketches a rough task definition and a rough solution method that achieves the principal result.
	2. Then, one examines the definition more closely to see how the result differs from what it wanted, and one takes the large steps of the solution and breaks them down into smaller steps.
	3. Each refinement in the definition of the tasks becomes a refinement in the algorithm for the solution, and each may be accompanied by a refinement in the data representation.
	4. From this process one identifies *modules* of solution or of data whose further refinement can proceed independently of other work. 
- "Coding is '90 percent finished' for half of the total coding time. Debugging is '99 percent complete' most of the time. 'Planning complete' is an event one can proclaim almost at will."
- To write a useful prose description, stand way back and come in slowly:
	1. Purpose: what is the main function, the reason for the program?
	2. Environment: on what machines, hardware configurations, and operating system configurations will it run?
	3. Domain and range: what domain of input is valid? What range of output can legitimately appear?
	4. Functions realized and algorithms used: precisely what does it do?
	5. Input-output formats: precise and complete.
	6. Operating instructions: including normal and abnormal ending behaviour, as seen at the console and on the outputs.
	7. Options: what choices does the user have about functions? Exactly how are those choices specified?
	8. Running time: how long does it take to do a problem of specified size on a specified configuration?
	9. Accuracy and checking: how precise are the answers expected to be? What means of checking accuracy are incorporated?
- Automatic programming always has been a euphemism for programming with a higher-level language than was presently available to the programmer.
- The screens of today are too small, in pixels, to show both the scope and the resolution of any serious detailed software diagram. The so-called "[[thoughts/desktop metaphor|desktop metaphor]]" of today's workstation is instead an "airplane-seat" metaphor. Anyone who has shuffled a lapful of papers while seated in coach between two portly passengers will recognize the difference -- one can see only a very few things at once... Moreover, when fits of creativity run strong, more than one programmer or writer has been known to abandon the desktop for the more spacious floor.
- Even perfect program verification can only establish that a program meets its specification. The hardest part of the software task is arriving at a complete and consistent specification, and much of the essence of building a program is in fact the debugging of the specification.
- Growing complex software systems via incremental development.
	- The system should first be made to run, even though it does nothing useful except call the proper set of dummy subprograms.
	- Then, bit by bit it is fleshed out, with the subprograms in turn being developed into actions or calls to empty stubs in the level below.
	- The morale effects especially are startling. Enthusiasm jumps when there is a running system, even a simple one. Efforts redouble when the first picture from a new graphics software system appears on the screen, even if it is only a rectangle. One always has, at every stage in the process, a working system.
- The principle of subsidiary function teaches us that the center will gain in authority and effectiveness if the freedom and responsibility of the lower formations are carefully preserved, with the result that the organization as a whole will be "happier and more prosperous." How cans such a structure be achieved?... The large organization will consist of many semi-autonomous units, which we may call quasi-firms. Each of them will have a large amount of freedom, to give the greatest possible chance to creativity and entrepreneurship... each quasi-form must have both a profit and loss account, and a balance sheet.