---
title: "LLM Playground"
tagline: "Run the same prompt against flagship models side-by-side and see exactly where they differ"
date: 2026-04-21
tags: [TypeScript, LLM, React]
categories: [AI, Tooling]
comingSoon: true
links: {}
---

## The problem

Models change constantly. A new flagship drops every few weeks and suddenly everyone has a strong opinion about it. But forming a real opinion takes more than reading a benchmark table — you need to run *your* prompts and see the outputs yourself. Most people either don't have the tooling to do that quickly, or they rely on a handful of prebuilt prompts that don't reflect the work they actually do.

Arenas let you pick a winner. Benchmarks give you aggregate scores across thousands of inferences. Neither one shows you the specific, line-by-line differences on the prompts you care about.

## What I'm building

A tool that runs the same prompt against the flagship models of every major provider simultaneously and displays the results side-by-side. Not a leaderboard. Not a vote. A diff.

**Auto-discovered models**: the platform detects the current flagship model from each major provider so you're always comparing what's current, not what was current six months ago.

**Bring your own keys**: plug in your API keys for OpenAI, Anthropic, Google, Mistral, and others. Your keys, your usage, no proxy.

**Built-in prompt library**: curated prompts across categories — STEM, creative writing, common sense reasoning, humor, conversation, code generation — so you can explore model differences without writing prompts from scratch.

**Difference highlighting**: outputs are aligned and diffed. Where models diverge — in reasoning approach, factual claims, tone, level of detail — those differences are surfaced and annotated.

**Micro-analysis over macro-benchmarks**: this isn't about running 10,000 inferences. It's about running 5 prompts and deeply understanding the differences. Small sample, high detail.

## Why this is different

Arenas are about ranking. Benchmarks are about aggregate performance. This is about transparency — seeing exactly how each model handles the same input, on the prompts that matter to you, with the differences made visible rather than hidden behind a score.
