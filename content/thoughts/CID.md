---
title: "CID"
date: 2022-06-05
tags:
- seed
---

Summarized from [Github Specification](https://github.com/multiformats/cid)

> Self-describing content-addressed identifiers for distributed systems

Basically a hash with some metadata. CID is a self-describing format for referencing content, it is a form of [[thoughts/content addressed storage|content addressed storage]]. 

Format: `<cidv1> ::= <multibase-prefix><multicodec-cidv1><multicodec-content-type><multihash-content-address>`

Where
- `<multibase-prefix>` is a multibase code (1 or 2 bytes), to ease encoding CIDs into various bases. NOTE: Binary (not text-based) protocols and formats may omit the multibase prefix when the encoding is unambiguous.
- `<multicodec-cidv1>` is a multicodec representing the version of CID, here for upgradability purposes.
- `<multicodec-content-type>` is a multicodec code representing the content type or format of the data being addressed.
- `<multihash-content-address>` is a multihash value, representing the cryptographic hash of the content being addressed. Multihash enables CIDs to use many different cryptographic hash function, for upgradability and protocol agility purposes.