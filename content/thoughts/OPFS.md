---
title: OPFS
date: 2026-08-24
tags:
  - seed
aliases:
  - Origin Private File System
---

[Source](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)

Per-origin sandboxed [[thoughts/file system|file system]], rooted at `navigator.storage.getDirectory()`. 

- Not visible in the user's real filesystem, wiped when site data is cleared.
- Main thread only gets async handles: `getFileHandle`, `createWritable`
- Workers get `createSyncAccessHandle()`: synchronous `read`/`write`/`truncate`/`flush` at a byte offset
	- Exclusive lock, one open handle per file
	- Effectively `pread`/`pwrite`, which is what C compiled to [[thoughts/WebAssembly|WASM]] already assumes it has
- IndexedDB can't back a storage engine: async, and keyed on whole values rather than byte ranges, so every page read needs a shim
- SQLite and DuckDB both ship an OPFS VFS for this reason
- Evictable under storage pressure unless `navigator.storage.persist()` is granted

See also: [[thoughts/local-first software|local-first software]], [[thoughts/Database|databases]]
