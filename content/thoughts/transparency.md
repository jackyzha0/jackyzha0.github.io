---
title: "Transparency"
date: 2021-10-30
tags:
  - seed
---

[Source: What’s in a Category: Definitions of Authenticity, Transparency, and the Social-Bot by _Eseohe Ojo_](https://digitaltattoo.ubc.ca/2020/03/30/guest-post-whats-in-a-category-definitions-of-authenticity-transparency-and-the-social-bot/)

The process of identifying users is how social media platforms monetize their operations

Big companies avoid fully detailing how they identify and categorize uses, claiming that the information is "proprietary".

"They argue, this surveillance allows them ways to minimize the gamification of the social media system by disruptive actors, and by segmentation and differentiation, they may better protect the authentic user from the inauthentic."

## Algorithmic Transparency in the News Media

[PDF in Digital Journalism](http://www.nickdiakopoulos.com/wp-content/uploads/2016/07/Algorithmic-Transparency-in-the-News-Media-Final.pdf)

- Deuze (2005, 455) defines transparency as the “ways in which people both inside and external to journalism are given a chance to monitor, check, criticize and even intervene in the journalistic process.”
- Similarly, defines _algorithmic transparency_: what we define as the disclosure of information about algorithms to enable monitoring, checking, criticism, or intervention by interested parties.
- Even though transparency is not a new concept for holding governments and institutions accountable, its recent renaissance has been accompanied by changes in communication technologies (Fung, Graham, and Weil 2007)
  - Digital technologies have changed the access to and scrutiny of information by anyone with internet access, which Meijer (2009) broadly described as “computer-mediated transparency.”
- Transparency is generally considered a means to see the truth and motives behind people’s actions (Balkin 1999) and to ensure social accountability and trust (Breton 2006). On a very basic level, transparency allows access to more information which can influence power relationships between governments and citizens, business and customers, and in our case between news outlets and audiences (Bennis 2013). The access to more information also reduces uncertainty in social relations and theoretically increases trust (Cotterrell 1999), which is crucial in the maintenance of a functional society (Fukuyama 1995).
- But while transparency can be seen as beneficial to engendering trust, seeing the inner workings of a government, business, or newsroom can result in negative implications such as undermining competitive advantages or creating costs without concomitant gains (Granados and Gupta 2013).
- Challenges
  - What would motivate a news or media organization to disclose details about their algorithms? Costs identified in producing transparency information included: data preparation, documentation writing, source code polishing, and benchmark testing. “How does being transparent offset loss of revenue?"
  - Participants also suggested that disclosing aspects of how a proprietary algorithmic system works may hurt an organization’s technological competitive advantage, or open the system to manipulation by third parties. Yet it was recognized that people will game the system no matter what, and that by disclosing information publicly it would level the playing field or, as one participant (CS2) put it, “everybody has the same chance now because we all know the rules of the game.”

Cited as:

> Diakopoulos, N., & Koliska, M. (2017). Algorithmic transparency in the news media. _Digital journalism_, _5_(7), 809-828.

## Explanations as Mechanisms for Supporting Algorithmic Transparency

[PDF in CHI 2018](https://dl.acm.org/doi/pdf/10.1145/3173574.3173677)

- Transparency involves encountering non-obvious information that is difficult for an individual to learn or experience directly, about how and why a system works the way it does and what this means for the system’s outputs.
- Greater transparency allows people to question and critique a system in order to develop appropriate reliance, rather than blind faith
- Methods for transparency
  - algorithm audits, which investigate both how an algorithmic decision making system works, and what its impacts are
    - some have argued that platforms are intentionally opaque regarding details about their operation as a form of self-protection from competitors or others who attempt to “game” the system
  - providing explanations, a common approach in recommender systems that may help solve problems caused by lack of transparency in algorithmic decision-making systems
- How explanations are "white box descriptions"
  - They provide information about how a system produces a recommendation, particularly focusing on the system’s reasoning and data source
- Why explanations are "[[thoughts/black box|black box]] descriptions"
  - providing justifications for a system and its outcomes and explaining the motivations behind the system, but not disclosing how the system works.
  - These explanations fill an intention gap between a user’s needs and interests and the system’s goals, but do not provide any visibility into how the system works
- Transparency of mechanism vs outcome

Cited as:

> Rader, E., Cotter, K., & Cho, J. (2018, April). Explanations as mechanisms for supporting algorithmic transparency. In _Proceedings of the 2018 CHI conference on human factors in computing systems_ (pp. 1-13).

## ACM Principles for Algorithmic Transparency and Accountability

- Awareness: stakeholders of analytic systems should be aware of the biases + risks + potential harms their design, implementation, and use could cause
- Access and redress: encourage the adoption of mechanisms that allow questioning by and remediation for groups adversely affected by algorithmic decision making systems
- Accountability: institutions should be held responsible for decisions made by their algorithms, even if how the model arrived at its results is inexplicable
- Explanation: systems are encouraged to produce explanations of model output (regarding both procedures followed by algorithm as well as decisions made)
- Data Provenance: describe how the data was collected and should be maintained, along with an exploration of the potential biases induced by the data gathering process
- Auditability: models, algorithms, data, and decisions should be recorded so that they can be audited in cases where harm is suspected
- Validation + Testing: institutions should routinely use rigorous methods to validate their models (against discriminatory harm for example) and documents those methods.
