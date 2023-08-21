---
title: "Cascading failures"
date: 2022-08-02
tags:
  - seed
aliases:
  - Domino Effect
  - Butterfly Effect
---

Effect can be approximated using a power law distribution

$$p(s) \sim s^{-\alpha}$$

where $\alpha$ is the avalanche exponent. $\alpha$ tends to hover around 1.5-2.

Systems that display some sort of cascading failure are generally characterized by 3 key features:

1. The system is characterized by some flow over a network, like the flow of electric current in the power grid or the flow of information in communication systems.
2. Each component has a local breakdown rule that determines when it contributes to a cascade, either by failing (power grid, earthquakes) or by choosing to pass on a piece of information (Twitter).
3. Each system has a mechanism to redistribute the traffic to other nodes upon the failure or the activation of a component.

## Halting Cascading Failures

Two approaches come to mind

1. Adding new links to increase connectivity and thus $f_c$. However, in most real systems the time needed to establish a new link is much larger than the timescale of a cascading failure.
2. Removing redundant links and nodes. The size of a cascade can be reduced if we intentionally remove additional nodes right after the initial failure (i), but before the failure could propagate.

The mechanism of 2. is similar to the method used by firefighters, who set a controlled fire in the fireline to consume the fuel in the path of a wildfire. In a counterintuitive fashion, controlled damage can be beneficial to a network: the Lazarus Effect

The growth rate of a bacteria is determined by its ability to generate biomass, the molecules it needs to build its cell wall, DNA and other cellular components. If some key genes are missing, the bacteria is unable to generate the necessary biomass. Scientists can _revive_ these dead bacteria by removing five additional genes.

## Examples

Examples from the [_Network Science Book_'s Chapter on Network Robustness](http://networksciencebook.com/chapter/8#cascading):

### Blackouts (Power Grid)

After the failure of a node or a link the electric currents are instantaneously reorganized on the rest of the power grid. For example, on August 10, 1996, a hot day in Oregon, a line carrying 1,300 megawatts sagged close to a tree and snapped. Because electricity cannot be stored, the current it carried was automatically shifted to two lower voltage lines. As these were not designed to carry the excess current, they too failed. Seconds later the excess current lead to the malfunction of thirteen generators, eventually causing a blackout in eleven U.S. states and two Canadian provinces.

Similarly, one of the largest blackouts in North America took place on August 14, 2003, just before 4:10 p.m. Its cause was a software bug in the alarm system at a control room of the First Energy Corporation in Ohio. Missing the alarm, the operators were unaware of the need to redistribute the power after an overloaded transmission line hit a tree. Consequently a normally manageable local failure began a cascading failure that shut down more than 508 generating units at 265 power plants, leaving an estimated 10 million people without electricity in Ontario and 45 million in eight U.S. states.

### Denial of Service Attacks (Internet)

If a router fails to transmit the packets received by it, the [[thoughts/Internet|Internet]] protocols will alert the neighboring routers to avoid the troubled equipment by re-routing the packets using alternative routes. Consequently a failed router increases traffic on other routers, potentially inducing a series of denial of service attacks throughout the Internet.

### Financial Crises

Cascading failures are common in economic systems. For example, the drop in the house prices in 2008 in the U.S. has spread along the links of the financial network, inducing a cascade of failed banks, companies and even nations. It eventually caused the worst global financial meltdown since the 1930s Great Depression.

### Scheduling

Airline schedules include a buffer period between consecutive flights to accommodate short delays. When a delay exceeds this buffer, subsequent flights that use the same aircraft, crew or gate, are also delayed. The consequences of bad weather or mechanical failures can cascade through airline schedules, delaying multiple flights and stranding thousands of passengers.

### Supply and Food Chains

The disappearance of a species can cascade through the food web of an ecosystem, inducing the extinction of numerous species and altering the habitat of others.

The shortage of a particular component can cripple supply chains. For example, the 2011 floods in Thailand have resulted in a chronic shortage of car components that disrupted the production chain of more than 1,000 automotive factories worldwide. Therefore the damage was not limited to the flooded factories, but resulted in worldwide insurance claims reaching $20 billion.
