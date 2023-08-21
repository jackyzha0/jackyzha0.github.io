---
title: "NVIM Cheatsheet"
date: 2022-07-24
tags:
  - seed
  - technical
---

## Text-objects

- adjectives
  - `i` - inner
  - `a` - whole thing
- nouns
  - `l` - character
  - `w` - word
  - `t` - html tag
  - `{ or [ or < or {`
  - `" or '` - quoted string
  - `q` - parameter

## Mappings

- `<Ctrl>c` - leave insert mode
- `<leader>o` - open file by name
- `<leader>g` - live grep
- `<leader>f` - format file
- `<leader>ca` - code actions
- `f` - hop by 2 chars
- `<ctrl+/>` - comment line or block
- `[[` - jump to previous parameter
- `]]` - jump to next parameter
- Window Navigation
  - `:vsp` - vertical split
  - `:hsp` - horizontal split
  - `<leader><direction>` - move to window in that direction (one of `wasd`)
- Tabs
  - `<alt-<>` - previous tab
  - `<alt->>` - previous tab
  - `<alt-q>` - close tab
  - `<alt-#>` - go to tab `#`
- Language server
  - `gD` - go to declaration
  - `gd` - go to definition
  - `gt` - go to type
  - `<shift>K` - show type hint
  - `<space>rn` - rename
- Moving
  - `%` to jump to matching paren
- Surrounds
  - `ys[text-object][char]` - surround with `char`
  - `ds[text-object][char]` - delete surrounding `char`
  - `cs[char1][char2]` - change surrounding `char1` to `char2`
- Git conflicts
  - `<leader>co` - choose ours
  - `<leader>ct` - choose theirs
  - `<leader>cb` - choose both
  - `<leader>c0` - choose none
  - `]x` - move to previous conflict
  - `[x` - move to next conflict
  - `<leader>m` - open diff view
- Show Keybindings
  - `:Telescope keymaps`
