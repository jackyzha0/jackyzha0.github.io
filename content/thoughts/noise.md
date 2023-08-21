---
title: "Noise"
date: 2023-04-18
tags:
  - seed
aliases:
  - RNG
---

[Source](https://www.youtube.com/watch?v=LWFzPP8ZbdU)

## What makes RNG "good"?

- Fair statistical distribution
- Low degree of repetition (more correct: a statistically correct degree of repetition)
- High theoretical maximum (best-case) repeat period
- High guaranteed minimum (worst-case) repeat period: crucially should be about ~million-billion range
- Seedable with a nice range of seeds: we don't want seeds that limit us to only odd numbers or only large primes
- Fast warm up: some popular RNGs have pretty terrible initial values!
- Platform independence: behaviour should be consistent across platforms
- Deterministic: the same seed should lead to the same results
- Speed: we may want to be able to generate lots of numbers, fast!
- Parallelism: is it thread safe?

Why not use `rand()`?

- Only gives us 15-bits of random numbers (range is $[0, 32767]$)
- Not very fast!
- Not very good, statistically speaking
- Global state which is bad for multi-threading!

## What RNG should we use?

### Lehmer/Park-Miller

1. Scale by prime `S`
2. Modulus by prime `M`

```c
uint32_t m_state = 1337; // initial seed
uint32_t S = 0x0000BC8F;
uint32_t M = 0x7FFFFFF;
uint32_t LcgParkMiller::Rand() {
	m_state = (m_state * S) % M;
	return m_state;
}
```

Problem: can get stuck at 0 if the seed is bad

### MCGs (Mixed Congruential Generator)

1. Scale by prime `S`
2. Add bias `B`
3. Modulus by prime `M`

```c
uint32_t m_state = 1337; // initial seed
uint32_t S = 0x0019660D;
uint32_t M = 0x3C6EF35F;
uint32_t M = 0x7FFFFFF;
uint32_t LcgParkMiller::Rand() {
	m_state = (m_state * S + B) % M;
	return m_state;
}
```

### Xor shifting

1. Bit-shift around and xor with yourself a few times

```c
uint32_t m_state = 1337; // initial seed
uint32_t xorshift1::Rand() {
	m_state ^= (m_state << 13);
	m_state ^= (m_state >> 17);
	m_state ^= (m_state << 5);
	return m_state;
}
```

### Noise functions

- Order independent RNG!
- Infinite table: put an index in, get a random float or number back out
  - 1-D function: index is a single number
  - 2-D function: index is a pair of numbers
  - N-D function: index is an n-tuple
- Totally pure: `noise = mungeAndMangleBits(position)`
- Can actually use [[thoughts/hash function|hash functions]] for this
  - `crc32`, `Murmur` , `Squirrel3`, and `std::hash` are all very good and fast
  - `md5` and `sha1` are good but slow (cryptographically sound)

### n-D noise from 1D noise function

Basically munge the coordinates together my multiplying by a large prime number with non-boring bits. Be careful to make sure that the primes are magnitudes apart!

```c
uint32_t Get3DNoise(int x, int y, int z, uint32_t seed) {
	constexpr int PRIME1 = 198491317;
	constexpr int PRIME2 = 6542989;
	return Get1DNoise(x + (PRIME1 * y) + (PRIME2 * z), seed);
}
```
