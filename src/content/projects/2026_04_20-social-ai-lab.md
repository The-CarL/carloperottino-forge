---
title: "Social AI Lab"
tagline: "A framework for running socialization experiments between LLMs — games, debates, alignment tests"
date: 2026-04-20
tags: [Python, LLM, Benchmarking]
categories: [AI, Research]
comingSoon: true
links: {}
---

## The idea

Traditional AI benchmarks measure what a model knows. They don't measure how a model *behaves* when it has to negotiate, cooperate, or compete with other agents. I think socialization — how LLMs interact with each other and with humans in open-ended scenarios — is where benchmarking needs to go next.

This project is a framework for designing and running multi-agent social experiments. Define the players, the rules, and the scoring. The framework handles orchestration, observation logging, and analysis.

## What I'm building

The framework comes first. Then the experiments.

**Framework layer**: a runtime for multi-agent interactions with pluggable game definitions, configurable agent personas, structured turn management, and full transcript capture. Each experiment is a self-contained module — same pattern as the auth patterns in [Exploring Agent Auth](/projects/exploring-agent-auth).

**Experiments I want to run**:

- **Games**: prisoner's dilemma, ultimatum game, public goods — classic game theory setups where cooperation and defection strategies emerge naturally
- **Debates**: structured argumentation between models on contentious topics, scored by a panel of judge models and human evaluators
- **Alignment probes**: scenarios designed to surface value conflicts — trolley problems, resource allocation dilemmas, loyalty vs honesty tradeoffs — where the interesting signal is *how* models reason, not just what they conclude

## Why this matters

If you want to know whether an LLM will behave well as an autonomous agent, you can't just test it in isolation. You need to see what happens when it faces social pressure, competing incentives, and ambiguous rules. That's what this framework is for.
