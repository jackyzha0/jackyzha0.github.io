---
title: "Block-reference mechanisms"
date: 2023-04-30
tags:
  - seed
---

[Source](https://subconscious.substack.com/p/block-reference-mechanisms#%C2%A7offset-links-reference-ranges-in-documents)

## Purple

[Source](https://subconscious.substack.com/p/block-reference-mechanisms#%C2%A7offset-links-reference-ranges-in-documents)

> Produce HTML documents that can be addressed at the paragraph level

It does this by automatically creating name anchors with static and hierarchical addresses at the beginning of each text node, and by displaying these addresses as links at the end of each text node.

Purple numbers are stable. That is, they stay the same once generated, even if the text around them changes. This gives you a “hook” to link to that won’t disappear.

In HTML, you might implement Purple Numbers through writing IDs into elements. **It’s like dog-earing the page of a book to find your way back.**

However, this doesn't work if you want to go anymore granular than a paragraph.

## Standoff markup

Popularized by Project Xanadu

The core metadata is contained in a file called an [EDL](https://xanadu.com/xuEDL.html), or Edit Decision List. An EDL is a list of links, together with a range. The range describes a start position, offset from the beginning of the document, plus a length.

```
span: http://hyperland.com/xuCambDemo/WelcXu-D1y,start=25,length=567
span: http://xanadu.com/xanadox/MoeJuste/sources/0-Moe.pscr.txt,start=7995,length=274
span: http://hyperland.com/xuCambDemo/WelcXu-D1y,start=592,length=37
```

## Text fragment links

The basic notion is that you can reference parts of a document by including a snippet of the text you want to reference in the URL. A text fragment link will only break if the specific text fragment being referenced disappears from the document.

![[thoughts/images/text-fragment-example.png]]

See also: [[thoughts/Postel's Law]]
