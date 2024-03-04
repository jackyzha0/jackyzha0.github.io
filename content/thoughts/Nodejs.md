---
title: Node.js
date: 2024-02-23
tags:
  - seed
---
## Event Loop
[Source](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)

> The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded

Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the **poll** queue to eventually be executed.

```plaintext
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

- Each phase has it's own FIFO queue of callbacks to execute
- On entering each phase, it will perform any operations specific to that phase, then execute callbacks in that phase's queue until the queue has been exhausted or the maximum number of callbacks has executed

### Phases
1. Timers: execute any `setTimeout()` and `setInterval()` callbacks given that enough time has passed since they were scheduled
2. Pending callbacks: certain types of I/O callbacks (i.e. [[thoughts/TCP|TCP]] `ECONNREFUSED`)
3. Idle, prepare: Node internals
4. Poll: wait for system to call us back for I/O events (normally, this is where Node chooses to block)
5. Check: `setImmediate()`
6. Close callbacks: `socket.on('close', ...)`

``