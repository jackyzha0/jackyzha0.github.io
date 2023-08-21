---
title: "git"
date: 2022-12-28
tags:
  - seed
  - technical
---

`git` internals. Heavily inspired by [The Git Parable](https://tom.preston-werner.com/2009/05/19/the-git-parable), a talk by Tom Preston-Werner

## Git Internals

### Snapshots

What if you could take snapshots of your codebase at any time and resurrect that code on demand?

The simplest version of this is something you may have done with Photoshop files.

- You start your work in a directory `project`
- As you make changes, you want to make a snapshot so you make a copy of your entire working folder and rename it `project-version-1`
- After the next chunk of work, you make another copy and rename it `project-version-2`
- In each folder, you include a `message` text file that describes your changes
- To go back to a previous version, you just delete your current working version of rename your snapshot `project`

### Branches

Well now we run into a new problem. What if we roll back to a previous version of the code and then make some more changes?

That is, we create a new snapshot that is _not_ a direct descendent of the preceding snapshot.

Our previous snapshot system only worked for a linear system of changes. How might we handle having multiple points where there are active changes being made?

By looking at your code history as a tree, solving the problem of ancestry becomes trivial. All you need to do is include the name of the parent snapshot in the `message` file you write for each snapshot.

This is also why there is a lot of arboreal terminology in git: branches, trunk, etc.

Now... we run into another problem. How should we name our snapshots now that we can't use a linear system of numbers?

Well, we can actually just name each branch and then list `branch-name: snapshot-name` pairs that represent the tips of branches. Let's store this in a file called `branches`:

```
main: project
tmp-fix: project-version-2-fix
```

To switch to a named branch you need only look up the snapshot for the corresponding name from this file.

To ensure this file is always up to date, creating an additional snapshot on a branch means we should update the entry in `branches` that corresponds to our current branch to the latest snapshot.

### Branches as Pointers

After using branches for a while you notice that they can serve two purposes. First, they can act as movable pointers to snapshots so that you can keep track of the branch tips. Second, they can be pointed at a single snapshot and never move.

Mixing both of these uses into a single file feels messy. Both types are pointers to snapshots, but one moves and one doesn’t.

We can create another file called `tags` to contain static pointers to snapshots.

### Collaboration

Now, imagine you are working with a friend on this project. You give them a copy of all of your snapshots, branches, and tags. Your friend happens to go offline for a while and when you meet up again, you both realize you've been using the same naming system for your snaphsots! Now, you both have snapshots called `project-version-23` and `project-version-24` that have different contents. Also, we have no idea who authored which snapshot!

There are two things we can do to solve this:

1. Snapshot messages will henceforth contain author name and email.
2. Snapshots will no longer be named with simple numbers. Instead, you’ll use the contents of the message file to produce a hash. This hash will be guaranteed to be unique to the snapshot since no two messages will ever have the same date, message, parent, and author. Let's use the SHA-1 hash algorithm

Nice! Now, we can merge our snapshots (and thus our working trees) without conflicts. Because of how we hash our snapshots to get their names, we know that any two snapshots with the same name actually have the same content too.

### Merges

This is what we normally call a merge commit!

However, while constructing the snapshot message for the merge, you realize that this snapshot is special. Instead of just a single parent, this merge snapshot has two parents.

### Eliminating Duplication

We can use [[thoughts/content addressed storage]] and [[thoughts/Merkle-DAG|Merkle-DAGs]]!

1. Create a directory named `objects`
2. Go to the most deeply nested directory in the snapshot
3. Create a temp working file
4. For each file in the directory
   1. Calculate the hash of the contents
   2. Add an entry to the temp working file: `blob {hash} {filename}`
   3. Copy the file into the `objects` directory and rename it to the hash
5. Afterwards, find hash of the temp working file and place it in the objects directory (also using the hash as the name). This represents the folder we just traversed
6. Move up on directory and repeat starting from step 3
   1. When we come across the folder we just traversed, we add the following entry to the temp working file: `tree {hash} {dir name}`
7. Once this has been accomplished for every directory and file in the snapshot, you have a single root directory object file and its corresponding SHA1. We record this in the commit `message`

Thus, we avoid storing duplicate files!

### Compression

Text can be very efficiently compressed using something like the LZW or DEFLATE compression algorithms. If you compress every blob before computing its SHA1 and saving it to disk you can reduce the total storage size of the project history significantly.

## Handy Commands

Think about `git` like a file time machine -- it allows you to traverse and manage an entire multiverse of files (see: [[thoughts/bitemporal]])

- Unstaged files: anything you've done to your current branch of the world that hasn't been staged or committed
- Staged files: things that you've marked as things you want to commit to a snapshot
- A commit: a snapshot in time
- A branch: a specific branch of the multiverse
- A repository: the entire multiverse

Here are some verbs and commands you'll find yourself using a lot locally!

- Verbs
  - `git add {PATH}`: add things to the staging area. Matches whatever directory/file you pass in as the path. For example, using `git add .` adds everything in the current directory. `git add tests/math` adds everything in the `tests/math` folder. `git add '*.js'` adds all JavaScript files (note the quotes here!)
  - `git commit -m {MESSAGE}`: save a snapshot of everything in the staging area with a given message
  - `git commit -am {MESSAGE}`: amend the previous commit with a new message (if you had a typo, for example)
  - `git show {REFERENCE}`: show all changes in a given commit
  - `git reset {REFERENCE}`: set our current `HEAD` to the specified commit
    - Normally, working directly is not affected but staging is updated to match commit
    - `--soft` keeps the staging area
    - `--hard` updates both the staging and working directory to match the commit (this is a hard reset)
    - Use as a local reset button
  - `git status`: Show how many commits ahead/behind we are, as well as staged, unstaged, and untracked files
  - `git reset {PATH}`: unstage specific files/folders
  - `git checkout {BRANCH OR REFERENCE}`: switch branches to the given branch or reference
  - `git reflog`: show a list of commits that moved the tips of branches
    - This is useful for recovering deleted branches and hard resets!
  - `git stash`: stash away everything in the staging area
    - `git stash pop`: take out the changes from the stash and restore it back into the staging area
    - Good for moving changes across branches (oops, I made my changes on `main` instead of my feature branch!)
- Nouns (can be used anywhere where `git` expects a reference)
  - `HEAD`: current tip of the branch
  - `HEAD~2`: go 2 commits back from `HEAD`
  - `25c3be7b5`: go to the commit with hash `25c3be7b5`
  - `HEAD@{2}`: go back to where `HEAD` was 2 moves ago
  - `main@{one.week.ago}`: go back to where `main` branch was a week ago

For collaboration and online repositories:

- `git push {REMOTE} {BRANCH}`: push your local commits on `BRANCH` to a remote repository called `REMOTE`
  - To add a new remote: `git remote add {REMOTE} {URL}`
- `git pull {REMOTE} {BRANCH}`: pull remote commits from `BRANCH` onto your current local branch
- `git merge {BRANCH}`: merge `BRANCH` into our current branch
- `git log --oneline --decorate --color --graph`: pretty print history
