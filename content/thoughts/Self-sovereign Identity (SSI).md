---
title: "Self-sovereign Identity (SSI)"
date: 2022-04-28
tags:
  - seed
---

Self-sovereign identity (SSI) is an approach to digital identity that gives individuals [[thoughts/agency]] over their digital identities

> "Identity is a uniquely human concept; however modern society view this concept of identity as state-issued credentials as driver's license and social security cards, which suggests a person can lose his very identity if a state revokes his credentials or even if he just crosses state borders." (Christopher Allen)

Identities are required for trust to be established (Party A needs to ensure Party B is actually who they claim to be and vice versa).

In centralized identity paradigms, this is usually done through authorities (e.g. [[thoughts/security#Certification Authorities CA|Certification Authorities]]) who are trusted by both parties.

In SSI systems, holders have control over unique identifiers (decentralized identifiers). These can be verified using [[thoughts/encryption|encryption]] and anchored on some sort of distributed ledger (e.g. [[thoughts/blockchain|blockchain]])

## Why SSI matters to the average citizen

- Avoid a million accounts to log into. SSI federates logins to various services and applications
- Granular access permissions for content
- Data provenance through signatures, can request takedowns as proving ownership is trivial

## Critiques of SSI

[Source: Molly White](https://blog.mollywhite.net/is-acceptably-non-dystopian-self-sovereign-identity-even-possible/)

Mostly critiques about certain implementations of [[thoughts/soulbound|SBTs]] or [[thoughts/Verifiable Credential|VCs]] (which she refers to as Verifiable attestations)

People are able to send soulbound tokens without the consent of the recipient—given that it is unlikely people would consent to police departments recording their crimes for others to later use against them if they had the choice

She is against a world where relationships are front-run by a deluge of data rather than formed more organically between individuals: "An acquaintance now quits those ‘old-fashioned’ relationship-building niceties and gets straight to the SSI point. Where do you work? Which college did you go to? Which college did your parents go to? Republican or Democrat? What’s your gender? Your ethnic origins? Do you have this gene or the other one? If you fail to offer up the requisite verifiable claims then you fail to get to ‘trust building’ first base in the SSI century." (see also: [[thoughts/introductions]]). Similar to Black Mirror's Nosedive Episode (S3E1)

People suck at [[thoughts/security]]: the average person is shit at securing their data. Although, I wonder if this is just bad UI/UX or is it just fundamentally hard (tm) to make it easy for people to be secure? I feel like VPNs for example have made 'good security' practice pretty easy for the average consumer
