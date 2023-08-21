---
title: "Privacy"
date: 2022-07-10
tags:
  - sapling
aliases:
  - data privacy
---

Privacy isn't about shutting out everyone and everything. Instead, privacy gives you the power to [[thoughts/agency|choose]] what and with whom you'll share. It provides safety, control and the right to grant access.

Privacy gives you the ability to express yourself, to be creative, to spend your time and your money in whatever manner you like, without the scrutiny of others. It protects our intimate moments, our most embarrassing ambitions, our radical ideas and the ability to be our true selves.

Privacy is freedom, consent, dignity and security.

## Definitions

- Restricting access to information or property to what you wouldn't willingly give away in a particular context
  - Specifically, recognizing that privacy is contextual (Nissembaum)
  - The context of your privacy—what’s being revealed to whom and for what reason—utterly changed and you had no say in it.
- From the point of view of an individual restricting access: privacy is a “zone of inaccessibility” that surrounds a person
- From the perspective of outsiders seeking access: violating someone’s privacy is an affront to that person’s dignity

However, some people take advantage of privacy to plan and carry out illegal or immoral activities

There is also conflicting needs between companies and users

- Companies want to use data to improve their products
- Users want to protect their privacy

Data anonymization isn't enough. Even if some of the data is scrambled and personally identifiable information is stripped, it is susceptable to linkage attacks (correlating rows of the anonymized dataset to other known datasets)

~87% of all Americans can be identified using only 3 pieces of information:

1. zip code
2. birthday
3. gender

## Privacy for independent development

Privacy is the way in which a social group recognizes and communicates to the individual that he is responsible for his development as a unique person, a separate moral agent

It's valuable because it lets us be ourselves. In order to have different kinds of social relationships with different people, we need to have some kind of control over who knows what about us (see: [[posts/context-collapse|context collapse]], [[thoughts/Fishbowl effect]])

## Differential Privacy

tldr; add randomized noise that maintains distribution of data

When submitting a piece of data:

1. A fair coin is flipped.
2. If heads: the real data is sent
3. If tails: we generate a random number to encode the result as random noise (e.g. true for heads, false for tails)

This way, we can't trust any single record to be accurate (plausible deniability), but the aggregate still remains useful.

As we know noise distribution, this can be accounted for the in final calculation.

Note that this will only work for larger datasets as injecting noise into a small dataset will likely result in inaccurate data

### Usage

- Apple for error reporting
- Google for malware reports and traffic reports in Maps

## Contextual Privacy

From Antonio García Martínez in [_The right to never be forgotten_](https://www.thepullrequest.com/p/the-right-to-never-be-forgotten)

Helene Nissenbaum’s ‘contextual privacy’

An example she draws in her work is imagining your interactions with your physician when dealing with a medical issue. Even in a world where the right to live as a stranger among strangers reigns supreme, we unquestioningly turn over the most intimate medical details to people we barely know.

Now, let’s imagine you leave your doctor’s office and fire up Instagram to take your mind off the diagnosis he just gave you, which is that you don’t have brain cancer but you simply suffer from chronic migraines and will just have to deal. Scrolling past pictures of friends and celebrities, you see an advertisement for a migraine medication, specifically for the vestibular migraines you suffer from. While two seconds ago you were willing to send images of your brain across the world for medical advice, you now feel horribly violated knowing that everyone from Facebook to a pharma marketing team know about your condition.

**The [[thoughts/context]] of your privacy—what’s being revealed to whom and for what reason—utterly changed and you had no say in it.**

See also: [[thoughts/GDPR|GDPR]]

## Proxemics

Proxemics, a term coined by anthropologist Edward T. Hall, defines the relationships between a person and their identity, their surroundings, and the social norms of the community around a person or individual.

[Gradients of Intimacy](https://www.are.na/blog/reimagining-privacy-online-through-gradients-of-intimacy)

There are four zones in proxemics

1. the intimate, the "bedroom"
   - The “bedroom,” an equally intimate space where only a few people are invited in. This is like a private DM or a text message between one or two friends or family members. It is a space to share your thoughts. Secrets are welcomed, and comfortably kept.
2. the personal, the "living room"
   - It’s semi-private, but can also host large groups and conversations that are designed to be public, private, or in-between. This setting allows for more intimacy because it allows for a smaller group. This design functions much like a salon or a group gathered for lively debate. The living room is a metaphor for a closed Facebook group or a WhatsApp chat group.
3. the social, the "park bench"
   - It’s like [[thoughts/walking|walking]] down the street and engaging in conversation with a coworker or friend, or having a discussion on the tube or in a pub—is a space where anyone can have a conversation between two or a few people, but that conversation takes place in public. Those in the conversation can control who hears it by lowering their voice or walking to a less populated area.
4. and the public space, the "town hall"
   - This is where we shout our thoughts or share things we don’t mind thousands of people seeing. The town hall is a public square for speaking loudly and deliberately. Your thoughts can spread virally; They will be heard, amplified and sometimes misinterpreted.

- Web2: considers identity public but data private
- Web3: identity is private, but data public

## Rights to privacy

Differing opinions on the status of privacy as a right. General consensus is that privacy is a prudential right. That is, rational agents would agree to recognize some privacy rights because granting these rights is to the benefit of society

- Warren and Brandeis
  - People in modern society have a right to privacy and that this right ought to be respected
  - "The intensity and complexity of life, attendant upon advancing civilization, have rendered necessary some retreat from the world, and man, under the refining influence of culture, has become more sensitive to publicity, so that solitude and privacy have become more essential to the individual"
  - Warren and Brandeis argue, there are no adequate legal remedies available to the victims. Laws against libel and slander are not sufficient because they do not address the situation where malicious but true stories about someone are circulated (especially in cases where consent was not attained ahead of time, like through cameras)
- Thomson
  - Every “privacy right” violation is a violation of another right
- Reiman
  - Privacy is needed if people are to be autonomous moral agents able to develop healthy personal relationships and act as free citizens in a democratic society
  - Our personal information is private to the extent that we can control who has access to it
  - He does not argue that privacy is a natural right, nor does he suggest that a person has complete control over what is held private.

## Taxonomy of Privacy

Proposed by Daniel Solove

1. Information collection refers to activities that gather personal information
2. Information processing refers to activities that store, manipulate, and use personal information that has been collected
3. Information dissemination refers to activities that spread personal information
4. Invasion refers to activities that intrude upon a person’s daily life, interrupt a person’s solitude, or interfere with someone’s decision making

## US Legislation

Restricting information collection

1. The Employee Polygraph Protection Act of 1988 (EPPA) prohibits most private employers from using lie-detector tests under most situation
2. The Children’s Online Privacy Protection Act (COPPA) states that online services must obtain parental consent before collecting any information from children 12 years old and younger.
3. The Genetic Information Nondiscrimination Act of 2008 prohibits health insurance companies and health plan administrators from requesting genetic information from individuals or their family members, and it forbids them from using genetic information when making decisions about coverage, rates, or preexisting conditions

What the US collects on its citizens

1. Census Records. In order to ensure each state has fair representation in the House of Representatives, the United States Constitution requires the government to perform a census every 10 years
2. Internal Revenue Service (IRS) Records
3. FBI National Crime Information Center 2000 includes such categories as wanted persons, criminal histories, people incarcerated in federal prisons, convicted sex offenders, unidentified persons, people believed to be a threat to the president, foreign fugitives, violent gang members, and suspected terrorists
4. OneDOJ Database provides state and local police officers access to information supplied by five federal law enforcement agencies: the FBI; the Drug Enforcement Agency; the Bureau of Alcohol, Tobacco, Firearms, and Explosives; the US Marshals Service; and the Bureau of Prisons
5. Closed-Circuit Television Cameras (CCTV)
6. License-Plate Scanners
7. Police Drones. Federal Aviation Administration rules require that drones used by the police weigh no more than 25 pounds, fly no higher than 400 feet, and be flown during daylight within view of the operator

Covert Surveillance in the States

- Allowed under the Fourth Amendment to the United States Constitution. _But_ it has changed over time
- _Olmstead v. United States_ that the Fourth Amendment protected tangible assets alone. The federal agents did not “search” a physical place; they did not “seize” a physical item
- In 1934 the US Congress passed the Federal Communications Act, which (among other things) made it illegal to intercept and reveal wire communications. Three years later the Supreme Court used the Federal Communications Act to reverse its position on warrantless wiretaps
- After WWII broke out, President Roosevelt agreed to let the FBI resume wiretapping in cases involving national security, though he asked that the wiretaps be kept to a minimum and limited as much as possible to aliens
- In 1967, Supreme Court rendered that citizens should also be protected from all electronic surveillance conducted without warrants, including bugs (hidden microphones used for surveillance)
- Congress passed the Title III of the Omnibus Crime Control and Safe Streets Act of 1968. Title III allows a police agency that has obtained a court order to tap a phone for up to 30 days
- Operation Shamrock: The Signal Security Agency (predecessor to the NSA) contacted Western Union Telegraph Company, ITT Communications, and RCA Communications who allowed SSA to make photographic copies of all foreign government telegram traffic that entered, left, or transited the United States. Facing hostile congressional and press scrutiny, the NSA called an end to Operation Shamrock in May 1975
- The Foreign Intelligence Surveillance Act of 1978 (FISA) allows the president to authorize electronic surveillance of foreign nationals for up to one year without a court order, as long as there is little chance that the surveillance will reveal the contents of communications with any US citizens. This required the government to get a court order from the FISA Court
  - FISA was amended by the Protect America Act of 2007. This act allows the US government to wiretap communications beginning or ending in a foreign country without oversight by the FISA Court.
- In 1986, the ECPA was passed which allows police to attach two kinds of surveillance devices to a suspect’s phone line. If the suspect makes a phone call, a pen register displays the number being dialed. If the suspect gets a phone call, a trap-and-trace device displays the caller’s phone number.
  - While a court order is needed to approve the installation of pen registers and trap-and-trace devices, prosecutors do not need to demonstrate probable cause, and the approval is virtually automatic
  - The ECPA also allows police to conduct roving wiretaps—wiretaps that move from phone to phone—if they can demonstrate the suspect is attempting to avoid surveillance by using many different phones
  - Under the Stored Communications Act, part of the ECPA, the government does not need a search warrant to obtain from an Internet service provider email messages more than 180 days old
    - Many big technology companies have formed an organized called Digital Due Process which is lobbying Congress to update the ECPA
    - The view of the Digital Due Process coalition is that the government should not be able to obtain an email message, document, or photo from an Internet or cloud service provider without a proper search warrant
- Congress passed the Communications Assistance for Law Enforcement Act of 1994 (CALEA)
  - This law required that networking equipment used by phone companies be designed or modified so that law enforcement agencies can trace calls, listen in on telephone calls, and intercept email messages
- The FBI developed the Carnivore Surveillance System in the late 1990s to monitor Internet traffic, including email messages. Armed with a search warrant, the FBI would set up its Carnivore system at the suspect’s Internet service provider. An Internet service provider questioned the FBI's authority to do this under the Electronic Communications Privacy Act but a US District Court ruled against it.
  - In late 2001 the FBI stopped using Carnivore, replacing it with commercial software capable of performing the same function
- Post 9/11, President Bush signed a presidential order allowing the NSA to eavesdrop on international telephone calls and international emails initiated by people living inside the United States, without first obtaining a search warrant
- Congress then passed the USA Patriot Act which amended many existing laws. Four main principal categories
  1.  Providing federal law enforcement and intelligence officials with greater authority to monitor communications
  2.  Giving the Secretary of the Treasury greater powers to regulate banks, preventing them from being used to launder foreign money
  3.  Making it more difficult for terrorists to enter the United States
  4.  Defining new crimes and penalties for terrorist activity
      - Allows courts to authorize law enforcement officers to search a person’s premises without first serving a search warrant when there is “reasonable cause to believe that providing immediate notification of the execution of the warrant may have an adverse effect.”
      - Officers may seize property that “constitutes evidence of a criminal offense in violation of the laws of the United States,” even if that offense is unrelated to terrorism.
  - This had averse effects. In November 2003, the ACLU reported that public apprehension about the Patriot Act had led to a significant drop in attendance and donations at mosques
  - The Council of the American Library Association was the first of many to pass anti-Patriot Act resolutions: "urg[ing] librarians everywhere to defend and support user privacy and free and open access to knowledge and information"
- US Department of Defence created the Threat and Local Observation Notices (TALON) database in 2003. The purpose of the database was to collect reports of suspicious activities or terrorist threats near military bases. The TALON database was shut down on September 17, 2007
- In 2013, Snowden leaked PRISM, which is a program that allowed the NSA gained access to the servers of Microsoft in 2007; Yahoo in 2008; Google and Facebook in 2009; YouTube in 2010; Skype and AOL in 2011; and Apple in 2012. It enabled the NSA to access stored information without obtaining search warrants when the NSA had reasonable suspicion that the person being investigated is a foreigner outside the US
  - Edward Snowden and Glenn Greenwald explained XKeyscore as being a system which enables almost unlimited surveillance of anyone anywhere in the world
  - "You could read anyone's email in the world, anybody you've got an email address for. Any website: You can watch traffic to and from it. Any computer that an individual sits at: You can watch it. Any laptop that you're tracking: you can follow it as it moves from place to place throughout the world. It's a one-stop-shop for access to the NSA's information. ..."

## Code of Fair Information Practices

In the early 1970s, a group convened to recommend a set of policies often dubbed the "bill of rights" for the Information Age

1.  There must be no personal data record-keeping systems whose very existence is secret.
2.  There must be a way for a person to find out what information about the person is in a record and how it is used.
3.  There must be a way for a person to prevent information about the person that was obtained for one purpose from being used or made available for other purposes without the person’s consent.
4.  There must be a way for a person to correct or amend a record of identifiable information about the person.
5.  Any organization creating, maintaining, using, or disseminating records of identifiable personal data must assure the reliability of the data for their intended use and must take precautions to prevent misuses of the data.

The Privacy Act of 1974 represents Congress’s attempt to codify the principles described in the Code of Fair Information Practices. However, in most respects, it has fallen short of the desires of privacy advocates:

1. The Privacy Act applies only to government databases. Far more information is held in private databases, which are excluded. This is an enormous loophole, because government agencies can purchase information from private organizations that have the data they want.
2. The Privacy Act only covers records indexed by a personal identifier.
3. No one in the federal government is in charge of enforcing the provisions of the Privacy Act. Federal agencies have taken it upon themselves to determine which databases they can exempt.
4. The Privacy Act allows one agency to share records with another agency as long as they are for a “routine use.”
