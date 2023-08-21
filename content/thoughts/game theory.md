---
title: "Game Theory"
date: 2021-08-12T10:18:31-04:00
tags:
  - sapling
  - PHIL321A
---

Modelling decisions where the outcome partially depends upon choices made by other rational agents. Assumes:

1. Individual Rationality: each player maximizes their own utility and knows the full game tree/table
2. Common Knowledge of Rationality: each player knows that all other players are rational

Two ways to look at game theory

1. Normative tool: how to make rational choices
2. Descriptive/explanatory tool: help explain social behaviour

Some social practices don't appear rational in normative game theory but can be explained using descriptive game theory

Some distinctions:

1. [[thoughts/zero sum|Zero-sum]] vs non-zero sum games (e.g. [[thoughts/positive sum]])
   - In a zero sum game, the payoffs always sum to 0
2. Simultaneous vs [[thoughts/sequential games]]
   - In simultaneous games, all players choose independently at the same time without knowing what other players will do
3. Perfect information vs imperfect information games
4. Symmetric vs non-symmetric games
   - In symmetric games, all actors have the same set of actions to choose from
5. Two-person vs n-person games
6. Cooperative vs non-cooperative games
   - In cooperative games, players get to choose the outcome together (i.e. form binding agreements in the form of 'if I do A, then you must do B')
7. Non-iterated vs iterated games
   - A non-iterated game is only played once. Iterated games can be played several times.
   - A "supergame" is a specified # of iterations of a game. Strategies:
     - C: Always cooperate
     - D: Always defect
     - TT: tit-for-tat
       - Cooperate on round 1 and then take same action as opponent in previous round
   - Upshot is that the case for cooperation (e.g. TT or C) is strong when the number of games is not known in advance
     - We can always construct a strategy where D or some version of TT dominates when we know how many games there will be
8. Finite vs infinite games
   - Not to be confused with the James Carse definition of infinite games

### Risk, Ignorance, and Uncertainty

- Decisions under ignorance ([[thoughts/Decisions under ignorance|DUI]]): the agent is ignorant of all probabilities
- Decisions under risk ([[thoughts/Decisions under risk|DUR]]): the probability of each outcome is known
  - We can maximize expected value to figure out what decision to make
  - Generally need to know utility _and_ risk values
- Decisions under uncertainty (DUU): includes risk, ignorance, and intermediate cases

## Game Tables

Used to represent simultaneous games

Similar to decision tables in [[thoughts/Decision theory|decision theory]] but the column is the action of the other agent, and cells are the outcomes for each agent represented as a tuple of numbers.

e.g. Stag Hunt where A and B are hunters and the numbers represent amount of food acquired

|     | A     | B   |
| --- | ----- | --- |
| A   | 25,25 | 0,5 |
| B   | 5,0   | 5,5 |

(In [[thoughts/zero sum]] games, it is sufficient to only represent the utility of each of the Rows)

- The solution is a set of "profile" of choices that are rational for each agent
- Each cell is a profile which leads to an outcome for both players

## Solutions to games

### Dominance and admissibility

S1 dominates S2 iff:

1. S1 is at least as good as S2 regardless of what other players do.
2. S1 is superior to S2 in at least one case.

If there is a dominant strategy, it will be part of the solution profile. If there is no dominant strategy, we eliminate all dominated strategies as inadmissible.

### Equilibrium

This rule subsumes the rules for Dominance and Admissibility. Any solution using Dominance or Admissibility is also a [[thoughts/Nash equilibrium]].

Minimax condition: For two-person zero-sum games in particular, a pair of (pure) strategies is an equilibrium if and only if its payoff is the minimum on its row and the maximum on its column

There may not always be an equilibrium with pure strategies. However,

## Mixed Strategies

In a two-person zero-sum game with mixed strategies, there is always an equilibirum. Moreover all equilibria have the same (expected) value

If a player has options $R_1, \dots, R_n$, then a mixed strategy selecting $R_i$ with probability $p_i$ written as $[p_1R_1, \dots, p_nR_n]$ where the probabilities add up to 1.

$[pA, (1-p)B]$ where $0 \leq p \leq 1$. This means: choose A with probability $p$ and B with probability $1 - p$.

Given a table in Standard Form:

|     | C1  | C2  |
| --- | --- | --- |
| R1  | a   | b   |
| R2  | c   | d   |

Steps:

1. We calculate the EU for the actor represented by Row, EU(Row) = $p(qa + (1-q)b) + (1-p)(qc + (1-q)d)$
2. We find a $p$ such that EU(Row) only depends on $p$ (by making the coefficient for $q$ zero). To do this normally:
   1. $p = (d-c)/(a-b-c+d)$
   2. $q = (d-b)/(a-b-c+d)$
   3. If $a-b-c+d = 0$ then there are pure-strategy equilibria so use those
3. We do the same but with $q$
4. Now set EU(Row) to 0. We essentially want to make EU(Row) constant so there is no incentive to switch

## Trust and Game Theory

[Source: The Evolution of Trust by _Nicky Case_](https://ncase.me/trust/)

For [trust](thoughts/trust.md) to evolve:

1. Repeat interactions must happen. Trust keeps a relationship going, but you need the knowledge of possible future interactions _before_ trust can evolve
2. Possible win-win situations. This must be a [positive sum](thoughts/positive%20sum.md) game where _both_ players can be better off
3. Low miscommunication. High-tolerance players are possible but if the level of miscommunication is too high (low signal to noise ratio), trust breaks down. Even in low miscommunication situations, it pays to be more forgiving

In the short run, the rules of the game define what the players do. In the long run, players define the rules. Incentive for us to build the environment and rules we want to play in.

Unfortunately, modern day social media means we have less 'close-friends' and thus repeat interactions than ever. With algorithmic news feeds, miscommunication breeds and win-win situations become scarce.

See also: [[thoughts/Evolutionary game theory]]

## Applied Game Theory

Game theory feels hard to apply to the real world due to properties like the [Collingridge Dilemma](thoughts/catch%2022.md)

Games, however, are a great test bed for a lot of game theory given how information rich they are. See [game design](thoughts/game%20design.md)

## Bartle Taxonomy of Player Types

See also [[thoughts/evaporative cooling#Geeks MOPs and sociopaths in subculture evolution|Geeks, Mops, and sociopaths]]

A classification of types of actors in video games based on character theory

![[thoughts/images/Bartle taxonomy of player types.png|400]]

1. Achievers: prefer to optimize metrics or other concrete measurements of 'succeeding' in a game
   1. Single-player appeal: Every game that can be "beaten" are appealing to Achievers.
   2. Multi-player appeal: Look to socializers for praise, opportunities to show off their skill and hold elite status to others
2. Explorers: tendency to dig around, explore, and immerse themselves in the lore and game world
   1. Single-player appeal: flock to games which reward close attention
   2. Multi-player appeal: tire quickly of MMORPGs when they finish the content
3. Socializers: play the game for the social aspect. The game is the tool they use to meet others in-game or outside of it
   1. Single-player appeal: rich interactions with NPCs and/or strong online community (e.g. forums and streams)
   2. Multi-player appeal: main purpose for the socializer, enjoys mechanics for socializing like guilds, chats, etc.
4. Killers: thrive on competition from others and feeling superior
   1. Single-player appeal: want to achieve top ranks or beat other speedrunners
   2. Multi-player appeal: friendly competitive spirit or 'thrill of the hunt'
