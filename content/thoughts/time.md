---
title: "Time"
date: 2023-04-15
tags:
- seed
---

> "Time is not linear, but a series of concentric circles, like the rings of a tree. Ourselves today, our newest selves, are the outermost rings of a tree. We are comprised also of every person we were in the years leading up to today, even if those layers have compressed into the past." [Source](https://katiewav.substack.com/p/a-personal-syllabus-2022)

The main insight from Einstein's special relativity is that *time is relative*. And as such, points in space-time are not totally ordered but rather partially ordered (see: [[thoughts/Order theory]]).

Two observers of the same event might perceive it to have occurred at different times, depending on their relative motion. Or, in distributed systems land, two nodes may receive the same messages in different ordering, depending on network conditions.

How do your order the events in the Universe? The answer, as Lamport noted, is you order events in terms of messages that could be sent between them.

See also: [[thoughts/A Certain Tendency Of The Database Community]], [[thoughts/causality]], [[thoughts/clocks]]

## Virtual Time
[Virtual Time](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.134.6637&rep=rep1&type=pdf) (Jefferson, 1985)

A [[thoughts/git]] *rebase*-like approach to resolving conflict

- Similar to [[thoughts/Antimatter]] and netcode rollback
	- Programmers can write correct software without paying any attention to late-arriving messages, and even with no knowledge of the possiblity of rollback, just as they can write without any attention to, or knowledge of, the possibility of page faults in a virtual memory system.
	- For every message there exists an antimessage that is exactly like it in format and content except in one field, its sign. Whenever a message and its antimessage occur in the same queue, they immediately annihilate one another.
- Uses a global virtual time (GVT) watermark
	- Similar to GST in [[thoughts/system model#Timing behaviour (e.g. latency)|timing behaviours in system models]]
	- Min of
		1. all virtual times in all virtual clocks at time $r$
		2.  the virtual send times of all messages that have been sent but not yet processed at time $r$
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