---
name: new-project
description: Create a worktree and scaffold a new project entry, ready for co-writing.
disable-model-invocation: true
argument-hint: <project-slug>
allowed-tools: Bash, Read, Write, Grep, Glob
---

# New Project — Workspace Setup

You are setting up a new project entry workspace. Follow these steps exactly.

## 1. Parse the slug

The slug is provided in `$ARGUMENTS`.

- If `$ARGUMENTS` is empty, ask the user for a slug and stop.
- Sanitize: lowercase, replace spaces and underscores with hyphens, strip anything that isn't `[a-z0-9-]`.
- Store the sanitized slug as `SLUG`.

## 2. Preflight checks

Run these checks. If any fail, report the issue and stop.

```
git rev-parse --is-inside-work-tree   # must be a git repo
which gh                               # gh CLI must be installed
git status --porcelain                 # working tree must be clean (empty output)
```

If the working tree is dirty, tell the user to commit or stash changes first.

## 3. Fetch and checkout main

```bash
git fetch origin main && git checkout main && git pull origin main
```

## 4. Create a worktree

Set `BRANCH=project/$SLUG`.

Check if the branch already exists locally or remotely:
```bash
git branch --list "$BRANCH"
git ls-remote --heads origin "$BRANCH"
```

If the branch exists, append a timestamp: `BRANCH=project/${SLUG}-$(date +%s)`. Inform the user of the adjusted branch name.

Create the worktree in a sibling directory:
```bash
WORKTREE_DIR="../carloperottino-forge--project-${SLUG}"
git worktree add -b "$BRANCH" "$WORKTREE_DIR" main
```

Then cd into the worktree directory and run `npm install`.

## 5. Scaffold the project entry

Read an existing project from `src/content/projects/` to confirm the frontmatter pattern.

Create the file `src/content/projects/${SLUG}.md` with this content (adjust if the existing project pattern differs):

```markdown
---
title: ""
tagline: ""
date: YYYY-MM-DD
tags: []
categories: []
draft: true
links:
  github: ""
---

```

- Set `date` to today's date.
- Leave `title`, `tagline` empty — the user will fill these in during co-writing.
- Set `draft: true`.
- Leave the body empty (just a blank line after the closing `---`).

## 6. Create the asset directory

```bash
mkdir -p "public/projects/${SLUG}"
```

This directory will hold diagrams, screenshots, and other artifacts for the project.

## 7. Commit the scaffold

```bash
git add "src/content/projects/${SLUG}.md" "public/projects/${SLUG}/"
git commit -m "docs: scaffold project \"${SLUG}\""
```

## 8. Report and stop

Print a summary:

```
Branch:       project/<slug>
Worktree:     <absolute path to worktree>
Project file: src/content/projects/<slug>.md
Assets:       public/projects/<slug>/
```

Then tell the user:

> The workspace is ready. Describe your project and we'll build the write-up together.

**Do NOT start writing content.** Wait for the user to describe their project.

Once the user describes their project, use the `research` agent to gather background before drafting.
