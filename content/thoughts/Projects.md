---
title: "Projects"
date: 2021-12-27
tags:
  - evergreen
  - technical
---

This is a list of notable projects that I've finished and or currently maintaining. My (considerably longer) list of unfinished ideas can be found [here](thoughts/idea%20list.md).

## `bft-json-crdt`

The first public implementation of a JSON-like Byzantine Fault Tolerant CRDT. The project implements a simplified Automerge-like CRDT as well as the ideas in Martin Kleppmann's 2022 paper on _Making CRDTs Byzantine Fault Tolerant_. The blog post also [hit #3 on Hacker News](https://news.ycombinator.com/item?id=33694568) the day it was released and has been [featured in go-to resources for CRDTs](https://crdt.tech/).

GitHub, [[posts/bft-json-crdt|blog post]]

## Tabspace - a scratchspace for your new tab page

A beautiful new tab replacement that gives you your very own scratch space to help you stay organized and focused. Wanted to experiment with [[thoughts/formality considered harmful|low-friction]] note taking and integrating [[thoughts/game design|game design]] principles of 'juiciness' into UI/UX.

[GitHub](https://github.com/jackyzha0/tabspace), [Chrome Webstore](https://chrome.google.com/webstore/detail/tabspace/kcinhoikngobhiikicnpahoanenlnlha)

## miniraft - <1kloc Raft consensus algorithm implementation

A minimal implementation of the [[thoughts/Raft Consensus Algorithm|raft Consensus Algorithm]] with a focus on readability/understandability. This project was created as an exercise in implementing and learning about distributed systems.

[GitHub](https://github.com/jackyzha0/miniraft), [Documentation](https://jzhao.xyz/miniraft/miniraft/)

## Cursor Chat -- open source library for digital presence

[GitHub](https://github.com/jackyzha0/cursor-chat), [Demo](https://jzhao.xyz/cursor-chat/)

A lightweight (31.8kB) cursor chat à la Figma for digital co-existing + presence. An experiment in spatial software, [interaction design](thoughts/interaction%20design.md), and [digital commons](thoughts/digital%20commons.md).

Built on top of [yjs](https://github.com/yjs/yjs) and [perfect-cursors](https://github.com/steveruizok/perfect-cursors).

## Telescopic Text -- open source library for expandable text

[GitHub](https://github.com/jackyzha0/telescopic-text), [Demo](https://jzhao.xyz/telescopic-text/demo/)

An open-source library to help with creating expandable text, inspired by [StretchText](https://en.wikipedia.org/wiki/StretchText) and [TelescopicText](https://www.telescopictext.org/text/KPx0nlXlKTciC).

I've been thinking a lot about creating a browsable store of knowledge that provides something useful at all distance scales (e.g. viewing the entire library, just a subcategory, a single file, etc.) and concepts like Telescopic Text are a first step in creating more [[thoughts/information scales|information scales]] than just a single document level.

## Portal -- zero-config [P2P](thoughts/peer-to-peer.md) encrypted folder syncing

[Producthunt](https://www.producthunt.com/posts/portal-11), [GitHub](https://github.com/jackyzha0/portal)

Portal is a command line tool that syncs folders between multiple devices. Perfect for syncing photos/videos/code between many devices without using a 3P tool like GitHub, Email, or Google Photos. Built on top of the Hypercore protocol with Ink for the CLI.

Built with: [[thoughts/Hypercore|Hypercore]], React, Ink, and Typescript

## Quartz -- create and publish digital gardens for free

[Site](https://quartz.jzhao.xyz/), [GitHub](https://github.com/jackyzha0/quartz)

Quartz is a tool and workflow to make maintaining and publishing a digital garden and second brain extremely easy. It involved creating a static site generator from scratch. See the [architecture](https://quartz.jzhao.xyz/advanced/architecture) page for more information.

Build with: Typescript, esbuild, and Node

## Legist -- a platform to summarize policy for [democracy](thoughts/democracy.md)

[DevPost (Finalists at HTN 2020++)](https://devpost.com/software/legist), [GitHub](https://github.com/htn2020plusplus)

Legist is a web platform that allows users to digest policies in an efficient and accessible manner. Legist allows users view automagically summarize pieces of policy + legislation while still maintaining the key takeaways, view and filter policies by category, and subscribe to periodic rollups on updates. Frontend was built with React + Typescript + Chakra UI. Text summarization was done using DistilBART, Named-entity recognition with BERT, and zero-shot text categorization using BART. All models were served with BentoML. Built at Hack the North 2020++, winning the Founder Institute Fellowship Prize and finalist among over 3000+ participants

Built with: React, Firebase, GraphQL, CockroachDB, Node.js, Flask, Docker, MailGun, BentoML, HuggingFace, TypeScript, Python, JavaScript

## ctrl-v -- a modern, open-source pastebin

[App](https://ctrl-v.app/), [GitHub](https://github.com/jackyzha0/ctrl-v)

ctrl-v is a modern, open-source pastebin with LaTeX and Markdown rendering support. Any user can create a paste without an account, with the ability to protect it with a password and set an expiry date. Additionally, ctrl-v does code highlighting as well as LaTeX and Markdown rendering. Pastes are stored in a MongoDB Atlas instance. Backend is a containerized Go service deployed on Google Cloud Run. Frontend is a SSR Next.js app hosted on Vercel.

Built with: React, Next.js, Vercel, styled-components, MongoDB, Cloud Run, GCR, JavaScript, Go, Docker

## reflect -- a mindful website blocker for the productive

[Site](https://getreflect.app/), [GitHub](https://github.com/jackyzha0/reflect-chrome)

reflect is a browser extension with 800+ active users focused around asking users to reflect before visiting distracting sites, helping to reduce mindless scrolling while still being able to get work done. During closed-beta, we created a Go service that logged user intents to a Cloud SQL database and did intent classification by serving a basic Flask API. We then trained an LSTM network in Keras on the closed-beta data and augmented it using [[thoughts/NLP|NLP]] data augmentation techniques, reaching ~86% classification accuracy. Finally, the model was ported to Tensorflow.js where it runs in-browser within the extension which is written in Typescript.

Built with: Kubernetes, Docker, GKE, Cloud SQL, Keras, Tensorflow.js, Flask, CircleCI, TypeScript, Python, Go

## nanoDB -- a simple, easy, and debuggable document database

[GoDoc](https://godoc.org/github.com/jackyzha0/nanoDB), [GitHub](https://github.com/jackyzha0/nanodb)

nanoDB arose out of many frustrations I've personally come across while prototyping, namely 1) difficulty of debugging data 2) faffing around with language specific drivers and 3) reference resolution. As a result, nanoDB stores everything on disk as a JSON document, has built-in reference resolution, and can be used fully through a REST API. Think of it like Redis but with MongoDB style documents — all of which is on-disk, human-readable, and through a REST API. The project is fully written in Go and is thoroughly unit-tested. It features a standalone server binary which creates a nanoDB server, as well as a shell which allows you to do some basic document inspection.

Built with: Docker, Go

## readAR -- an AR app to help those with learning disabilities

[DevPost (TreeHacks 2020, Microsoft Azure Champ Prize - Hack for Good)](https://devpost.com/software/readar-twh41m), [GitHub](https://github.com/jackyzha0/treehacks2020-backend)

readAR is a mobile AR app re-renders text to be more dyslexic-friendly, and adds context-dependent word definitions and images. A custom BERT model was created and trained for word sense disambiguation (WSD), achieving a 76.6% F1% score on the test dataset which is only ~5% away from state-of-the-art. This model is served through Flask on an Oracle VM Instance. The API is also responsible for our image processing pipeline, which is a conglomerate of different Azure APIs (OCR, Text Analytics, Bing Search).

Built with: PyTorch, Flask, Docker, Azure, Oracle Cloud, Python, Bash

## Impostor -- group pomodoro timer with a twist

[Devpost (Finalist at DubHacks 2020, Disney Prize)](https://devpost.com/software/impostor), [GitHub](https://github.com/h4ckh0use)

Imposter is a productivity timer designed to keep friends on task together even when working remotely. The Chrome extension monitors your browser tabs, checking against a blocklist of unproductive sites. If one of those websites is visited, the backend will be notified via Firebase and will notify all users in the room through a WebSocket connection. Chat and character customization is also supported.

Built with: Firestore, WebSockets, Node.js, Heroku, JavaScript

## Speech2Braille -- a wearable device to transcribe speech

[Paper (Silver + 10k in awards at Canada Wide Science Fair)](res/gvrsf_report.pdf), [GitHub](https://github.com/jackyzha0/Speech2Braille)

Speech2Braille was created to help the over 360 million people in the world who have debilitating hearing loss. This project entailed creating an end-to-end speech recognition system using an Deep LSTM and a portable device to display braille. The device is able to recognize audio and transcribe it into Braille through the haptic feedback device via a novel neural network architecture. The feedback device is a self-made GPIO hat, consisting of 6 solenoids. The neural network itself is 2 layered LSTM-CTC network with 256 hidden cells in each layer, achieving 92% state-of-the-art word error rate on the TIMIT dataset.

Built with: Tensorflow, numpy, Raspberry Pi, Python, Bash

## PacketBook -- blockchain banking without [Internet](thoughts/Internet.md)

[Devpost (nwHacks 2018 SAP Prize, Top 30)](https://devpost.com/software/packetbook), [GitHub](https://github.com/jackyzha0/PacketBook)

PacketBook is a financial accessibility chatbot, fully accessible through the SMS (text messaging) protocol. Users are able to issue simple commands to register, check their balance, deposit, withdraw, and send money. These commands are secured with two-factor authentication through a Flask server on Heroku with Twilio. The backend that handles transaction is written with Node and Express and deployed on stdlib. PacketBook is unique in that it leverages the Stellar blockchain and tokens (XLM) for its transactions which greatly reduces operating overhead with its minimal transaction costs (around 1/100 of a cent per transaction).

Built with: MongoDB, Node.js, Express, Flask, Stellar, Heroku, JavaScript, Python
