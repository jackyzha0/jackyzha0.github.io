---
title: "Unix"
date: 2023-06-07
tags:
- seed
---

Unix philosophy: expect the output of every program to become the input to another, as yet unknown, program.

See also: [[thoughts/computer architecture|computer architecture]]

## Processes
### PID1 Zombies
[Source](https://blog.phusion.nl/2015/01/20/docker-and-the-pid-1-zombie-reaping-problem/)

Zombie processes: processes that have terminated but have not (yet) been waited for by their parent processes.

Unix processes are ordered in a tree. Each process can spawn child processes, and each process has a parent except for the top-most process.

This top-most process is the init process. It is started by the kernel when you boot your system. This init process is responsible for starting the rest of the system, such as starting the SSH daemon, starting the Docker daemon, starting Apache/Nginx, starting your GUI desktop environment, etc. Each of them may in turn spawn further child processes.

![[thoughts/images/pid1.png|400]]

If a process terminates, it turns into a "zombie process" which Unix still keeps some  minimal set of information about (PID, termination status, resource usage information). In Unix, parent processes must explicitly 'wait' for child processes to terminate. 

The action of calling `waitpid()` on a child process in order to eliminate its zombie, is called "reaping".

If a parent process is killed, the children are 'orphaned' (have no parent process). PID1's job has a special task to adopt these orphaned processes and becomes the parent.  Thus, the operating system expects the init process to reap adopted children too.

## Signals
- SIGTERM can also be referred as a soft kill because the process that receives the SIGTERM signal may choose to ignore it. Allows the process to cleanup, etc.
-  SIGKILL is used for immediate termination of a process. This signal cannot be ignored or blocked. SIGKILL cannot be trapped, so there is no way for processes to terminate cleanly. Suppose that the app you're running is busy writing a file; the file could get corrupted if the app is terminated uncleanly in the middle of a write. Unclean terminations are bad. It's almost like pulling the power plug from your server.