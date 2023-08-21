---
title: "Network Address Translation (NAT)"
date: 2022-02-26
tags:
  - seed
  - CPSC317
---

## Network Address Translation

Both network and [transport layer](thoughts/Transport%20Layer.md) (violation of abstraction/layering) More devices than [IP addresses](thoughts/IP%20Address.md)! What do we do?

1. Home router gets assigned an IP (public IP) by the ISP
2. Devices connected on the local network are assigned a private IP address (usually starts with subnet mask 196.168.x.x or 10.x.x.x)
3. Changes the private IP address to the public address of the router
   1. Changes source port to some available port
4. Adds the mapping to the NAT forwarding table
   1. Entries correspond to private side (192.168.1.3:42301) to public side (12.13.14.15:24604)
   2. Includes
      1. Source IP
      2. Source Port
      3. Destination IP
      4. Destination Port
      5. [Protocol](thoughts/Protocol.md)
      6. NAT IP (Router public IP address)
      7. NAT Port (Unique)
   3. Actually, Port Forwarding just adds entries to the NAT forwarding table! You can set remote IP and remote port to wildcard entries (i.e. any web requests made to this port go to the specified machine)
      1. Max number of rows is 65535
      2. Any requests that come in then _clone_ the wildcard rule and make it specific to that conversation (to avoid collisions to the NAT port)
      3. Entries are removed when a conversation is coming to a close (stream based protocol, detect termination packets)
5. Does the inverse when it receives a packet

![](thoughts/images/NAT.jpeg)

## Hole-punching and NAT Traversal

> Hole punching (or sometimes punch-through) is a technique in computer networking for establishing a direct connection between two parties in which one or both are behind firewalls or behind routers that use network address translation (NAT).

Generally done using [[thoughts/UDP]]. You *can* do NAT traversal with TCP, but it adds another layer of complexity

Mostly used in [decentralized](thoughts/decentralization.md) or [peer-to-peer](thoughts/peer-to-peer.md) communication as the latency incurred by relaying through a central server is prohibitively expensive for real-time activity like voice calling, file syncing, etc.

Hole-punching usually involves the use of third-party hosts that run STUN or ICE to figure out the public address of the NAT.

The idea is that to allow packets to come in from a remote endpoint, the computer behind the NAT or firewall needs to send something to the remote endpoint first. By doing so it creates a “hole” in the NAT or firewall through which communications can proceed. This even works when both sides are behind a NAT/firewall, when both sides start by punching a hole in their respective NAT/firewalls.

Types of NAT/Firewall combinations

1. Endpoint-Independent Mapping (EIM): all outgoing connections from the same IP address and port have the same modified IP address and port
2. Address-Dependent Mapping (ADM): each outgoing connection to a different address from the same IP address and port has a different modified IP address and port
3. Address and Port-Dependent Mapping (APDM): same as ADM, instead of just address, it's address + port
4. Endpoint-Independent Filtering (EIF): all packets from remote addresses are allowed for a single endpoint on the NAT/Firewall
5. Address-Dependent Filtering (ADF): only allows packets to a specific endpoint from a specific address if a computer behind the NAT/Firewall has sent a packet to that address
6. Address and Port-Dependent Filtering (APDF): same as ADF but instead of just address, it's address + port

### Efficacy

From [_UDP NAT and Firewall Puncturing in the Wild_ by Gertjan Halkes and Johan Pouwelse](https://link.springer.com/content/pdf/10.1007/978-3-642-20798-3_1.pdf)

- Over 79% of peers on the Internet are not directly connectable
  - Using a simple redez-vouz mechanism decreases this to ~15% of peers
  - Keep-alive messages should be sent at least every 55 seconds to ensure that mappings/holes will remain open on almost every NAT/firewall
- Firewalls and NAT makes establishing P2P connections directly between any two machines hard
  - Firewalls are frequently configured to allow only outgoing connections, based on the assumption of the client-server model of communication
  - NAT hides the 'true' port and IP combination of any machine that is behind it, meaning that connecting to an arbitrary port is often not allowed
- Mostly useful for UDP traffic as setting up a connecting for TCP when NAT/firewall requires unusual or non-standard use of TCP and IP mechanisms, and may rely on specific NAT/firewall behaviour to work
- Detection
  - NAT
    - A and B report the remote address and port they see when a connection is set up. They now know their own external address and port
    - If all other peers agree on peer A's remote address and port, peer A determines they have no NAT or the NAT has EIM behaviour
    - If peer A's remote address and port are reported differ among peers, peer A determines they are behind a A(P)DM NAT
  - Filtering Behaviour
    - Check order of requests received when connecting to a rendez-vous server
      - Side note: this many not always be true. The reason for this is that the direct connection request is not always faster than the reverse connection request which is sent through the rendez-vous peer. This is known as a Triangle Inequality Violation (TIV)
      - This can happen as often as 40% of the time although lower numbers are more common
    - When a peer A tries to set up a connection using rendezvous R, it will always first send a direct connection request to the remote peer B
      - If the direct connection request from A to B arrives first, there is no filtering behaviour or it uses EIF
      - If the rendez-vouz connection request from R to B arrives first, the filtering behaviour is most likely A(P)DF

![[thoughts/images/NAT-firewall-share.png]]

![[thoughts/images/NAT-firewall-connection-rates.png]]

Possible explanations for a non-100% connection rate even in EIM-EIF to EIM-EIF peers

- UDP packets being dropped under high UDP packet load (especially in consumer-grade NAT/firewalls)
- Routers stop functioning when mapping tables are full (not out of the realm of possibilies, only 65535 entries)
- Use of [CGNAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) (NAT at the ISP level instead of home-router)

### Terminology Translation Table

[NAT Cone Types](https://tailscale.com/blog/how-nat-traversal-works/)

|                                                | Endpoint-Independent NAT Mapping (EIM) | Endpoint-Dependent NAT Mapping (ADM/EDM) |
| ---------------------------------------------- | -------------------------------------- | ---------------------------------------- |
| Endpoint-Independent Firewall (EIF)            | Full cone NAT                          | n/a                                      |
| Endpoint IP-Dependent Firewall (ADF)           | Restricted Cone NAT                    | n/a                                      |
| Endpoint IP and Port-Dependent Firewall (APDF) | Port-restricted Cone NAT               | Symmetric NAT                            |

### Flow

Let $A$ and $B$ be the two hosts, each in its own private network; $N_A$ and $N_B$ are the two NAT devices with globally reachable IP addresses $EIP_A$ and $EIP_B$ respectively. $S$ is a public server with a well-known, globally reachable IP address.

1. A and B both begin a [UDP](thoughts/UDP.md) conversation with $S$
2. NAT devices $N_A$ and $N_B$ create UDP translations and assign temporary external ports $EP_A$ and $EP_B$
3. S looks at UDP packets to get source ports of $N_A$ and $N_B$ (through $EP_A$ and $EP_B$)
4. S makes pairs of external IP addresses assigned by the NAT along with temporary external ports and exchanges them between $A$ and $B$ (S passes $EIP_A:EP_A$ to $B$ and $EIP_B:EP_B$ to $A$)
5. $A$ and $B$ send packets to each other and their appropriate NAT devices create the entries in their lookup tables
   1. $A$ sends a packet to $EIP_B:EP_B$.
   2. $N_A$ examines $A$'s outgoing packet and adds (Source-IP-$A$, $EP_A$, $EIP_B$, $EP_B$) to its translation table.
   3. $B$ sends a packet to $EIP_A:EP_A$.
   4. $N_B$ examines $B$'s outgoing packet and adds (Source-IP-$B$, $EP_B$, $EIP_A$, $EP_A$) to its translation table.
6. Best case scenario $N_A$ and $N_B$ should have made the entry in the translation. Worst case, both NAT devices have not yet made the entry and drop the first packet sent from $B$
7. At worst, the second packet from both $A$ and $B$ make it to each other. Holes have been "punched" in the NAT and both hosts can directly communicate through $N_A$ and $N_B$ without needing $S$

## Strategies for Robust NAT Traversal

From [Tailscale](https://tailscale.com/blog/how-nat-traversal-works/)

- A UDP-based protocol to augment
- Direct access to a socket in your program
- A communication side channel with your peers
- A couple of STUN servers
- A network of fallback relays (optional, but highly recommended)

Then, you need to:

- Enumerate all the `ip:ports` for your socket on your directly connected interfaces
- Query STUN servers to discover WAN `ip:ports` and the “difficulty” of your NAT, if any
- Try using the port mapping protocols to find more WAN `ip:ports`
- Check for NAT64 and discover a WAN `ip:port` through that as well, if applicable
- Exchange all those `ip:ports` with your peer through your side channel, along with some cryptographic keys to secure everything.
- Begin communicating with your peer through fallback relays (optional, for quick connection establishment)
- Probe all of your peer’s `ip:ports` for connectivity and if necessary/desired, also execute birthday attacks to get through harder NATs
- As you discover connectivity paths that are better than the one you’re currently using, transparently upgrade away from the previous paths.
- If the active path stops working, downgrade as needed to maintain connectivity.
- Make sure everything is encrypted and authenticated end-to-end.

### Peer Discovery in a purely distributed manner

1.  Peer A sends an introduction-request to peer B. Peer B is chosen from an existing pool of neighboring peers.
2.  Peer B sends an introduction-response to peer A containing the address of peer C.
3.  Peer B sends a puncture-request to peer C containing the address of peer A.
4.  Peer C sends a puncture to peer A, puncturing its NAT.

When a peer doesn’t yet have a list of neighboring peers, it will select a bootstrap server for peer B. Bootstrap servers have the same peer discovery protocol as regular peers except they respond to introduction-requests for anyone.

### STUN (Session Traversal Utilities for NAT)

Servers like $S$ usually run STUN. Recognized using a `stun` or `stuns` resource record.

Details how a server can determine what kind of NAT and firewall is between itself and the public Internet.

### ICE (Interactive Connectivity Establishment)

Uses STUN. Provides a structured mechanism to determine the optimal communication path between two peers

### TURN (Traversal Using Relays around NAT)

TURN places a third-party server to relay messages between two clients when direct media traffic between peers is not allowed by a firewall.
