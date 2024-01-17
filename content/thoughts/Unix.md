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

If a process terminates, it turns into a "zombie process" which Unix still keeps some minimal set of information about (PID, termination status, resource usage information). In Unix, parent processes must explicitly 'wait' for child processes to terminate.

The action of calling `waitpid()` on a child process in order to eliminate its zombie, is called "reaping".

If a parent process is killed, the children are 'orphaned' (have no parent process). PID1's job has a special task to adopt these orphaned processes and becomes the parent.  Thus, the operating system expects the init process to reap adopted children too.

## Signals

- SIGTERM can also be referred as a soft kill because the process that receives the SIGTERM signal may choose to ignore it. Allows the process to cleanup, etc.
- SIGKILL is used for immediate termination of a process. This signal cannot be ignored or blocked. SIGKILL cannot be trapped, so there is no way for processes to terminate cleanly. Suppose that the app you're running is busy writing a file; the file could get corrupted if the app is terminated uncleanly in the middle of a write. Unclean terminations are bad. It's almost like pulling the power plug from your server.

## Namespaces
[Source](https://wizardzines.com/comics/namespaces/)

Currently, Linux implements six different types of namespaces. The purpose of each namespace is to wrap a particular global system resource in an abstraction that makes it appear to the processes within the namespace that they have their own isolated instance of the global resource.

1. `cgroup`
2. `pid`: process ID, allows a PID 1 per container (each process then has a within namespace PID and host PID)
3. `user`: user and group ID name spaces
4. `uts`: hostname and NIS domain names
5. `ipc`: interprocess communication
6. `mnt`: filesystem hierarchy
7. `net`: network devices, IP addresses, routing tables, port numbers, etc.

One of the overall goals of namespaces is to support the implementation of containers, a tool for lightweight virtualization (as well as other purposes) that provides a group of processes with the illusion that they are the only processes on the system.

The default namespace is the "host" namespace.

