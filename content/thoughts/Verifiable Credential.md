---
title: "Verifiable Credential"
date: 2022-06-12
tags:
  - seed
aliases:
  - VC
---

Verifiable credentials can be issued by anyone, about anything, and can be presented to and verified by everyone

- Issuer: the entity that generates the credential
- Holder: entity that receives the credential
- Verifier: entity that wants to check the credentials of the Holder

For this to work requires a triangle of trust:

- The issuer trusts the holder
- The holder trusts the verifier
- The verifier trusts the issuer

Verifiable Data Registry (VDR): can be used to maintain identifiers and schemas

To make a VC:

1. Issuer registers a DID and its associated verification key (verkey) to the VDR
2. Issuer writes a credential definition (a template) to the VDR
3. (Optional) Issuer offers a credential to the holder
4. Holder requests a credential from the Issuer
5. Issuer creates a credential based on the definition for the holder
6. Issuer signs the credential with their private part of the verification key, and gives it to the holder (offer)
7. Verifier can then check the credential against the issuer's verkey

![[thoughts/images/verifiable credential.png]]

Example VC

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  "id": "0892f680-6aeb-11eb-9bcf-f10d8993fde7",
  "type": ["VerifiableCredential", "UniversityDegreeCredential"],
  "issuer": {
    "id": "did:example:76e12ec712ebc6f1c221ebfeb1f",
    "name": "Acme University"
  },
  "issuanceDate": "2021-05-11T23:09:06.803Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "degree": {
      "type": "BachelorDegree",
      "name": "Bachelor of Science"
    }
  },
  "proof": {
    "type": "Ed25519Signature2018",
    "created": "2021-05-17T15:25:26Z",
    "jws": "eyJhbGciOiJFZERTQYjY0Il19..nlcAA",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://pathToIssuerPublicKey"
  }
}
```
