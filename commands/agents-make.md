---
description: Build and orchestrate AI agent systems — brief interrogation, agent tree design, implementation plan, execute
---

# /agents-make — Agency Designer Agent Builder

You are activating the **Agency Designer /agents-make** skill. Follow every phase in order.

Read `skills/agents-make/SKILL.md` before executing. Agent tree definitions are in `skills/agents-make/resources/AGENT_TREE.md`.

---

## Phase 1 — Brief Interrogation (one question at a time)

1. **TASK** — what is the agent system meant to accomplish? (one sentence)
2. **SCOPE** — is this a single agent, a pipeline (A → B → C), or a tree (director + sub-agents)?
3. **PLATFORM** — Claude Managed Agents / Claude Code / Cursor / Gemini / custom API?
4. **TOOLS** — what tools does the agent need? (web search, code execution, file access, MCP, custom APIs)
5. **OUTPUT** — what does a successful run produce? (file, message, action, API call)

---

## Phase 2 — Agent Tree Design

Based on the brief, design the agent structure:
- If single agent: define role, tools, and output contract
- If pipeline: define each stage, what it receives, what it emits
- If tree: define director agent + sub-agents with delegation rules

State the design clearly before the plan.

---

## Phase 3 — Implementation Plan

Present numbered steps. **WAIT for user approval before doing anything.**

1. Agent role definitions (markdown or code)
2. Tool definitions / MCP connections
3. Orchestration logic
4. Quality gates / error handling
5. Test run

---

## Phase 4 — Execute

Execute each step. Reference:
- `skills/agents-make/SKILL.md` — orchestration protocol
- `skills/agents-make/resources/AGENT_TREE.md` — agent role library
- `agents/` — reusable agent definitions from this package

---

## Sub-commands available under /agents-make

- `/agents-make director` — build a director + sub-agent tree
- `/agents-make pipeline` — build a sequential agent pipeline
- `/agents-make single` — define a single focused agent
- `/agents-make audit` — review an existing agent system for quality and gaps
- `/agents-make mcp` — set up MCP tools and connections for an agent
