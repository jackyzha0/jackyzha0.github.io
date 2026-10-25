---
title: Multipath QUIC
date: 2026-10-12
tags:
  - seed
---
An extension that lets one QUIC connection send over several network paths at once (say wifi and cellular), instead of being tied to a single one. It is specified in [draft-ietf-quic-multipath](https://datatracker.ietf.org/doc/draft-ietf-quic-multipath/), which is in the RFC Editor queue as of October 2026.

Plain QUIC already has connection migration, but that only moves the connection from one path to another. Multipath keeps several paths alive and usable at the same time.

The draft leaves out which packets go on which path (scheduling), address discovery, and when to open or close paths.

See also: [[thoughts/Transport Layer]]
