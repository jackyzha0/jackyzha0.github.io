---
title: "Unicode"
date: 2023-07-10
tags:
  - seed
---

o god the horror

A letter maps to some bits which you can store on disk or in memory. How do we know how to convert from bit to letters and vice versa?

[Unicode FAQ](https://unicode.org/faq/utf_bom.html)

## ASCII Era

Back in the semi-olden days, the only characters that people cared about on the internet were good old unaccented English letters, and we had a code for them called ASCII which was able to represent every character using a number between 32 and 127.

And all was good, assuming you were an English speaker.

In Asia, even more crazy things were going on to take into account the fact that Asian alphabets have thousands of letters, which were never going to fit into 8 bits. This was usually solved by the messy system called DBCS, the “double byte character set” in which *some* letters were stored in one byte and others took two. It was easy to move forward in a string, but dang near impossible to move backwards.

## Unicode

The commonly recited 'fact' that Unicode is simply a 16-bit code where each character takes 16 bits and therefore 65,536 possible characters is in fact **a myth!!**

A letter maps to something called a *code point*. Every platonic letter in every alphabet is assigned a magic number by the Unicode consortium which is written as a code point in the form U+0639.

How these are stored depends on encodings.

### UTF-8

UTF-8 is the byte-oriented encoding form of Unicode. Code points are represented as a sequence of one to four 8-bit code units.

- Every code point from 0-127 is stored *in a single byte*.
- Only code points 128 and above are stored using 2, 3, in fact, up to 6 bytes.

This has the neat side effect that English text looks exactly the same in UTF-8 as it did in ASCII,

### UTF-16

UTF-16 uses a single 16-bit code unit to encode the most common 63K characters, and a pair of 16-bit code units, called surrogates, to encode the 1M less commonly used characters in Unicode.

Converting to UTF-8, by definition requires that supplementary characters (those using surrogate pairs in UTF-16) be encoded with a single 4-byte sequence.

### UTF-32

UTF-32 uses a single 32-bit code unit.

### Quirks

UTF-16 and UTF-32 use code units that are two and four bytes long respectively. For these UTFs, there are three sub-flavors: BE, LE and unmarked. The BE form uses big-endian byte serialization (most significant byte first), the LE form uses little-endian byte serialization (least significant byte first) and the unmarked form uses big-endian byte serialization by default, but may include a byte order mark at the beginning to indicate the actual byte serialization used.

## Surrogate Code Points

A Unicode code point in the range U+D800..U+DFFF. Reserved for use by UTF-16, where a pair of surrogate code units (a high surrogate followed by a low surrogate) “stand in” for a supplementary code point.

## Illegal sequences

None of the UTFs can generate every arbitrary byte sequence, thus there are some illegal byte sequences.

When faced with this illegal byte sequence while transforming or interpreting, a UTF-8 conformant process must treat the first byte as an illegal termination error: for example, either signaling an error, filtering the byte out, or representing the byte with a marker such as FFFD (REPLACEMENT CHARACTER)

FFFD is normally displayed as a black diamond with a white question mark in it

## Usages

UTF-8 is most common on the web. UTF-16 is used by Java and Windows (.Net). UTF-8 and UTF-32 are used by Linux and various Unix systems.
