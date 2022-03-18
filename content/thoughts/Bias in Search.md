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