---
title: "Signed messages"
date: 2022-06-15
tags:
- seed
---

## Signed Blobs
[From Farcaster Docs](https://www.farcaster.xyz/docs/signed-blob)

Blobs are [[thoughts/security#Message Digest|cryptographically signed]] so that it cannot be tampered with

The structure that holds this data is called a Signed Blob, and it contains three properties:

-   `body` - the JSON object that the user wants to store
-   `merkleRoot` - the hashed body (should be renamed to hash)
-   `signature` - the signed hash

### Signing
1.  Construct the JSON object with the properties in the exact order as specified.
2.  Convert the object to a string to make it hashable.
3.  Hash the string using [keccak256](https://en.wikipedia.org/wiki/SHA-3) and store this value as the merkleRoot
4.  Sign the merkleRoot with the user’s Ethereum wallet, creating a recoverable ECDSA signature and store this in the signature property.

### Verifying
1.  Convert the body to a string to make it hashable.
2.  Hash the string using [keccak256](https://en.wikipedia.org/wiki/SHA-3) and check that it matches the merkle root
3.  Perform an ecRecover on the signature with the merkle root to retrieve the address.
4.  Check that the recovered address matches the expected address.

## Signed Message Digest
- Signature of long messages is computationally expensive
- We can compute a fixed-length "fingerprint"
	- Apply hash function $H$ to message $m$, giving a fixed size message digest, $H(m)$
- Signed message digest
	- Bob sends message $m$ and signed digest $K_B^-(H(m))$
	- Alice receives $m$ and computes $H_{new}(m)$
	- Alice receives signed digest $K_B^-(H(m))$ and computes $K_B^+(K_B^-(H(m)))$
	- If $K_B^+(K_B^-(H(m))) = H_{new}(m)$, the message is considered signed (and untampered)
- Alternative: message authentication code (MAC)
	- Add a secret to the end of each message that is also hashed. It is extremely unlikely that anyone who doesn't know the secret to come up with an appropriate hash
	- Shared secret $s$
	- Hash is computed not on message $m$, but on $m+s$
		- Bob sends message $h = H(m + s)$
		- Alice receives $(m, h)$ and computes $H(m + s)$
		- If $h = H(m+s)$, message is considered signed
	- Fast because encryption is not necessary