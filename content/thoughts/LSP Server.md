---
title: "LSP Server"
date: 2023-06-13
tags:
  - seed
---

[Source](https://microsoft.github.io/language-server-protocol/overviews/lsp/overview/)

The idea behind the *Language Server Protocol (LSP)* is to standardize the protocol for how tools and servers communicate, so a single *Language Server* can be re-used in multiple development tools, and tools can support languages with minimal effort.

A language server runs as a separate process and development tools communicate with the server using the language protocol over JSON-RPC.

Common signals:

- `textDocument/didOpen`: notifies the language server that a document is open. From now on, the truth about the contents of the document is no longer on the file system but kept by the tool in memory. The contents now has to be synchronized between the tool and the language server using `textDocument/didChange`
- `textDocument/didChange`: tool notifies the server about the document change and the language representation of the document is updated by the language server.
- `textDocument/publishDiagnostics`: the language server analyses this information and notifies the tool with the detected errors and warnings
- `textDocument/definition`: the user executes “Go to Definition” on a symbol of an open document. Has two parameters:
  1.  the document URI and
  2.  the text position from where the ‘Go to Definition’ request was initiated to the server
- `textDocument/didClose`: notification is sent from the tool informing the language server that the document is now no longer in memory. The current contents are now up to date on the file system.

Gotchas

- Column number/length should be calculated using `utf16` offsets instead of [[thoughts/Unicode|Unicode]] codepoints
