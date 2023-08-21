---
title: "HTTP"
date: 2022-03-21
tags:
  - seed
  - CPSC317
---

Main method of communication at the [Application Layer](thoughts/Application%20Layer.md) for the web. A state-transfer protocol. Sometimes called the second waist of the Internet (after [[thoughts/IP Address]])

See also: [[thoughts/Braid HTTP]] for HTTP as state-synchronization

## Connections

1. Non-persistent HTTP (v1.0)
   - At most one object is sent over each [TCP](thoughts/TCP.md) connection
   - Connection is closed as soon as data is transferred
   - Include an additional round trip for the TCP handshake for _each object_ = $2n$ RTTs where $n$ is number of resources
2. Persistent HTTP (v1.1)
   - Multiple requests can be sent over single connection
   - `Keep-Alive` header
   - Round trip for each resource = $n + 1$ RTTs where $n$ is number of resources
   - Pipelining:
     - Can send all the requests at once!
     - Process them all sequentially but get all the responses in the same order as the requests
     - Round trip = 3 RTTs (one for handshake, one for initial resource, one for the rest of the resources)
   - Server has the right to close any connection
     - Usual heuristic is to close the connection after 5 seconds of inactivity

## Cache

- Browser may maintain a cached version of page
- Cache can also be maintained by a separate host (a proxy e.g. Varnish)
- Web servers can provide cache policy
- Calculating cache speedups
  - Cache time = $rRTT_\textrm{cache} + (1-r)(RTT_\textrm{server} + RTT_\textrm{cache})$ where $r$ is the cache hit rate

## Cookies

- Used for storing per-user state
  - "Remember me" authentication
  - Session state
- Applicable for a particular hostname
- Response from server includes `Set-Cookie` header
- Browser saves cookie associated with the server
- Next request to the same server will include Cookie header with the same value
- Two styles of using cookies
  - All the state is in the cookie
    - Total header size limited by servers (~8KBytes)
    - Individual cookie size limited by browsers (~4KBytes)
  - State (or part of it) may be stored server-side: cookie is used to identify entry in server database

## Client/server model

- Client: browser that requests, receives, displays Web objects
- Server: sends objects in response to requests
- Uses [TCP](thoughts/TCP.md) port 80 (443 for HTTPS)
- For each object
  - Client sends one request message at once
  - Server sends full response message at once
- Server is stateless

## Message Format

- Request
  - First line: method, URL, version
  - Headers:
    - `Header-Name: value<CR-LF>`
    - Required
      - `Host: <domain>`
      - `User-Agent: <browser/version>`
    - Empty line to end header section
  - Body here
    - Size determined by `Content-Length` header
- Response
  - First line: version, response code, response text

## Request Methods

1. GET
   1. relevant data is in URL
   2. form data (if needed) is in URL
2. POST
   1. includes form input in message body
   2. used in forms that submit new data
3. HEAD
   1. similar to GET but only returns header
   2. used to check if existing content was modified

## Codes

1. 2xx: success
2. 3xx: additional action required
3. 4xx: client problem
4. 5xx: server problem

## WWW

- A web page consists of objects
- Each object is addressable by a URL
