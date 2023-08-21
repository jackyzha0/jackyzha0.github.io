---
title: "Network Time Protocol"
date: 2023-04-03
tags:
  - seed
aliases:
  - NTP
---

The known problem with this mechanism is that it can drift away from the actual time of the day, based on how fast or slow the crystals oscillate. To fix this, computers typically have a service like NTP which synchronizes computer clocks with well known time sources on the internet.

- NTP Client sends out a request at $t_1$
- NTP Server receives request at $t_2$
- NTP Server sends a response at $t_3$
- NTP Client receives a request at $t_4$
- Round-trip network delay = $\delta = (t_4-t_1) - (t_3-t_2)$
- **Estimated** single-trip network delay = $\delta / 2$
- Estimated server time when client receives response, so clock skew is $\theta = (t_3 + \delta / 2) - t_4$
- If $\theta < 125ms$, slew the clock: speed it up/slow it down by 500ppm until clocks are in sync
- If $125ms \leq \theta < 1000s$, step the clock: suddenly reset client clock to estimated server timestamp
- If $\theta \geq 1000s$, panic and do nothing (leave it to the humans!)
