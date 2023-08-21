---
title: "RPC"
date: 2022-05-05
tags:
  - seed
aliases:
  - remote procedure call
---

RPC: Remote Procedure Call. Sometimes called a remote function call, it is a call to a function whose implementation is on another node. Normally a part of a [[thoughts/Protocol|protocol]] specification

RPCs needs an RPC client/server to mediate the call.

- Client marshals (encode) arguments and passes it to the server
- Server unmarshals (decodes) arguments and runs the implementation
- ... same in reverse for response

Generally an [[thoughts/HTTP]] request but other types of RPCs exists as well (e.g. gRPC)
