---
title: "Terminals"
date: 2023-04-10
tags:
  - seed
---

## TTY

[Source](https://www.warp.dev/blog/what-happens-when-you-open-a-terminal-and-enter-ls)

Teletypewriter. Fundamentally sends a stream of input characters and displays output

You’ll sometimes hear these apps referred to as **“terminal emulators”** instead of simply “terminals”. Since the term “terminal” used to refer to a dedicated piece of hardware, we consider these apps as emulating that device.

In these emulators, the wires of the traditional TTY are replaced with pairs of file descriptors known as the [PTY](https://www.baeldung.com/linux/pty-vs-tty#bd-what-is-a-pty), short for pseudo-TTY

### Creating a PTY

- The terminal emulator asks the kernel to open a PTY
- The kernel returns the PTY as a file descriptor. This is the 'leader' which is intended for the terminal to interface with (read and write data)
- It also creates a 'follower' PTY which is used by the shell and other processes in the session
- The terminal emulator then spawns the shell which reads and writes from the follower PTY (the shell's `stdin`, `stderr`, and `stdout`) is set to the follower PTY

![[thoughts/images/tty-example.png]]

Note, there only exists a difference between the leader and follower PTYs for the purpose of _line-discipline_, which is a sort of intermediate buffer.

This is where 'special' character behaviour happens:

- Don't send every character that I've typed to the shell, please wait until I press 'Enter'
- Erase the last character from the buffer when I press 'Backspace'

## Shells

To service the full spectrum of use-cases, we want a full, interactive, interpreted programming environment.

The work of running other programs as processes and interpreting the commands you write is done by a shell.

Examples include `bash`, `zsh`, and `fish`

Most shells also display a prompt (e.g.)

```bash
~/projects
❯
```

This is normally stored in a variable `PS1` which supports dynamic information (e.g. current working directory `%d`)

### Login vs non-login shells

- Login shells are shell sessions wherein this shell process is the one the user is logging into the system with
- Non-login shells are shells started when you are already logged in

## Escape-sequences

All of the escape sequences in this output have the format `ESC[c1;...;ckm`. These are called [Select Graphic Rendition](https://vt100.net/docs/vt510-rm/SGR.html) (SGR) escape sequences and are used to assign attributes, like text decorations, to characters. The ci’s are the codes that control the rendering. For example, the code `1` is used to turn on bolding.

See also: [x-term spec](https://www.xfree86.org/current/ctlseqs.html)

## Bash

- `a | b` : pipe the output from program `a` into the input of program `b`
- `a > b`: redirect output of program `a` into a file descriptor `b`, overwriting
- `a >> b`: redirect output of program `a` into a file descriptor `b`, appending

## Warp and Blocks

[Source](https://www.warp.dev/blog/how-warp-works)

Most shells provide hooks for before the prompt is rendered (zsh calls this [precmd](https://zsh.sourceforge.io/Doc/Release/Functions.html)) and before a command is executed ([preexec](https://zsh.sourceforge.io/Doc/Release/Functions.html)). Zsh and Fish have built in support for these hooks. Though bash does not have built in support for these hooks, scripts like [bash-preexec](https://github.com/rcaloras/bash-preexec) exist to mimic the behavior of other shells. Using these hooks, we send a custom DCS ([Device Control String](<https://vt100.net/docs/vt510-rm/chapter4.html#:~:text=Device%20control%20strings%20(DCS)%2C,for%20a%20device%20control%20string.>)) from the running session to Warp. This DCS contains an encoded JSON string that includes metadata about the session that we want to render. Within Warp we can parse the DCS, deserialize the JSON, and create a new block within our data model.

We also create a separate grid for each command and output based on the precmd/preexec hooks we receive from the shell. This level of grid isolation ensures we can separate commands and their output without having to deal with the output of one command overwriting that of another.
