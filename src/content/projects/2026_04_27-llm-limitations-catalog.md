---
title: "LLM vs. The Right Tool"
tagline: "Head-to-head notebooks pitting LLMs against the classical methods built for the job"
date: 2026-04-27
tags: [Python, LLM, ML, Evals]
categories: [AI, Research]
comingSoon: true
links: {}
---

## Why I'm building this

LLMs have become the default answer to almost any problem that involves data and a prompt. A lot of the time they're the wrong answer — not because they fail outright, but because there's a smaller, faster, cheaper, better-calibrated tool that's been quietly solving that exact problem for decades. I want a hands-on map of where that's true.

This catalog is a learning piece for me as much as anything else. Building each comparison from scratch is the fastest way I know to actually internalize where the frontier model earns its keep and where a 200-line scikit-learn script wins on every axis that matters.

## What I'm building

A repository of small, self-contained head-to-head samples. Each one takes a real task, implements it twice — once with an LLM and once with the classical method built for it — and reports the same metrics on both sides.

**Comparison axes, held constant across every sample**:

- **Accuracy / quality** on a held-out test set
- **Latency** per inference
- **Cost** per inference (tokens vs. compute)
- **Sample efficiency** — how much labeled data each side needs to be useful
- **Calibration** — does the confidence score mean anything
- **Determinism** — same input, same output, run after run

**Categories the catalog will cover**:

- **Binary & multi-class classification** on tabular data — gradient boosting vs. LLM-as-classifier
- **Regression on numeric features** — linear / GBM vs. "predict this number from a JSON row"
- **Time-series forecasting** — ARIMA, Prophet, state-space models vs. asking the LLM
- **Anomaly detection** — Isolation Forest, control charts, autoencoders vs. LLM "does this look weird"
- **Clustering & segmentation** — K-means / HDBSCAN vs. LLM grouping
- **Recommendations** — matrix factorization / collaborative filtering vs. LLM "what would they like"
- **Survival analysis** — Cox proportional hazards on churn data vs. LLM
- **Causal inference** — propensity scoring, DiD, IV vs. LLM "what's the effect"
- **Optimization & scheduling** — LP/MIP solvers vs. LLM resource assignment
- **Routing** — OR-tools on TSP/VRP vs. LLM
- **Symbolic math** — SymPy vs. LLM algebra and calculus
- **OCR** — Tesseract / PaddleOCR vs. multimodal LLM on dense documents
- **Lexical retrieval** — BM25 vs. pure-LLM search
- **Learning-to-rank** — LambdaMART on click data vs. LLM reranking

Every notebook ends the same way: a side-by-side table on the six axes above, plus a short writeup on what the LLM actually got wrong (or right) and why.

## What I expect to find

My prior is that the classical method wins on cost, latency, and calibration in nearly every category, and wins on accuracy in most of them. The interesting cases are the ones where the LLM is competitive — usually because the task involves messy unstructured input, very few examples, or a need to explain its reasoning in natural language. Those edges are exactly what I want to map.

## How this connects to the rest of the forge

This pairs naturally with the [LLM Playground](/projects/llm-playground) — the playground is the surface for running prompts side-by-side across providers; this catalog is the curated set of tasks where running a prompt at all is the wrong move. Over time I'd like the catalog entries to feed back into the playground as reference benchmarks.

## The learning piece

I'm being upfront that this is partly a study guide. Building a personal taxonomy of "LLM vs. the right tool" is the fastest way I know to develop honest intuition about where this technology actually fits — and where the unglamorous, well-understood method is still the answer.
