---
title: "Decentralized marketplace"
date: 2022-06-09
tags:
  - seed
---

Related: [[thoughts/decentralization|decentralization]], [[thoughts/funding|funding]], [[thoughts/web3|web3]]

## Nanopayments

"When you wake up in the morning and flick on a light switch, do you pause to think about how many tiny fractions of a penny that electricity costs? Or do you just flick on the light so you don’t bump your head?

And if you could pay for other kinds of services the same way you pay for electricity — a tiny flow of resources that could be turned on or off at any moment — what possibilities would that open up?"

Can be done through 2 main ways:

1. [[thoughts/state channels|State channels]]
2. Amortized cost through probabilistic payments (i.e. 1% chance to win $100 instead of $1 payment). Over time, the value transmitted on-chain will in expectation match the value represented in the probabilistic nanopayments.

## Orchid

[Website](https://www.orchid.com/)

TLDR; decentralized VPN with nanopayment channels based on xDAI L2 chain

Providers on Orchid run the Orchid server which accepts connection requests and provides VPN service in exchange for immediate payment via nanopayments. Orchid providers stake OXT tokens in an Ethereum smart contract (the directory) to advertise their services to clients. Orchid clients then select providers randomly, weighted by proportional stake, so that the probability of picking a particular provider is equal to their fraction of the total stake.

They also offer prepaid access credits: A frictionless payment system

Orchid’s Prepaid Access Credits provide users the option to pay in fiat for VPN credits denominated in the xDAI stablecoin through a simple in-app purchase on mobile devices. The credits are only spendable with Orchid’s preferred providers for VPN service.

## Golem

[Website](https://blog.golemproject.net/golem-primer/)

Based on Polygon L2 using a native ERC-20 GLM

TLDR: Golem democratizes society’s access to computing power by creating a decentralized platform where anyone can build a variety of applications, request computational resources and/or offer their idle systems in exchange for cryptocurrency tokens

> From large universities to scientists or artists, anyone can leverage the world’s unused computing power to conduct data intensive research and complex computations through the Golem Network

The basic premise of the Golem Network is as follows:

1. providers make some resources available to potential requestors for a price,
2. requestors rent those resources and pay the providers in exchange.

The costs of an activity are based on a pre-agreed set of coefficients that specify the price the requestor is required to pay for the time the activity is running, the processor time used and for starting any activity in the first place.

Payments and transactions happen through [[thoughts/ethereum|Ethereum]].

### Registry

Uses an application registry so anyone can publish their own applications. Goals:

1. Give developers a way to publish their integrations and reach out to users in a decentralized manner
2. Give requestors a place to look for specific tools fitting their needs

3 categories of users:

1. Authors: publish applications
2. Validators: review and certify applications as safe by adding them to a whitelist
3. Providers: can choose whom to trust by selecting validators' whitelist
