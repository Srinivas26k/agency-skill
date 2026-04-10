# Managed Agents and Model Routing

This repository treats Claude Managed Agents as a strong orchestration runtime, not as an exclusive model boundary.

## Core idea

Use Claude Managed Agents for:

- session management,
- tool execution,
- stateful workflows,
- long-running orchestration.

Use other models for specialized generation when they are the better fit.

## How to connect other models

### 1. Through custom tools

Define a custom tool such as `route_generation_request` or `generate_with_model` and execute the actual provider call in your own backend.

Example responsibilities:

- send visual ideation prompts to Gemini,
- send code transformation tasks to another provider,
- use a local or fine-tuned model for ranking or summarization.

### 2. Through MCP servers

Expose model-router tools through MCP and let the managed agent call them as needed.

Typical MCP tool examples:

- `generate_with_gemini`
- `generate_with_openai`
- `rank_with_local_model`
- `transcribe_with_specialized_model`

### 3. Through direct platform adapters

If a team already uses Copilot, Cursor, Goose, Kiro, Gemini, or Windsurf directly, load the same core skill there and skip Claude orchestration entirely.

## Recommended architecture

1. Keep the canonical skill content vendor-neutral.
2. Keep model-routing logic outside the core skill.
3. Keep provider secrets outside reusable agent definitions.
4. Return compact tool outputs so orchestration stays context-efficient.
5. Use the knowledge graph to fetch only the nearest relevant concepts.

## Why graph-based context helps

Flat indexing often causes agents to load more documentation than needed. A graph lets the runtime:

- start from one task node,
- walk to adjacent workflow or platform nodes,
- load only the minimum supporting documents.

That reduces context waste and makes multi-model orchestration more scalable.