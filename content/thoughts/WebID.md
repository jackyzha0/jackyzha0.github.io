---
title: "WebID"
date: 2022-06-07
tags:
  - seed
---

[Content summarized from W3](https://www.w3.org/wiki/WebID)

Similar to [[thoughts/DID|DIDs]].

> A WebID is a way to uniquely identify a person, company, organisation, or other agent using a URI.

People often publish data about themselves on the Web, such as:

- Who they know
- What they are interested in
- Photos they have taken
- Projects they work on
- Their curriculum vitae or employment history
- Their publications

Most importantly of all, having a Web ID allows people to reference you and declare social relations on the web (such as that you are their friend, colleague, parent, etc.) even when their profile is hosted on a _different web server_ than yours (emphasis added).

Commonly uses [[thoughts/FOAF|FOAFs]] for profiles.

## Proof of Ownership

WebID protocol is just a technology that leverages X.509 Certificates, already in common (and largely invisible) use. By placing that same URL in the certificate that identifies the user, and then placing information at that URL about the public key of the certificate, a web server that receives a user request can verify that the user has write access to that URL

Seems to be read-only (i.e. only user can write, can't tell apps to write to your own WebID)?
