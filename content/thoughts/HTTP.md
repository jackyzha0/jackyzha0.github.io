---
title: "HTTP"
date: 2022-03-21
tags:
- seed
---

Main method of communication at the [Application Layer](thoughts/Application%20Layer.md) for the web

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