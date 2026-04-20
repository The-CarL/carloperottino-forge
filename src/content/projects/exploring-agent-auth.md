---
title: "Exploring Agent Auth"
tagline: "Eight identity & authorization patterns for AI agents calling tools"
date: 2026-04-08
updatedDate: 2026-04-10
tags: [Python, Jupyter, Docker, Keycloak, OPA, FastAPI, OAuth]
categories: [Security, AI Agents, Identity]
featured: true
thumbnail: "/projects/exploring-agent-auth/thumbnail.svg"
links:
  github: "https://github.com/The-CarL/exploring-agent-auth"
---

## Why I built this

AI agents are calling tools on behalf of real users: booking flights, querying databases, managing infrastructure. Most demos skip past a critical question. **Who is the agent acting as, and what is it allowed to do?**

Auth for agentic systems is all over the place. Some frameworks pass a single API key for everything. Others embed user tokens in prompts. A few forward OAuth tokens properly but skip fine-grained policy checks. I wanted to work through these approaches side by side, starting from the worst patterns I've seen in production and ending with ones that actually work.

Eight runnable notebooks, each implementing a different auth strategy for the exact same agent performing the exact same tasks. The only variable is *how identity and authorization flow through the system*.

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

Pattern 01 is the "just make it work" baseline with no auth at all. By pattern 08, you have cryptographically bound, least-privilege tokens with full audit trails and policy-as-code authorization. Each step exposes exactly one new class of vulnerability that the next pattern resolves.

## How it works

Every notebook uses the same setup:

- **Three users**: Alice (admin), Bob (regular user), Dave (read-only), each with different roles in Keycloak
- **One agent**: an OpenAI-powered agent that can call three tools (read data, write data, manage users)
- **Same prompts**: each notebook runs the same sequence of requests, so you can compare how different auth strategies handle identical scenarios

The agent tries to act across privilege boundaries. In the early patterns, Dave (read-only) can escalate to admin-level operations because nothing is actually checking authorization. By the later patterns, each user is correctly constrained to their role, with cryptographic proof of identity flowing through every tool call.

Each notebook ends with a **"What went wrong"** section that names the vulnerability the next pattern fixes. Read them in order and the reasoning behind each layer of auth infrastructure becomes obvious.

## The plugin architecture

The core design decision: each auth pattern is a self-contained plugin with exactly two files.

```
patterns/p01_service_credential/
├── mcp_auth.py      # How the MCP server adds auth to outbound requests
├── service_auth.py  # How the service extracts identity from inbound requests
└── notebook.ipynb   # Teaching narrative
```

This repeats for all eight patterns. The framework handles agent wiring, MCP plumbing, and service scaffolding. Each pattern only owns its auth logic.

### The MCP side: `AuthHandler`

Every pattern's `mcp_auth.py` subclasses a two-method interface:

```python
class AuthHandler:
    async def prepare_request(self, user_context, headers):
        """Add auth credentials to outbound request headers."""
        return headers

    async def before_tool_call(self, user_context, tool_name):
        """Pre-call authorization gate. Return True to proceed."""
        return True
```

Pattern 1 just adds an API key header. Pattern 5 forwards the user's JWT as a Bearer token. Pattern 6 calls Keycloak's token exchange endpoint to narrow the audience before forwarding. The interface stays the same; only the auth logic changes.

### The service side: `Identity`

Each pattern's `service_auth.py` exports identity extraction functions that return a single dataclass:

```python
@dataclass
class Identity:
    method: str   # none, api_key, string_id, jwt, scoped_jwt
    user_id: str | None = None
    claims: dict[str, Any] | None = None
    raw_token: str | None = None
```

The framework provides reusable extractors in `auth_presets.py` for common patterns: API key validation, unverified JWT decoding, JWKS-validated JWT verification, OPA integration. Patterns either use these directly or customize them.

### Runtime wiring

`PatternRunner` dynamically loads each pattern's two files at runtime:

```python
runner = PatternRunner("p01_service_credential")
await runner.start()
await runner.run_as("alice", "What are my expenses?")
```

It imports the pattern's `auth_handler` and `get_identity` functions, then injects them into the MCP server and FastAPI service factories. No central registry. No plugin manager. Just dynamic import and dependency injection.

### Why isolation over abstraction

In production you'd have a single flexible auth layer that supports multiple strategies. I deliberately didn't do that here. Each pattern has its own auth code on both the MCP side and the service side, so you can read exactly what happens at each boundary without tracing through abstractions.

The call flow for every pattern is the same:

```
Agent → MCP Server → auth_handler.prepare_request() → FastAPI Service → get_identity() → filter/authorize → respond
```

Pattern 1's `prepare_request` adds `X-API-Key: shared_secret`. Pattern 7's is identical to pattern 5 (just forwards the JWT), because all the complexity moved to the service side where OPA evaluates relationship-based policies against JWT claims. You can see exactly where the auth boundary shifted by diffing two files.

### What the service sees

Each notebook ends by printing what the service actually received. In pattern 1, the service sees `Identity(method="api_key", user_id=None)` — it knows a valid API key was used, but has no idea who the user is. By pattern 7, it sees `Identity(method="jwt", user_id="alice", claims={role: "employee", department: "engineering", reports_to: "bob"})` and can enforce per-resource policies: Alice can read her own expenses, Bob can approve expenses for his reports, Dave can only read platform-wide documents.

## Tech stack

- **Keycloak**: IdP for user auth, role assignment, and token issuance. Runs in Docker with pre-configured realms, clients, and users.
- **OPA**: policy engine for fine-grained authz decisions. Policies in Rego, evaluating JWT claims against resource permissions.
- **FastAPI**: the tool services the agent calls. Each endpoint validates tokens and enforces the pattern's auth strategy.
- **Docker Compose**: orchestrates everything (Keycloak, OPA, services) so the full stack comes up with one command.
- **OpenAI**: LLM for the agent's reasoning and tool-calling.
- **Jupyter**: each pattern is a notebook with inline explanations, runnable cells, and output comparisons.

Everything runs locally. No cloud accounts needed. You just need an OpenAI API key.

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

Once the setup notebook passes, work through `01` through `08` in order. Each one builds on the previous pattern.

## What's next

Writing a companion blog post for [carloperottino.com](https://carloperottino.com) covering the design decisions behind each pattern.

The repo will also get new patterns over time: RAG with auth context, multi-agent delegation chains, and hardware-bound credentials.
