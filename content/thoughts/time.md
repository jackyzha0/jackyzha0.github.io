---
title: "Time"
date: 2023-04-15
tags:
  - seed
---

> "Time is not linear, but a series of concentric circles, like the rings of a tree. Ourselves today, our newest selves, are the outermost rings of a tree. We are comprised also of every person we were in the years leading up to today, even if those layers have compressed into the past." [Source](https://katiewav.substack.com/p/a-personal-syllabus-2022)

The main insight from Einstein's special relativity is that _time is relative_. And as such, points in space-time are not totally ordered but rather partially ordered (see: [[thoughts/Order theory]]).

Two observers of the same event might perceive it to have occurred at different times, depending on their relative motion. Or, in distributed systems land, two nodes may receive the same messages in different ordering, depending on network conditions.

How do your order the events in the Universe? The answer, as Lamport noted, is you order events in terms of messages that could be sent between them.

See also: [[thoughts/A Certain Tendency Of The Database Community]], [[thoughts/causality]], [[thoughts/clocks]]

## At your own speed

[Source](https://mindmud.substack.com/p/certainty)

> I think this is a shame -- and love is my shining example. Call me crazy, but maybe it's a good sign when things feel remarkably simple and wordlessly right. And when they do, it's interesting to look around and notice how incredibly irrelevant speed is. Certainty means you're moving at the speed of [[thoughts/trust]] -- a personal pace that ultimately has no record to beat or even road to follow

## Saving Time, Discovering a Life Beyond the Clock

> Exploring the social and material roots of the idea that time is money

[Source](https://www.youtube.com/watch?app=desktop&v=1x0IOcFp94s)

- Chronos vs Kairos time
  - Chronos: quantitative, calendar time
  - Kairos: qualitative time, memorable moments
- Horizontal vs Vertical time (Josef Pieper): the point of leisure should not be to work better
  - Horizontal time: work and refreshment/recovery for work
  - Vertical time: things that remind you of your mortality and the sort of fragility of your life, but also this deep sort of awe and gratitude about the fact that you exist at all. He describes it as sort of cutting through that horizontal plane; it feels in that moment almost like it invalidates the horizontal time
- Industrial Time
  - Time as money (equal interchangeable hours)
  - Emerged from the need to measure others' labour
  - The colonisation of time (Giordano Nanni)
    - Conflict between British [[thoughts/colonial debt|colonial]] sense of time and the existing understanding of time of people living in colonized places
    - Taylorism and factory labour (measuring and systematizing work to make it go faster)
    - This is not much different than the working class today (e.g. Amazon warehouse workers scanner gun, UPS truck with GPS sensors, etc.)
- Unfungible time: pick a point in space and time and just keep watch. A branch, a yard, a webcam. A story is being written there
  - To consider something as inhabiting time with you is to consider that it has experience
  - Lesser minds problem: human tendency to see non-human or even [[thoughts/in-group bias|outgroups]] as not as complex as our own
    - By simply asking whether they would like a certain vegetable, those neural regions became active
    - The question presumes a person with preferences and desires. Desires and attitudes toward the future only exist in time: the time inhabited by that person
  - It is a deeply political question about who does and does not inhabit time
  - Unfreezing in time: focus on a specific point or feature to help make something’s aliveness more accessible to you
- Time gardening
  - I had a friend who always was giving away bags of cabbage to people. Apparently you are supposed to get rid of the outside leaves of the cabbage so the inside leaves of the cabbage can grow to maturity
  - Not everything is transactional. "I've sort of forgotten that a lettuce keeps growing, assuming that more lettuce leaves for me mean less lettuce leaves for her"
  - Chronodiversity: a garden invites the human subject into conversations with different modes and speeds of life
  - "Time is not money, time is beans"
    - Beans are not just commodities. Sure, you could eat them, but they weren't end points and they weren't dead. At least some of them contained something: the possibility of future beans.
  - Sometimes the best way for me to get time is to give it to you
- Difference between someone who _truly_ has no time versus one who _feels_ like they have no time
  - The latter are people whose problems would be solved by going to a cabin with no reception (people who have internalized 'business is good')
  - For someone who structurally does not have control over their own time, the answer does not lie in using their own time better
- On capturing time: "Time is slipping through your fingers and you want to grab onto that. What could be more human than that?"
- "Like me, they have aged"

![[thoughts/images/chronology.png|500]]

## Fools and their time metaphors

[Source](https://aaronzlewis.com/blog/2019/02/11/fools-and-their-time-metaphors/)

Gcal has turned private calendars into a shared commons. Anyone can easily pull up your schedule, and the blankness-by-default is an open invitation to take away your time. (My mom was particularly surprised to learn that tech workers often don’t use their words to set up meetings. They just “throw time” on the calendar and wait for an RSVP.)

Digital calendars *misrepresent* the default state of your time. It’s far from empty. You’re working, thinking, talking, problem-solving, Being. Blankness shouldn’t be an invitation to interrupt. It’s yours, it’s sacred!

The UX is *additive,* rather than *reductive*. We’re always “putting time on” calendars, never “taking it off.”

Some particularly desperate people would invent fake events and strategically place them throughout the day, making it difficult for would-be time thieves to find enough “empty” time. These protective mechanisms are band-aids. They’re what designers call [[thoughts/desire paths]]

## Virtual Time

[Virtual Time](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.134.6637&rep=rep1&type=pdf) (Jefferson, 1985)

A [[thoughts/git]] _rebase_-like approach to resolving conflict

- Similar to [[thoughts/Antimatter]] and netcode rollback
  - Programmers can write correct software without paying any attention to late-arriving messages, and even with no knowledge of the possiblity of rollback, just as they can write without any attention to, or knowledge of, the possibility of page faults in a virtual memory system.
  - For every message there exists an antimessage that is exactly like it in format and content except in one field, its sign. Whenever a message and its antimessage occur in the same queue, they immediately annihilate one another.
- Uses a global virtual time (GVT) watermark
  - Similar to GST in [[thoughts/system model#Timing behaviour (e.g. latency)|timing behaviours in system models]]
  - Min of
    1.  all virtual times in all virtual clocks at time $r$
    2.  the virtual send times of all messages that have been sent but not yet processed at time $r$
  - Avoids indefinite queue/buffer growth by trimming all messages with virtual times less than GVT
  - However, this algorithm is bounded by the slowest connection, which makes it infeasible for an asynchronous latency model (e.g. local first)

## The Fish of Lijiang

[Source](https://clarkesworldmagazine.com/chen_08_11/)

A translated sci-fi fantasy short story on time.

- "They discovered that those suffering from the side effects of time sense dilation and those suffering from the side effects of time sense compression can help each other, be each other’s cure."
- "Time flies past the laborer, the poor, the “third world”; time crawls for the rich, the idle, the “developed world”; time stays still for those in charge, the idols, the gods..."

## Nothing stops

See also: [[posts/nothing-stops|nothing stops]]

[Original source from griefbacon](https://griefbacon.substack.com/p/nothing-stops?utm_source=url&curius=1299&s=r)

- This is the process of history, and of crisis, of disease and of love. We may try sometimes to stand still, but we are standing on a moving walkway.
- All people want is for nothing to happen; all anybody wants is another day of our soft, stupid little lives, to be allowed the vulnerabilities we have built into them. We clutter up our houses with useless objects that mean something to us; we adopt pets who would slow us down in a crisis. All this is a way of ignoring the truth that nothing stops, which is to say it is a form of love.
- We are making a declaration that it is worth it to choose the losing side.
- But I choose all that anyway; I would rather try and fail to stand still with you than to be fast and sleek without you.

## In stories

From: [Stories that use time to hurt you](https://www.youtube.com/watch?v=e-ZK1AC3C8c)

> "Despite how many ticks of the clock are left, there is still meaning"

- Click (2006)
  - The main character Michael Newman receives a remote that controls reality the same way a remote might control a television. Notably, it can pause or fast-forward time.
  - In the second half of the film, Michael is under the impression he has received a promotion at work but later finds out that the actual promotion won't actually happen for a month or two. Fast-forwarding him to his promotion unwittingly moves him forward a full year. He realizes how much of his life he has just forfeited. A year where he is on autopilot and the world around him has changed: his children no longer like the same TV shows, his dog has passed away, his wife has entered them into marriage counseling.
  - Because the remote learns from his previous actions, it involuntarily drags him forward through gaping chunks of his life. The next skip is a whole decade. He is now obese, his children are now teenagers, and his wife is now remarried.
  - 6 more years and he has had cancer, a heart attack, and his father has died but this is all news to him.
  - It turns from a story about a funny man with a remote into a terrifying story of regret and the fragility of time. What will the unwelcome passage of time do to the human psyche?
- The Stanley Parable (Ultra Deluxe expansion)
  - There exists an unextraordinary room. No windows, no doors, just some miscellaneous office decor and supplies tossed about
  - In the middle of the room is a skip button placed there by the narrator. If you get tired of him talking, you can just press the button to jump ahead and skip the monologue.
  - There is a shift in the tone and the situation becomes dire. Every skip gets longer and the narrator is beginning to get desperate. However, the game is designed such that skipping is the only way to progress the story, so naturally-
  - After enough skips, the narrator will stop speaking and you will remain trapped in the room. The potted plant has died, some lightbulbs burn out. At some point, there is a leak in the ceiling, the ceiling collapses. Plants and other wildlife grow. The plants die.
  - It is about the uncanny endlessness of time and of infinity
  - The thought of what might occupy that space after we are gone is frightening and unknowable
- [Before Your Eyes (2021)](https://store.steampowered.com/app/1082430/Before_Your_Eyes/)
  - A short indie game that sees you take the role of Benny. You experience his life in a series of colourful sequences. The first trip to the beach with his mother, his father filming his first birthday, books before bed, his first math assignment, his first friend.
  - It paints these delicate little pictures of moments that might feel strangely familiar, and it does this so well that everything else in the real world just sort of melts away. You're here and you're present and you don't want to leave so you're careful not to... blink
  - Blink and time skips forward. The game is controlled via webcam and it watches you as you play and tracks your blinking. Closing your eyes is how time moves forward, sometimes seconds, sometimes years
  - And becomes sometimes blinking occurs without conscious effort, there are times that you unintentionally rip yourself away from one of those tender scenes before the dialogue is done.
  - "There are some lines in the game that very few people are going to catch and they were designed that way... I personally find that exciting -- you can't catch everything"
  - It captures the sensation of regret, wishing you had said those words you wanted to say
- Manifest (2018-2023)
  - Because of an overbooking, Ben Stone, his son Cal, and Ben's sister Michaela all take a later flight than the rest of the family. Notably, they all have loose ends:
    - Cal's leukaemia isn't responding to treatment
    - Ben is desperately looking for a solution to help his son
    - Michaela is on the fence about a marriage proposal
  - As their plan prepares to land, ground control is confused to be receiving flight 828. Upon landing, no one has phone service. Instead of being greeted by loved ones, they are met with sirens and ambulances. The passengers are informed that although their plane left on April 7th 2013, the current date is November 4th, 2018.
  - How long is long enough to move on after your lover dies?
  - Although they haven't lost any of their lives, the world has moved on without them leaving them in a state of stasis
- Interstellar (2014)
  - Every hour on Miller's planet is 7 years back on Earth. However, a quick 15 minute errand tumbles in chaos. Now an over hour long endeavor, a full 60,000 hours have passed back on the ship.
  - When the crew finally return, they are informed that their calculation were wrong... 23 years 4 months and 8 days have passed on earth. Without a word, Cooper goes to check for messages from his family and in a single setting, he will see half a lifetime of memories be relayed to him
    - His son Tom, a teenager has found a girlfriend
    - Moments later, now a grown man, Tom introduces his son, they've named him Jesse
    - In the next message, he finds out that his new grandson would not survive Earth's declining conditions. They buried him out back next to Grandpa, who was alive before the mission
  - It is because the audience knows the weight of time in this scene that the intensity becomes almost combustable
- Gunbuster (1988-1999)
  - In the middle of a space mission on the verge of defeat, Kazumi is frozen, her tears floating in zero gravity
  - She knowingly yet helplessly squanders seconds that are precious days with the man she loves back on earth simply because she deal with how cruel the flow of time is, killing him faster than her
  - In the final episode, to ensure Earth survives any future invasions, Noriko and Kazumi must ignite a human-manufactured black hole. Being there warps their time exponentially. Jung warns them that if they use this, it is effectively death. Not because they'll die but because they'll be plunged so enormously far into the future that everyone they know and love will be gone.
  - But there is no other option and they do it. The two girls are lost to time. When they finally return to Earth a full 12000 years in the future, is it the same Earth they left behind?
  - Despite the 12000 years passing, the people remember the two lost girls who would one day return. The pilots cannot make contact with anyone nor see any sign of habitation on the planet, suggesting that human civilization is long gone. However, their despair is instantly dispelled when a massive light pattern suddenly appears on the planet saying "WELCOME HOMƎ!" spelled out in simplified Japanese ("オカエリナサイ". The final letter "イ", however, is reversed, which indicates the current civilization was mimicking the bygone language)
- Your Name (2016)
  - Throughout the film, Mitsuha and Taki are swapping bodies, occasionally slipping into each other's lives. In doing so, they accidentally get to know each other, not only from leaving notes between every swap, but also by taking the other's life for a joyride and doing things that maybe the other doesn't have the courage to do.
  - At some point, Mitsuha goes radio silent. Taki, confused, wants to meet her but his only clues to her location are sketches that he has drawn from his time in her shoes. And so he takes a train to the countryside where he thinks she is. Here, he finds out that the town he is looking for is called Itomori and it was tragically levelled by a comet 3 years ago.
  - Mitsuha was swapping lives with Taki from another time. But because you assume that because both of their lives are being presented in tandem with each other, that they happen at the same time. When in reality, the events of her life are 3 years behind his.
  - At some point, Mitsuha actually goes to the city to see Taki but he has no idea who she is. In her timeline, she is 3 years too early and he has not started swapping bodies with her yet.

## Chronological Snobbery

> thinking, art, or science of an earlier time is inherently inferior to that of the present, simply by virtue of its temporal priority or the belief that since civilization has advanced in certain areas, people of earlier periods were less intelligent

The term was coined by C. S. Lewis and Owen Barfield, and first mentioned by Lewis in his 1955 autobiographical work, _Surprised by Joy_.
