---
title: "Game Theory"
date: 2021-08-12T10:18:31-04:00
tags:
- sapling
- PHIL321A
---

## Induction, Decision, and Game Theory
Course notes on PHIL321A with Paul Bartha

> Philosophical underpinnings of rational decision making

Covers
1. [[thoughts/Decision theory|Decision Theory]]
2. Game Theory: choices by two or more agents who all play a role in determining the outcome.
	1. Each player wants to maximize utility
	2. May or may not be collaboration, may or may not be deception
3. [[thoughts/Evolutionary game theory|Evolutionary Game Theory]]

Two ways to look at game theory
1. Normative tool: how to make rational choices
2. Descriptive/explanatory tool: help explain social behaviour

Some social practices don't appear rational in normative game theory but can be explained using descriptive game theory

### Risk, Ignorance, and Uncertainty
- Decisions under ignorance (DUI): the agent is ignorant of all probabilities
- Decisions under risk (DUR): the probability of each outcome is known
	- We can maximize expected value to figure out what decision to make
	- Generally need to know utility *and* risk values
- Decisions under uncertainty (DUU): includes risk, ignorance, and intermediate cases

## Game Tables
Similar to decision tables in [[thoughts/Decision theory|decision theory]] but the column is the action of the other agent, and cells are the outcomes for each agent represented as a tuple of numbers.

e.g. Stag Hunt where A and B are hunters and the numbers represent amount of food acquired

| |A|B|
|-|-|-|
|A|25,25|0,5|
|B|5,0|5,5|

The solution is a set of "profile" of choices that are rational for each agent

## Trust and Game Theory
[Source: The Evolution of Trust by *Nicky Case*](https://ncase.me/trust/)

For [trust](thoughts/trust.md) to evolve:
1. Repeat interactions must happen. Trust keeps a relationship going, but you need the knowledge of possible future interactions *before* trust can evolve
2. Possible win-win situations. This must be a [positive sum](thoughts/positive%20sum.md) game where *both* players can be better off
3. Low miscommunication. High-tolerance players are possible but if the level of miscommunication is too high (low signal to noise ratio), trust breaks down. Even in low miscommunication situations, it pays to be more forgiving

In the short run, the rules of the game define what the players do. In the long run, players define the rules. Incentive for us to build the environment and rules we want to play in.

Unfortunately, modern day social media means we have less 'close-friends' and thus repeat interactions than ever. With algorithmic news feeds, miscommunication breeds and win-win situations become scarce.

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
2. Explorers: tendency to dig around, explore, and immerse themselves in the lore and  game world
	1. Single-player appeal: flock to games which reward close attention
	2. Multi-player appeal: tire quickly of MMORPGs when they finish the content
3. Socializers: play the game for the social aspect. The game is the tool they use to meet others in-game or outside of it
	1. Single-player appeal: rich interactions with NPCs and/or strong online community (e.g. forums and streams)
	2. Multi-player appeal: main purpose for the socializer, enjoys mechanics for socializing like guilds, chats, etc.
4. Killers: thrive on competition from others and feeling superior
	1. Single-player appeal: want to achieve top ranks or beat other speedrunners
	2. Multi-player appeal: friendly competitive spirit or 'thrill of the hunt'