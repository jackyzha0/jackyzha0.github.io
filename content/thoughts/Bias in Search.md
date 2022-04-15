---
title: "Bias in Search"
date: 2022-03-15
tags:
- seed
---

*Term paper for INFO303*

> One of the critiques of search engines is a **lack of transparency and potential for bias in their algorithms**.  This issue has become even more critical now that Artificial Intelligence is a core search technology.  Review and critically assess these concerns in light of the growing body of research that seeks to address Algorithmic Bias in search.  What methods are available or proposed to address this issue?

## Outline
*In approximately 250 words, outline your chosen topic, identify the scope and types of questions or issues you hope to explore.  If you are focusing on a particular type of search system or technology (e.g. conversational search, image search) provide some examples of applications; if you are focusing on an issue (e.g. bias, misinformation, privacy), provide some context or a specific case or example to specify your topic.*

I'm interested in tackling the concept of social bias in information retrieval systems, specifically within search engines.

Bias mainly shines through when these algorithms inherently quantize and decontextualize the data they work with. As seen in Ali Alkhatib's *To Live in Their Utopia*, algorithmic systems (specifically language models used in query comprehension) construct their own 'utopic' view of the world -- where everything conforms to the nice numbers and constraints it is provided. The data is cleaned and it has a clear mathematical function to optimize for. However, this 'sterilised' classification (a la James C. Scott's *Seeing Like a State*) and quantification of the world acts as an interpretive and transformational force that, if left unchecked, can lead to systematic biases in the system as it 'drifts'.

And yet, this isn't where the problems stop. When these systems inevitably spit out a result, how do we look at these results and correct these systems? There is a striking lack of tools around interpretability for large machine learning models like the Transformers used to understand natural language in the vast majority of search engines.

Fortunately, many researchers have poured thousands of hours into tackling these issues. Through this paper, I want to hone in on two main approaches:
1. More explainable systems: interpretable + explainable AI data provenance
2. More active feedback: Human-in-the-loop AI
Both of these work tightly with each other in order to reign in this model drift and prevent it from getting stuck in its own dangerous utopia. This is why feedback is important: bureaucracies with no power to self-correct (or be corrected) have no place in a world where people can freely walk away or reject the bureaucracy's nonsense.

References:
1. https://arxiv.org/abs/1606.08813
2. https://link.springer.com/book/10.1007/978-3-319-98932-7
3. https://ali-alkhatib.com/papers/chi/utopia/utopia.pdf

## Paper
> One of the critiques of search engines is a **lack of transparency and potential for bias in their algorithms**.  This issue has become even more critical now that Artificial Intelligence is a core search technology.  Review and critically assess these concerns in light of the growing body of research that seeks to address Algorithmic Bias in search.  What methods are available or proposed to address this issue?

## Part I: a detailed description of the topic or issue
- search is important for people to find what they need
	- scale is huge (teevan, dumais in Teevan 2018, p. 189)
	- billions of web pages with a wide range of modalities -universal search
	- and these are not curated!
		- no authority to mediate the content
		- this is what search supposedly helps solve
		- "The goal of a search engine is to connect its users with information resources that meet their information needs."
		- (teevan, dumais in Teevan p. 192)

- what is transparency and bias?
	- more on [[thoughts/transparency]] and [[thoughts/bias]]
- knowledge mediation
	- prioritize advertisers
- in the context of search
	- recommendation engines are increasingly personalized

## Part 2: an analysis of the associated societal benefits/harms and ethical issues
- [[thoughts/Algorithms of Oppression]]
- [[thoughts/attention economy]] -> klein's work
- [[thoughts/To Live in their Utopia]]
- search engines as oracle and as faith

- analyzing existing systems
	- https://aalab.informatik.uni-kl.de/publikationen/peer_review/PDFs/Krafft2021_Chapter_CrucialChallengesInLarge-Scale.pdf
	- "Black box analyses can be used to audit the decisions of an algorithmic system and to detect problematic patterns in them" -> necessary but not sufficient
- A problem is that search engines, like most other algorithmic systems embedded in a complex socio-technical system, are not a stable research subject
	1. The constant evolution of their code in a constantly improving software development process.
	2. User experience is in most cases not the same for all users: It might be altered in A/B tests and shaped by personalization
	3. The complexity of the socio-technical system in which they are embedded. Complexity emerges from the algorithmic system’s embedding in a heterogeneous assemblage of various types of social and technical entities that all feedback into the system [30]. Furthermore, algorithms in socio-technical systems are ontogenic, performative and contingent in nature [22]. This means, examining a stable representation of this sort of system is almost impossible due to their “contextual, contingent unfolding across situation, time and space” [22, p.21].
	4. Finally, inspection itself can affect the examination [2].

## Part 3: a discussion of how the issue can or should be addressed to minimize negative impacts and increase benefits.

FAIR: fairness-aware information retrieval evaluation
- "While many of the traditional information retrieval (IR) metrics can capture the relevance, diversity, and novelty for the utility with respect to users, they are not suitable for inferring whether the presented results are fair from the perspective of responsible information exposure. On the other hand, existing fairness metrics do not account for user utility or do not measure it adequately." (p. 1)
- vicious cycle of unfairness (p. 1)
	- items in the largest or the most prominent subtopic/aspect group may take up most of the search results, leaving little space for the minority aspects to surface
	- because users frequently only click on the top results, a ranking or recommendation algorithm that takes user feedback into account will continue putting those same items at the top
- fairness: subjective moderation of the ratio between different groups (p. 1)
	- comes from a social perspective with the purpose of social responsibility. it moderates the exposure of information so that different information and resources get fair chances to receive users' attention (p. 2)
	- different items should receive equal exposure, or exposure proportional to their utilities or impacts (p. 3)
	- most seek to optimize the system utility while satisfying a set of fairness constraints (p. 3)
		- instead propose to optimize directly for an integrated metric
	- algorithms that are designed to directly optimize such fairness metrics cannot guarantee and often decrease the optimal utility (p. 4)
	- fairness and utility are not necessarily orthogonal! (p. 4)
	- FAIR is designed with a focus on group fairness rather than individual fairness (p. 11)

addressing bias and fairness in Search Systems
- 

approaches to resolving bias in search
- downscaling existing search
	- boutique search engines
	- https://sariazout.mirror.xyz/7gSSTJ96SEyvXeljymglO3zN4H6DCgVnrNZq8_2NX1A

- algorithmic accountability 
	- https://aalab.informatik.uni-kl.de/publikationen/peer_review/PDFs/Krafft2021_Chapter_CrucialChallengesInLarge-Scale.pdf
	- Instead of explaining and justifying its own conduct, algorithmic accountability now focuses on the behavior of the algorithm or the algorithmic system in question, which has to be justified and explained by the person or company who puts it in use. Accordingly, this framework requires (1) an actor (individual, collective or organizational) who explains the behavior of the algorithm to (2) a forum which then challenges this account. The (3) relationship between the two is shaped by disclosure and discussion of (4) the account and its criteria, and ultimately (5) the consequences imposed by the forum
	- If the actor is held accountable for the results of proprietary algorithms, the latter usually remain undisclosed or obfuscated by design as they constitute trade secrets whose disclosure would allow gaming the system
- explainable AI
	- counter-claims
	- "revealing the ranking algorithm would lead to catastrophe, given the adversarial stance with spammers and SEOs."
