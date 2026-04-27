---
title: "LLM Limitations Catalog"
tagline: "A growing collection of tiny projects that probe what LLMs still aren't good at"
date: 2026-04-27
tags: [Python, LLM, Evals]
categories: [AI, Research]
comingSoon: true
links: {}
---

## Why I'm building this

It's easy to get swept up in what LLMs *can* do. Every release cycle brings a new flagship that nails another category of task, and the headlines move on. The interesting part — the part I want to understand for myself — is the stuff that's still stubbornly hard. The places where models confidently produce wrong answers, lose the thread on long contexts, miscount, hallucinate citations, or quietly drift away from the instruction halfway through a generation.

I want a hands-on map of those failure modes. Not a paper. Not a benchmark report. A catalog of small, runnable samples I can come back to as models evolve.

## What I'm building

A repository of minimal projects, each one targeting a specific category of weakness. Every sample is small enough to read in one sitting and self-contained enough to run against any model.

**Categories I want to cover**:

- **Counting and arithmetic under disguise**: tasks where the math is trivial but the framing trips models up
- **Long-context fidelity**: needle-in-a-haystack variants, but also "did the model actually use the context or paraphrase from priors"
- **Instruction drift**: multi-step instructions where adherence degrades as the output grows
- **Calibrated uncertainty**: probing whether a model knows what it doesn't know, vs. confidently filling in
- **Tool-use brittleness**: scenarios where the right action is to *not* call the tool, or to call it with a slightly modified argument
- **Self-consistency**: same question phrased multiple ways, looking for stability of reasoning rather than stability of answer

Each sample ships with a short writeup: what the failure looks like, why I think it happens, and what changes (if anything) across model generations.

## How this connects to the rest of the forge

This pairs naturally with the [LLM Playground](/projects/llm-playground) — the playground is the surface for running prompts side-by-side, this catalog is the curated set of prompts worth running. Over time I'd like the catalog entries to feed directly into the playground's built-in prompt library.

## The learning piece

I'm being upfront that this is as much for me as for anyone else. Building a personal taxonomy of LLM weaknesses is the fastest way I know to actually internalize where the technology is and isn't reliable. The artifact is useful; the process of producing it is the point.
