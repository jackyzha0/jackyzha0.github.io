---
title: "Prototyping"
date: 2021-12-12
---

The point is to make ideas real. They are (limited) representations of conceptual designs for users to interact with.

![](/thoughts/images/prototype.png)

### Why prototype?
-   **save time and money** → don't waste time coding/building the wrong thing
-   **communication** → discuss ideas with stakeholders
-   **evaluate** interface effectiveness for communicating conceptual model
-   further develop **conceptual and physical design**

### Before prototyping
Identify:
-   **questions** that your prototype(s) need to answer
-   **requirements** you need to address
-   **users and tasks** that your prototype(s) will support

## Discount Evaluation
### Cognitive Walkthroughs (mental model)
A method to evaluate the mental model that's supported by your conceptual design. Assesses exploratory learning stage (new/casual users). Mostly for early design stage.

Two methods of conducting CWs:
1. Structured Approach
	1. prepared steps, assess according to expected actions/system response
	2. at each step, assess using the prepared questions
2. Open-ended Approach
	1. give the CW participant only the **_higher level directives_**
	2. eg. "create an event note with the following attributes..."
	3. note divergences from expected

Process:
1. **start** with a scenario (task examples + design → scenario)
2.  break task down into steps of user actions (expected system response)
3.  carry out each step on the existing interface and ask:
    1.  will the user know what to do?
    2.  will the user see how to do the action?
    3.  will the user correctly understand the system response?
4.  if you locate a problem, mark it and pretend it has been repaired; then go on to the next step

-   not for:
    -   assessing performance at highly skilled, frequently performed tasks
-   disadvantage:
    -   limited utility for frequent-use interfaces, narrow focus, time consuming and laborious (compared to other discount methods)

### Heuristic Evaluation (fine tune)
Suitable for broader audience design (including expert). Fine-tunes the interface (hi-fi prototypes; deployed systems). Conducted by professionals

## Acquiring Mental Models
1. Using the system (hands-on learning)
2. Observing others using the system
3. Reading about a system (documentation)

## Interaction Types
Deciding upon which of the interaction types to use, and why, can help designers formulate a conceptual model before committing to a particular interface

1. Instructing: users issue instructions to a system
2. Conversing: users have a dialog with a system
3. Manipulating: users interact with objects in a virtual or physical space by manipulating them
4. Exploring: users move through a virtual environment or a physical space
5. Responding: system initiates the interaction and the user chooses whether to respond

## Fidelity
Fidelity is partly a matter of completeness. As you get more hi-fi it become more close to the actual deployment platform

6 dimensions to fidelity → fidelity is a spectrum. It is *complicated* to prototype multiple dimensions at once, so don't!
-   **visual realism:** how real it _looks._ polish, graphic imagery
-   **physical realism:** shape and form for 3D objects; feel
-   **scope:** how many features/functionalities included; horizontal vs. vertical
-   **data:** operates on real vs. faked data
-   **autonomy:** requires "supervision" vs. operates alone
-   **platform:** interim vs. final implementation

### Lo-fi
Rough (but flexible) proof-of-concept of interface design. Useful for generating or narrowing down requirements.

Benefits
- cheap/easy to make -> intended to be thrown away
-   lack of polish → less intimidating for users (surprisingly important!)
    -   avoids nitpick feedback
    -   inspires more creative feedback
    -   more willingness to criticize

### Mid/hi-fi
Increasing in **completeness** and **detail**
- higher degree of functionality
- higher degree of polish

## Vertical vs Horizontal
**Vertical prototype**:
-   includes in-depth functionality for only a few selected features
-   key design ideas can be tested in depth

**Horizontal prototype**
-   surface layers only: includes the entire user interface with no underlying functionality
-   a simulation; no real work can be performed

### Wizard of Oz
Method of testing a system that does not yet exist

-   human simulates system's intelligence and interacts with user
-   user
    -   uses real or mock interface as expected
    -   "Pay no attention to the man behind the curtain"
-   "wizard" (sometimes hidden):
    -   interprets subject's input according to a **preset algorithm**
    -   has computer/screen behave in appropriate manner

Possible downside is that the human can over-/under-estimate the quality of the actual technology being simulated.

## HTML Prototyping
1. Address issues of provided functionality and content
 	- rough outline of functions provided by the system, group related functions together
 	- evaluation
		- do you cover all functions needed for common user tasks
		- are there critical tasks that you have not considered?
		- are the available resources sufficient?
2. Break content into screens
	- use `<hr>` to break content into screens, start with one screen per major function
	- define logical user interface events that should be detected on each screen
	- evaluation
		- are there too many screens?
		- are individual screens too complex?
		- can needed events be deleted?
3. Address issues of screen flow
	- define links between events and result screens (allowing it to be 'runnable')
	- evaluation
		- is the length of a typical session too long?
		- are there too many steps needed for common tasks?
		- is navigation straightforward? are provided navigational aids sufficient?
4. Address issues of presentation
	- format screens to roughly look like finished product
	- link specific logical events to buttons (rather than whole screen flows)
	- evaluation
		- is there enough space to show all info on a given screen?
		-   is the rough layout of each screen clear? consistent?
		-   are key screen elements easy to find?
		-   are messages phrased clearly? appropriate for context?
5. Gather metrics and feedback from more evaluators
	- break screens into separate HTML pages
	- visualize overall UI structure using website mapping tools
	-   add hit counters to pages or use other monitoring techniques
	-   use email links or HTML forms to gather feedback from evaluators
	-   evaluation
		- does the site map reveal sequences that are too long? dead ends? parallel structures?
		-   which pages get the most traffic?
		-   which pages get the least traffic? which are never used?
		-   what do the evaluators have to say?