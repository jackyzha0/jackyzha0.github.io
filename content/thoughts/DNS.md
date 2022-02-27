---
title: "DNS"
date: 2022-02-26
tags:
- seed
---

Domain name: an identification string that defines a realm of administrative autonomy, authority, or control within the [Internet](thoughts/Internet.md).

DNS currently has ~300 million DNS registrations. Both query and reply messages follow the same message format. Both always include Name, Type, Class tuples -- Class is usually `IN`. Names cannot be wildcarded but type and class can

How do we resolve domain names to [IP addresses](thoughts/IP%20Addresses.md)? Resolves starting from the root and makes it way down the network hierarchy
1. Root (13 of these worldwide)
2. Top-level Domains (e.g. .com, .net, .org, etc.)
3. Second-level Domains (e.g. Microsoft, UBC)
4. Subdomains (e.g. www)
5. Individual machines
6. Local DNS Servers (not actually a part of the hierarchy, just caches data)

Authoritative DNS server is the server with the actual jurisdiction of the domain name you are looking for. The authoritative server of `cs.ubc.ca` is the `cs` server under UBC. 

Types of queries
1. Recursive Query -- if the name server doesn't know the answer, it asks a downstream server (recursively) for the answer on your behalf.
2. Iterative Query -- if the name server doesn't know the answer, it tells you where to look at next, you do all the querying

DNS servers store resource records (RRs)
Types:
1. A (address records)
	1. name: hostname
	2. value: IPv4 address
2. NS (name server)
	1. name: domain
	2. value: name of DNS server for domain
3. MX (mail exchanger)
	1. name: domain of email address
	2. value: name of mail server
4. AAAA (addressx4 record)
	1. name: hostname
	2. value: IPv6 address

Inserting records into DNS
1. Register name with a registrar
	1. Provide registrar with name and IP address for your authoritative name server (usually a primary and secondary)
	2. Registrar inserts two resource records into the top-level domain server for each authoritative name server
		1. `(example.com, dns1.example.com, NS)`
		2. `(dns1.example.com, 212.212.212.1, A)`
2. Add appropriate records into our own authoritative name server
	1. `(www.example.com, <server-ip>, A)`
	2. `(www.example.com, <server-ip>, MX)`