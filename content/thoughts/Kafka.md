---
title: "Kafka"
date: 2023-04-26
tags:
  - seed
---

Apache Kafka is a publish–subscribe based messaging system over [[thoughts/TCP]]. In event streaming, an **event** (also called a message or record) is simply a record of a state change in the system.

![[thoughts/images/simplified-kafka.png]]

Two main actors:

- **Producers** are applications that write data into topics (which each have their own message log)
- **Consumer** are applications that read data from topics

A **Kafka broker** arranges transactions between producers and consumers. Brokers handle all requests from clients to write and read events. A **Kafka cluster** is simply a collection of one or more Kafka brokers.
