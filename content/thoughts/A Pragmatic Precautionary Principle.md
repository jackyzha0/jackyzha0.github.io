---
title: "A Pragmatic Precautionary Principle"
date: 2022-11-29
tags:
  - fruit
  - PHIL321A
---

> _Final paper for PHIL321_

The [[thoughts/Precautionary Principle|Precautionary Principle]] has had many different interpretations across [[thoughts/game theory]]; there is no single accepted formulation. In general, the Precautionary Principle suggests that we should take appropriate measures to prevent potential harm, even if the likelihood or severity of that harm is uncertain. However, part of the reason why there has been such heavy debate around Precautionary Principle is because many terms are already [[thoughts/meaning-laden]]: it is not always clear what constitutes appropriate precautionary measures, and different stakeholders may have different ideas about what is appropriate in a given situation.

If the principle is to be useful in policy-making, we must make it more concrete. The real meat of the matter comes down to how we characterize what constitutes a relevant thread and what threshold of certainty is necessary to enact action.

Neil A. Manson (2002) in _Formulating the Precautionary Principle_[^2], attempts to derive a more robust definition. In this paper, I will build on Manson's interpretation of the Precautionary Principle and argue that we should regard the weak formulation of the Precautionary Principle as unproblematic. In fact, I claim that controversy and refutations of the Precautionary Principle occur when there are issues of ill-defined terms or the formulation contradicts itself rather than a flaw with the core principle itself. That is, there are constructions of the Precautionary Principle that _are_ incoherent, but this does not mean that the Precautionary Principle as a whole is incoherent.

In the first part of the paper, Manson formalizes the Precautionary Principle into a general three-part structure shared between all versions: For a given _e-activity_ that may have a given _e-effect_ on the environment, the precautionary principle is supposed to indicate an _e-remedy_. Here, the terms e-activity, e-effect, and e-remedy refer to abstract elements of various Precautionary Principles (e.g. burning fossil fuels is an e-activity, climate change is an e-effect, and enacting a carbon tax is an e-remedy).

Additionally, Manson defines conditions on each of these terms. The damage condition specifies the characteristics of an e-effect in virtue of which precautionary measures should be considered. The knowledge condition specifies the status of knowledge regarding the causal connections between the e-activity and the e-effect. The remedy condition specifies the e-remedy that decision makers should take in response to the e-activity. Formally,"if the e-activity meets the damage condition and if the link between the e-activity and the e-effect meets the knowledge condition, then decision makers ought to enact the specified e-remedy" (Manson 2002, p. 265). This formulation, I argue, is unproblematic. We can boil it down to a simple logical entailment of the form $A \land B \rightarrow C$ where A is the damage condition, B is knowledge condition, and C is the remedy condition. The soundness of this statement heavily depends on what $A$, $B$, and $C$ are, but there is nothing inherently wrong with it in and of itself.

In the second part of the paper, he distinguishes a stronger formulation of the Precautionary Principle (which he dubs the Catastrophe Principle). The Catastrophe Principle is an instantiation of the Precautionary Principle where the damage condition is that the e-effect is catastrophic and the knowledge condition is that there is a possibility that the e-activity leads to the e-effect. That is, if there is even a mere possibility that something potentially catastrophic were to happen as a result of the activity, then we should unconditionally ban it.

Specifically, Manson argues that the stronger Catastrophe Principle is self-defeating but leaves the earlier formulation of the Precautionary Principle intact. Strong versions of the Precautionary Principle, if applied consistently, lead to paradoxical outcomes.

The careful reader will notice the similarities between the Catastrophe Principle and [[thoughts/Pascal's Wager|Pascal's Wager]]. As there is dominance of the action of believing in God over not believing in God, any rational decision maker must believe in God, no matter how low the probability of 'God does not exist' is.

Similarly, if we draw a decision table for the Catastrophe Principle, we see they follow a similar structure. Any rational decision maker should always enact the e-remedy given that there is a nonzero possibility that the e-activity leads to the e-effect.

|                | Knowledge Condition is met | Knowledge Condition is not met |
| -------------- | -------------------------- | ------------------------------ |
| Enact e-remedy | Finite                     | Finite                         |
| Do nothing     | $-\infty$                  | Finite                         |

Of course, Pascal’s Wager has been subjected to a number of philosophical criticisms. Manson specifically focuses on the “many gods” objection as a way to dismantle both Pascal's Wager and the Catastrophe Principle.

Although many have pointed out flaws to the many-gods objection, it still brings to light the following general point regarding the catastrophe principle: "even if an e-effect is catastrophic, that fact cannot rationally compel us to impose an e-remedy unless we also know that the e-remedy itself does not lead to catastrophic results"[^2] (Manson 2002, pp. 272-3).

A proponent of the Catastrophe Principle may then try to strengthen the principle by adding an extra clause stating that it should only be applied if imposing the given e-remedy will not cause another catastrophic e-effect. However, we quickly see that even with this clause, the Catastrophe Principle is still incoherent. Earlier, when we formulated both Pascal's Wager and the Precautionary Principle, we assumed that any rational decision maker would assign non-zero probabilities to any imaginable outcome (whether that be a belief in God or the knowledge condition being satisfied). Thus, we also cannot ever rule out the fact that a given e-remedy will not cause another catastrophic effect. The e-remedy could bring about an outcome which also leads to human extinction and we couldn't rule it out!

The upshot here is that even well-intentioned safety measures can lead to damaging consequences if we use the Catastrophe Principle. Note specifically, that this isn't a fatal blow for the weak formulation of the Precautionary Principle but rather just the Catastrophe Principle.

Manson concludes by saying that a formulation of the Precautionary Principle is coherent, if and only if, it meets a list of 5 core requirements. Of the ones that are applicable to this paper, Manson clarifies that the component concepts used in the conditions should be clearly defined and that the formulation must not be self-refuting. In the case of the Catastrophe Principle, the formulation was self-refuting, so it is not coherent.

Stephen M. Gardiner, in his 2006 work _A Core Precautionary Principle_[^3] shares Manson's central concern, stating that because of how low the epistemic standards for the application of the catastrophe principle are, there are always way to construct these mere possibilities in a way that not only recommends the action but prohibit it as well. Thus, it is incoherent.

Gardiner defines further criteria to narrow what should be considered a rational Precautionary Principle, noting that the real action involves identifying the relevant circumstances under which the Precautionary Principle is operative (Gardiner 2006, p. 38).

How do we distinguish between reasonable outcomes (ones we should consider) and those outcomes which are merely imaginable (ones we should not)?

Opponents may attempt to argue that the precautionary principle is committed to counting any imaginable outcome as possible, no matter how unreasonable it may seem. John Harsanyi makes an illustration of how foolish it may seem to consider unreasonable outcomes (Harsanyi in Gardiner 2006):

> If you took the [strong formulation of the precautionary] principle seriously then you could not ever cross the street (after all, you might be hit by a car); you could never drive over a bridge (after all, it might collapse); you could never get married (after all, it might end in a disaster), etc. If anybody really acted this way he would soon end up in a mental institution.

I argue that this argument depends heavily on the definition of 'possible.' Gardiner proposes that we add another circumstance so that the range of outcomes considered are in some appropriate sense "realistic," so that, for example, only credible threats are considered and cases like these do not arise.

This begs the question, what makes a circumstance realistic? This is a question Gardiner explicitly leaves out of his argumentation and assumes that such a criterion exists and does not take a position on what it would be.

I suspect that there is a human limit to the size of a [[thoughts/probability]] we find meaningful. Just like how the size of certain numbers are incomprehensible to humans, some probabilities are so unlikely that they are nearly meaningless.

Especially as we want this to serve as a framework to make practical decisions, we should discard probabilities that people implicitly discard. A good lower bound on if a probability event could feasibly happen is if it could have reasonably occurred within the timespan of the entire universe. This is effectively strengthening the knowledge condition by placing a lower bound on the conceivable range of probabilities we consider. Anything below this bound is considered negligible and assigned a probability of 0. As a result, this makes much more robust the conditions under which it is coherent to apply the Precautionary Principle.

In conclusion, I have illustrated how the Precautionary Principle itself, if carefully constructed, can come to coherent and rational decisions. By resolving issues with ill-defined terms or self-contradiction in the principle's formulation, we can create a more robust Precautionary Principle that is more suitable to pragmatic use cases like in environment decision making.

[^1]: Pascal, Blaise, 1623-1662. Pascal's Pensées. New York :E.P. Dutton, 1958.
[^2]: Manson, Neil A. 2002. “Formulating the Precautionary Principle.” Environmental Ethics 24, 263-274.
[^3]: Gardiner, Stephen M. 2006. “A Core Precautionary Principle.” The Journal of Political Philosophy 14, no. 1: 33-60.
[^4]: Neugebauer, T. (2010). Moral impossibility in the Petersburg Paradox: a literature survey and experimental evidence.
