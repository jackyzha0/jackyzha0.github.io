---
title: "Bias in Search"
date: 2022-03-15
tags:
  - fruit
---

_Term paper for INFO303_

> One of the critiques of search engines is a **lack of transparency and potential for bias in their algorithms**.  This issue has become even more critical now that Artificial Intelligence is a core search technology.  Review and critically assess these concerns in light of the growing body of research that seeks to address Algorithmic Bias in search.  What methods are available or proposed to address this issue?

## Part I: a detailed description of the topic or issue

The scale of the web is huge, spanning many billions of web pages with a wide range of modalities (Teevan & Dumais in Ruthven & Kelly, 2011, p. 189). It is obvious that search is important for people to find what they need amidst the sprawling web we call the internet. Search engines connect its users with information resources that meet their information needs (Teevan & Dumais in Ruthven & Kelly, 2011, p. 192).

Search engines, then, are like gateways to the information on the web, allowing easy and universal access to online information to all of its users, and defining what is relevant, knowable, and authoritative. On the other hand, these arbiters of digital information can also create embedded [[thoughts/bias|biases]] that cause knowledge disparity and allow for ill-informed decision making for information-seekers (Gao & Shah, 2021, p. 2643; Friedman & Nissenbaum, 1996).

This paper seeks to critically examine some critique leveraged at these search engines around lack of transparency and potential for bias in their indexing, search, and ranking algorithms and conducts a brief survey over different methods of mitigating or addressing these issues.

First, let us cover some basic terminology around what lack of transparency and bias mean in the context of this paper.

In conjunction with the rise of [[thoughts/LLMs|large language models]] for understanding queries, search has become very difficult to 'explain'. The problem is no longer understanding a transparent algorithm (like PageRank), but rather finding out exactly _why_ the search engine result gave the result it did. Current search engines lack any indication of how they use your personal data to personalize the results, how the language model understands your query, or what determines search ranking. Diakopoulos and Koliska refer to this phenomena as a lack of _algorithmic transparency_. [[thoughts/transparency|Transparency]] itself is the disclosure of information about algorithms to enable monitoring, checking, criticism, or intervention by interested parties (Diakopoulos & Koliska, 2017).

Additionally, search engines are not the fully neutral, mathematically absolute systems they sometimes claim to be. Instead, they have embedded biases that inherently favour some values over others, for example favouring some types of sites over others in query results. Here, we use Friedman and Nissenbaum's definition of bias from their influential work _Bias in computer systems_: "[bias refers] to computer systems that systematically and unfairly discriminate against certain individuals or groups of individuals in favour of others... A system discriminates unfairly if it denies an opportunity or a good or if it assigns an undesirable outcome to an individual or group of individuals on grounds that are unreasonable or inappropriate" (1996, p. 332). For example, the orderings of results themselves can create exposure bias due to their considerable impacts on relevance and click-through rates. It is clear that biases that are woven in search systems are becoming increasing threats to information seeking and sense-making processes (Friedman & Nissenbaum, 1996).

## Part 2: an analysis of the associated societal benefits/harms and ethical issues

However, the impact of these search systems go much deeper than making it hard to find what you are looking for. If these search engines are gatekeepers, then they also influence the values that surround what is being searched for. This means that minority groups often have their own values and identities influenced by the majority: a form of [[thoughts/double-consciousness]] that Safiya Umoja Noble describes in her seminal work _Algorithms of Oppression_ (Noble, 2018). If the majority rules in search engine results, then how might those who are in the minority ever be able to influence or control the way they are represented in a search engine?

Furthermore, Ali Alkhatib's work paints an even grimmer possible future where algorithmic systems live in a sort of [[thoughts/potemkin village]] or pseudo-reality of their own construction that they see the world as (Alkhatib, 2021). Large search engine companies like Google have massive stores of personal data in the attempts of modelling and predicting who we are and what we will do next (Pariser in Alkhatib, 2021). In doing so, these algorithmic systems produce a simplified yet inaccurate view of the world. However, the problem is not in creating these models, but from projecting the models onto the world to try and create change. These systems become more actively dangerous when they go from "making sense of the world" to "making the world make sense" (Alkhatib, 2021).

Of course, this is exactly what these search engines are doing. They attempt to use these models to alter what information they feed to us, which in turn shapes our information seeking behaviour and what we know. Pariser (2011) points out that "[search personalization] serves up a kind of invisible autopropaganda, indoctrinating us with our own ideas, amplifying our desire for things that are familiar and leaving us oblivious to the dangers lurking in the dark territory of the unknown".

The problem is exacerbated when these 'abridged maps' of the world start diverging from reality and people can't override the delusions baked into those imaginations. Echoing Noble's earlier work, this creates vicious cycles of unfairness where users frequently only click on the top results and a ranking or recommendation algorithm that takes user feedback into account will continue putting those same items at the top, reinforcing what the algorithm _believes_ to be true about the world. As the power dynamics unfold and play out, the system drifts further and further away from reality (Gao, Ge, & Shah, 2021). This is why data and power monopolies are so dangerous. These bureaucracies that have no power to self-correct (or allow themselves to be corrected) leads to a world where people cannot freely walk away or reject the bureaucracy's nonsense model of the world (Alkhatib, 2021). If there is no way for the users to speak up and to demand change, then it becomes an Orwellian nightmare where these search engines become sources that dictate _truth_.

The large scale usage of these search engines have now changed their positions in society from aggregators of information to arbiters and oracles of truth. Historically, search algorithms relied on perhaps complex algorithms but all they did was rank literally whats relevant and ask the user to determine what info they actually need with respect to their query. Now, more search engines are leaning into trying to tell you the 'right' answer in an effort to reduce the number of clicks it takes for the average user to find the answer they are looking for. Yet none of these results are actually _objective._ These engines freely provide "a sorting of the wheat from the chaff, and answer our most profound and most trivial questions" and in doing so, become an object of faith (Noble, 2018). Cathy O'Neil likens search engines to objects of faith: "Like gods, these mathematical models were opaque, their workings invisible to all but the highest priests in their domain: mathematicians and computer scientists" (2016). Many searchers view the results of these searches as objective truth.

This misconception of search engines as sources of truth leads to epistemologically irrational behaviour where searchers take the answer of these algorithms without critically examining them or performing their own further research.

## Part 3: a discussion of how the issue can or should be addressed to minimize negative impacts and increase benefits.

With such a significant problem with one of the most critical pieces of our modern day information seeking, many have attempted to try to mitigate some of the negative impacts of these search systems. The following section briefly surveys a variety of different methods for addressing these problems.

### Fairness-aware Algorithms

One such approach are fairness-aware algorithms which aim to integrate metrics of diversity and fairness along with more traditional [[thoughts/information retrieval]] metrics like relevance and novelty. We look to Gao, Ge, and Shah's 2021 work on _FAIR: Fairness-aware information retrieval evaluation_ as a case study.

They define fairness as the subjective moderation of the ratio between different groups (p. 1). This approach to fairness comes from a more social perspective which attempts to moderate the exposure of information so that "different information and resources get fair chances to receive users' attention" (p. 2). They argue that search currently does a poor job of distributing attention across a diverse set of results and that we should look to fairness-aware algorithms where "different items should receive equal exposure, or exposure proportional to their utilities or impacts" (p. 3).

To do so, they propose to optimize directly for an _integrated_ metric -- arguing that fairness and utility are not necessarily orthogonal and optimizing for one does not necessarily lead to a decline in quality in another.

Of course, this is not without limitations either. Fairness-aware algorithms like FAIR seem promising but have yet to see more mainstream adoption from large search companies. Additionally, FAIR is designed with a focus on group fairness rather than individual fairness (p. 11), which makes it much more difficult to adapt to the standard of personalized search we see today.

### Algorithmic Transparency

Another method is to vie for more [[thoughts/explainability|explainable]] search systems. Explainable recommendation and search, as defined by Zhang, Zhang, and Zhang, are "models or methods that not only generate high-quality recommendation or search results, but also intuitive explanations of the results for users or system designers, which can help to improve the system transparency, persuasiveness, trustworthiness, and effectiveness, etc." (p. 1411).

Work done by Rader, Cotter, and Cho show potential for including _explanations_ in search rankings and feed as ways of improving algorithmic transparency about how the search engine result arrived at its answer (2018), citing what factors contributed to why certain results appear to users.

However, this method is not without critique either. Some mention that revealing the ranking algorithm would lead to catastrophe, given the adversarial stance between search and spammers and SEOs. Granados and Gupta agree, citing that while transparency can be seen as beneficial to engendering trust, "seeing the inner workings of a government, business, or newsroom can result in negative implications such as undermining competitive advantages or creating costs without concomitant gains" (Granados & Gupta cited in Diakopoulos & Koliska, 2017).

Diakopoulos and Koliska noted that participants in their study recognized this issue but still found it did not detract from the necessity of transparent systems, citing that "people will game the system no matter what, and that by disclosing information publicly it would level the playing field" (2017). Leveling the playing field, in this context likely refers to healthy competitive advantage that prevents the same monopolies of power that Alkhatib's work mentioned.

### Algorithmic Accountability

Another potential approach is to better hold search engine companies [[thoughts/accountability|accountable]] for the results of search rather than making the algorithms themselves explicitly transparent.

Krafft, Reber, Krafft, Coutrier, and Zweig define the concept of algorithmic accountability, which focuses on the behavior of the algorithm or the algorithmic system in question which has to be justified and explained by the person or company who puts it in use (Krafft & Reber, et al. 2021).

This approach is more of a 'black-box' approach which doesn't require a transparent understanding of how the algorithmic system works for it to be held accountable, only for the effects to be known. Krafft et. al. specifically note this advantage over approaches that focus on transparency, citing that with accountability approaches, the workings of the algorithms themselves usually "remain undisclosed or obfuscated by design as they constitute trade secrets whose disclosure would allow gaming the system" (p. 2).

The ACM similarly outlines 7 principles for algorithmic transparency and accountability (ACM, 2017): awareness, access and redress, accountability, explanation, data provenance, auditability, and validation and testing. The main focus that the ACM is trying to drive is that groups affected by these algorithmic systems should be able to 1) be aware of biases + risks, 2) have enough context and data to have informed feedback, and 3) have a way to give feedback and hold the systems and their creators accountable.

Having human and legal entities take responsibility for the actions of their algorithms helps to prevent cases where people blame algorithms and data for being biased in order to shift the responsibility off of themselves. This form of human-in-the-loop computer system helps to prevent the algorithmic model of the world from being too detached from the real one.

### Personal Search Engines

Perhaps a more radical approach that is less explored in the academic space is one that advocates instead of extreme personalization (and thus bias) in search.

Eric Goldman in fact strongly advocates for this approach, suggesting that perhaps problems involving _objectivity_ in these search engines that claim to be arbiters of truth to be solved by increasing _subjectivity_ through the form of personalization in these results (Goldman, 2008). If each search is tailored to the individual, it is not espousing on _truth_ to anyone, it will rather be a suggestion than an objective truth.

Goldman goes on further to say that increasingly personalized search algorithms will "reduce the effect of search engine bias because there will likely be multiple ‘top’ search results of a particular search term instead of a single winner [and] personalized algorithms will eliminate many of the current concerns about search engine bias" (p. 130).

Sari Azout advocates for a world in which search engines are not universal, but rather boutique and personal (Azout, 2021). The big thing here is that universal search sites like Google use the same interface to search everything, relying on natural language to decipher user intentions. Vertical search players like Yelp/Zillow use domain specific knowledge to take away some of the guessing that universal search needs to go through by encoding it through structured search formats appropriate to the medium.

In this model of search, search engines are not oracles but rather another opinion for you to consider you in your information-seeking journey.

### Conclusion

It does not feel like there is a single 'silver bullet' solution to bias and lack of transparency in the search space. If it was that easy, I'm sure it would have been developed and implemented already. This is clearly a nuanced space with a lot of interplaying factors that make it hard to find any one 'objectively good' solution to these problems.

Like Krafft and Reber mention in their paper analyzing challenges in [[thoughts/black box|black box]] analyses, "search engines, like most other algorithmic systems embedded in a complex socio-technical system, are not a stable research subject" (Krafft & Reber, et al. 2021). The search experience is constantly changing due to companies running A/B tests to optimize their advertisement conversion numbers and user engagement, world events that affect what is popular and searched for, previous search behaviour that affects the engine's model of you and the world (Krafft & Reber, et al. 2021). These are just a few of the many problems search engine researchers come across when trying to be exact in their science of dissecting and probing these algorithmic systems.

These systems are so deeply entrenched within our society that there is no way to 'isolate' changes in any one part of the system. It is incredibly hard to prod and fix these issues when they are constantly changing and adapting, but that doesn't mean there hasn't been good attempts in the space to address it. At the end of the day, web search is integral to how we conduct increasingly online portions of our lives. The least we can do is to make sure that it works equitably and well for everyone who needs to use it.

## Citations

1. Ruthven, I., & Kelly, D. (Eds.). (2011). _Interactive information seeking, behaviour and retrieval_. Facet publishing.
2. Gao, R., & Shah, C. (2021, July). Addressing bias and fairness in search systems. In _Proceedings of the 44th International ACM SIGIR Conference on Research and Development in Information Retrieval_ (pp. 2643-2646).
3. Friedman, B., & Nissenbaum, H. (1996). Bias in computer systems. _ACM Transactions on Information Systems (TOIS)_, _14_(3), 330-347.
4. Diakopoulos, N., & Koliska, M. (2017). Algorithmic transparency in the news media. _Digital journalism_, _5_(7), 809-828.
5. Rader, E., Cotter, K., & Cho, J. (2018, April). Explanations as mechanisms for supporting algorithmic transparency. In _Proceedings of the 2018 CHI conference on human factors in computing systems_ (pp. 1-13).
6. Noble, S. U. (2018). [[thoughts/Algorithms of Oppression]]. In _Algorithms of Oppression_. New York University Press.
7. Alkhatib, A. (2021, May). [[thoughts/To Live in their Utopia]]: Why algorithmic systems create absurd outcomes. In _Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems_ (pp. 1-9).
8. Pariser, E. (2011). _The filter bubble: How the new personalized web is changing what we read and how we think_. Penguin.
9. Gao, R., Ge, Y., & Shah, C. (2021). FAIR: Fairness-Aware Information Retrieval Evaluation. _arXiv preprint arXiv:2106.08527_.
10. O'neil, C. (2016). _Weapons of math destruction: How big data increases inequality and threatens democracy_. Broadway Books.
11. Zhang, Y., Zhang, Y., & Zhang, M. (2018, June). SIGIR 2018 workshop on explainable recommendation and search (EARS 2018). In _The 41st International ACM SIGIR Conference on Research & Development in Information Retrieval_ (pp. 1411-1413).
12. Krafft, T. D., Reber, M., Krafft, R., Coutrier, A., & Zweig, K. A. (2021, April). Crucial challenges in large-scale black box analyses. In _International Workshop on Algorithmic Bias in Search and Recommendation_ (pp. 143-155). Springer, Cham.
13. Council, ACM US Public Policy (2017). Statement on algorithmic transparency and accountability. _Commun. ACM_.
14. Goldman, E. (2008). Search engine bias and the demise of search engine utopianism. In _Web Search_ (pp. 121-133). Springer, Berlin, Heidelberg.
15. Azout, S. (2021, October 18). _Re-organizing the world's information: Why we need more boutique..._ Re-Organizing the World's Information: Why we need more Boutique... - Sari Azout. Retrieved April 12, 2022, from https://sariazout.mirror.xyz/7gSSTJ96SEyvXeljymglO3zN4H6DCgVnrNZq8_2NX1A
