---
title: "Exploring Agent Auth"
tagline: "Eight identity & authorization patterns for AI agents calling tools"
date: 2026-04-08
updatedDate: 2026-04-10
tags: [Python, Jupyter, Docker, Keycloak, OPA, FastAPI, OAuth]
categories: [Security, AI Agents, Identity]
featured: true
links:
  github: "https://github.com/The-CarL/exploring-agent-auth"
---

## Why I built this

AI agents are increasingly calling tools on behalf of real users — booking flights, querying databases, managing infrastructure. But most demos hand-wave past a critical question: **who is the agent acting as, and what is it allowed to do?**

The identity and authorization landscape for agentic systems is fragmented. Some frameworks pass a single API key for everything. Others embed user tokens directly in prompts. A few forward OAuth tokens properly, but skip fine-grained policy checks. I wanted to map this terrain systematically — from the worst practices I've seen in production to patterns that actually hold up under scrutiny.

The result is eight runnable notebooks, each implementing a different auth strategy for the exact same agent performing the exact same tasks. The only thing that changes between notebooks is *how identity and authorization flow through the system*.

## The progression

Each pattern fixes a specific failure of the previous one. Here's the comparison table:

| # | Pattern | Authz lives | Tool sees real user | Crypto proof | Least privilege | Audit trail |
|---|---------|-------------|---------------------|--------------|-----------------|-------------|
| 01 | No auth | nowhere | no | no | no | no |
| 02 | Shared API key | service | no | no | no | partial |
| 03 | User API key in prompt | service | yes (string) | no | no | partial |
| 04 | User API key via tool arg | service | yes (string) | no | no | yes |
| 05 | OAuth token forwarding | service | yes (JWT) | yes | no | yes |
| 06 | Scoped token + OPA | OPA policy | yes (JWT) | yes | yes | yes |
| 07 | On-behalf-of flow | IdP + OPA | yes (delegated JWT) | yes | yes | yes |
| 08 | Token-bound tool credentials | IdP + OPA | yes (bound JWT) | yes | yes | yes |

The progression is intentional. Pattern 01 is the "just make it work" baseline — no auth at all. By pattern 08, you have cryptographically bound, least-privilege tokens with full audit trails and policy-as-code authorization. Each step in between exposes exactly one new class of vulnerability that the next pattern resolves.

## How it works

The setup is deliberately constrained to keep the focus on auth mechanics rather than agent complexity. Every notebook uses the same cast:

- **Three users** — Alice (admin), Bob (regular user), and Dave (read-only) — each with different roles in Keycloak
- **One agent** — an OpenAI-powered agent that can call three tools: read data, write data, and manage users
- **Same prompts** — each notebook runs the same sequence of requests, so you can compare how different auth strategies handle identical scenarios

The agent tries to perform actions across privilege boundaries. In early patterns, Dave (read-only) can escalate to admin-level operations because there's no real authorization. By the later patterns, the system correctly constrains each user to their role, with cryptographic proof of identity flowing through every tool call.

Each notebook ends with a **"What went wrong"** section that explicitly names the vulnerability the next pattern will fix. This makes the progression self-documenting — you can read them in order and build an intuition for *why* each layer of auth infrastructure exists.

## Tech stack

The project is built on a stack chosen for clarity over novelty:

- **Keycloak** — identity provider handling user authentication, role assignment, and token issuance. Runs in Docker with pre-configured realms, clients, and users
- **OPA (Open Policy Agent)** — policy engine for fine-grained authorization decisions. Policies are written in Rego and evaluate JWT claims against resource permissions
- **FastAPI** — the tool services that the agent calls. Each endpoint validates tokens and enforces authorization using the pattern for that notebook
- **Docker Compose** — orchestrates the full infrastructure (Keycloak, OPA, services) so everything comes up with a single command
- **OpenAI** — powers the agent's reasoning and tool-calling capabilities
- **Jupyter** — each pattern lives in its own notebook with inline explanations, runnable cells, and output comparisons

The entire infrastructure spins up locally. No cloud accounts needed, no external dependencies beyond an OpenAI API key.

## Getting started

```bash
git clone https://github.com/The-CarL/exploring-agent-auth.git
cd exploring-agent-auth

# Start the infrastructure
docker compose up -d

# Install Python dependencies
uv sync

# Verify everything is running
jupyter lab
# Open and run notebook 00-verify-setup.ipynb
```

Once the setup notebook passes, work through `01` through `08` in order. Each one builds on the concepts from the previous pattern, so skipping ahead will leave gaps in the mental model.

The notebooks are designed to be read as much as run — the markdown cells walk through the *why* before each code cell shows the *how*.

## What's next

I'm working on a companion blog post for [carloperottino.com](https://carloperottino.com) that dives deeper into the design decisions behind each pattern — the threat models, the trade-offs between developer experience and security posture, and where standards like OAuth 2.0 Token Exchange and DPoP fit into the picture.

The repository itself will continue to evolve as new patterns emerge (RAG with auth context, multi-agent delegation chains, and hardware-bound credentials are all on the roadmap).
