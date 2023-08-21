---
title: "The Making and Maintenance of Open Source Software"
date: 2021-10-25
tags:
  - seed
  - book
---

Full post: [A case for funding Open Source](posts/paid-open-source.md)

## Quotes

### [Maintenance](thoughts/creation%20vs%20maintenance.md)

A lot of initiatives like HacktoberFest are widely championed as 'good for open source' yet frequently cause maintainers to seize up with anxiety because such initiatives often attract low-quality contributors looking to snag a free t-shirt. "Open source code is public, but it doesn't have to be participatory: maintainers can buckle under excess demand for their [attention](thoughts/attention%20economy.md)"

This is akin to a writer being asked to edit and make changes to the same book every day, into perpetuity, long after they’ve reaped the initial financial and reputational rewards from its creation. What's more, unlike other content, open source code is relied upon by people, companies, and other institutions that need it to keep working, long after the maintainer's interest may have waned.

When Richard Stallman first described free software as "free as in speech, not free as in beer," the distinction he wished to make is that the term "free" referred to what one could do with the software, rather than to its price.

The common misconception of software is that it is often characterized as "zero marginal cost," meaning that it can be distributed for nearly nothing, regardless of how many additional people consume it. The problem is not that simple. Code is nearly free to distribute, but maintenace can still be expensive. External contributions don't necessarily reduce the burden of maintenance either, because they still require someone to review and merge them.

The work of an open source developer goes beyond the initial costs of creation. Maybe developers can't help but make things, and share the things they make, but every time they do, and ever time they find success, a tiny, invisible clock begins to tick, and they're tasked with managing the care and feeding of their code into perpetuity.

### Dependencies and [Infrastructure](thoughts/infrastructure.md)

There's even a term called the _bus factor_, where project health is a measured by the number of developers that would need to get hit by a bus before the project is in trouble.

However, this 'theory' no longer matches up with empirical observation. In fact, less than 5% of developers were responsible for over 95% of code and social interactions on GitHub. The average software developer these days easily relies on hundreds of open source projects to write code these days, it's inevitable that they'll only be able to passively consume most of them.

Infrastructure is recursively defined by public consensus. It's the set of structures that we've collectively decided are most valuable _in any given moment,_ and, therefore, its boundaries and definitions are expected to change over time.

Like a bridge that needs to support more traffic that it was built for, every social platform is scrambling to upgrade its infrastructure to accommodate the volume of social interactions we're dealing with today. Platforms need to build skyscrapers where there were once villages.

### Identity

Like joining a club, it's not about how many times you've attending meetings but how you self-identify, and how others identify you, that makes you a 'member'. Some attendees might come every week for years and still not be considered part of the group.

### Code as Content

Code, like any other type of content available online today, is **trending toward modularity**: a mille-feuille layer cake of little libraries instead of one big, jiggling, Jell-O mold.

"Like a book or video, code is just a bunch of information, packaged up for distribution. But its role as a [[thoughts/utility|utility]] is more explicit."

Today, "content" is better understood not as a thing we set out to make -- as an automaker might exist solely to produce cars -- but as "an externality from [our] existing social systems." Content is a snapshot of our civilization.

### Platforms and [[thoughts/governance]]

A "Benevolent Dictator for Life" or BDFL for short, describes authors of open source projects who retain control even as the project grows. A great example of this is Linus Torvalds, who even after 14,000 unique contributors to the Linux kernel, still is the only person allowed to merge contributions into the main branch.

"Like a talent agency, platforms add value to creators by first improving their _distribution_, exposing them to potentially millions of people. ... This [feedback loop](thoughts/feedback%20loops.md) is [positive sum](thoughts/positive%20sum.md), encouraging more creators to join. So long as more people keep using the platform, there's no sense that any one creator will ever suck up all the oxygen in the room."

### Commons-based Peer Production

"At a company, only employees can do the work, limited by their job function. But in a commons, anyone can stumble upon an advertised task and volunteer themselves. By removing 'property and contract', the commons will theoretically select for the best person for the job at a lower cost."

See also: [[thoughts/types of goods]]

Non-rivalry: If I download code from GitHub, my decision doesn't diminish your ability to download that same code. (By contrast, if I bite into an apple and hand it to you, there is now less apple for you to eat) -- a key point here is that open source software isn't necessarily non-rivalrous especially when it comes to marginal increase in maintenance for each additional user

Non-excludability: If someone owns my copy of my code, it is difficult for me to prevent them from sharing it with others. (By contrast, if I build a theme park, I can prevent people from entering by putting up a turnstile or charging admission)

The implication is that support can be handled in a fully decentralized manner that will distribute its costs among users -- but someone still needs to review, manage, and process these reports. This maintenance cost is referred to as the "servicing costs" of software, noting the "asymmetry between the low cost of community participation and the high cost that others' participation places on the leaders of the community." She compares the problem to traffic congestion, where each person wants to drive their own car, but in doing so increases the congestion experienced by others, and, eventually, themself.

### [Incentive](thoughts/incentives.md) Structures

> "Creation is an intrinsic motivator, maintenance usually requires extrinsic motivation" -- @balupton

If production runs on intrinsic motivation, money is an _extrinsic motivator_ that is thought to interfere with an already well-coordinated system. Although the commons might not be as _profitable_ as the firm, it's also more resilient, because the currency of its transactions is the desire to participate, rather than money.

> External, expected rewards diminish the intrinsic motivation of the fundraising open-source contributor. It risks transporting a community of peers into a transactional terminal. And that buyer-seller frame detracts from the magic that is peer-collaborators.

"Whereas active contributors show interest in adding value to others early on, casual contributors demonstrate an acute, personal need at the outset."

There are two types of funders that care enough to spend money on open source:

1. Institutions: usually companies, but also governments and universities. They spend money to influence and access a project they care about -- especially gaining priority for issues and pull requests that concern them. They can also pay to gain brand influence through the open source project
2. Individuals: usually developers who are direct users. Politicians who fund their campaigns from grassroots donations are generally viewed more favorably by the public than are those who are funded by corporate donations. I'm not sure that open source is so different.

### Projects and Production Models

Similar to [[thoughts/governance]] models

"While some open source developers write code in public from the very beginning, many prefer to do their initial creative work in private, so they can properly articulate their ideas before opening the project up for feedback. Even if developers do publish their code early on, they may not advertise it widely until they have something ready for release."

Based off of arelationship between contributors and users, we can think of projects in terms of their contributor growth and user growth.

|                         | High user growth        | Low User Growth      |
| ----------------------- | ----------------------- | -------------------- |
| High contributor growth | Federations (e.g. Rust) | Clubs (e.g. Astropy) |
| Low contributor growth  | Stadiums (e.g. Babel)   | Toys (e.g. ssh-chat) |

- Federations: 'bazaars', the epitome of open source projects. Small percentage of overall # of projects. Complex to manage (typically develop [decentralized](thoughts/decentralization.md) governance structures)
- Clubs: roughly overlapping group of contributors and users. May not have huge reach, but loved and built by a group of enthusiasts.
- Stadiums: powered by a few main contributors, generally widely-depended upon packages. Centralized structure.
- Toys: effectively personal projects
