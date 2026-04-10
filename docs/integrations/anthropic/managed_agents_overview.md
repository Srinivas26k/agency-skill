# Claude Managed Agents Overview

Claude Managed Agents is a pre-built, configurable agent harness that runs in managed infrastructure. It is a strong fit for long-running, tool-heavy, stateful work where you want a reusable agent definition instead of building your own loop from scratch.

## Messages API vs Managed Agents

| Dimension | Messages API | Claude Managed Agents |
| --- | --- | --- |
| What it is | Direct model prompting access | Managed agent runtime with tools, sessions, and environments |
| Best for | Custom loops and fine-grained orchestration | Long-running tasks and asynchronous work |
| Runtime | You build and host it | Anthropic hosts the agent harness |
| Tool execution | You implement it | Built-in toolset plus MCP and custom tools |

Managed Agents gives Claude access to a managed container where it can read files, run commands, browse the web, and execute code securely. The harness also includes prompt caching, compaction, and session persistence to keep long-running work practical.

## Core concepts

| Concept | Description |
| --- | --- |
| Agent | The reusable definition: model, system prompt, tools, MCP servers, and skills |
| Environment | The container template and network configuration |
| Session | A running task instance tied to an agent and environment |
| Events | Messages, tool activity, status changes, and errors streamed during execution |

## How it works

1. Create an agent with its model, tools, MCP servers, and skills.
2. Create an environment that defines the container and network access.
3. Start a session that references the agent and environment.
4. Send user events and consume streamed events over SSE.
5. Steer, interrupt, or resume work as the session changes state.

## When to use it

Claude Managed Agents is best when you need:

- Long-running execution with multiple tool calls.
- Managed cloud infrastructure instead of self-hosted sandboxes.
- Persistent sessions and filesystems across interactions.
- Low orchestration overhead for agent workflows.

## Built-in tool coverage

The default `agent_toolset_20260401` exposes:

- `bash`
- `read`
- `write`
- `edit`
- `glob`
- `grep`
- `web_fetch`
- `web_search`

You can combine the built-in toolset with MCP toolsets and custom tools.

## Connecting other models

Managed Agents does not need to be the only model runtime in your stack. A practical pattern is to use Claude as the orchestrator and connect other models through tools.

Common options:

1. Custom tools that call your own model gateway.
2. MCP servers that expose model-routing operations.
3. External services that Claude invokes for specialized generation, ranking, or transformation.

That lets one managed agent coordinate work across multiple providers while still keeping a single session and tool history.

## Beta requirements

All Managed Agents endpoints currently require the `managed-agents-2026-04-01` beta header. Official SDKs apply this automatically. Raw HTTP calls must set it explicitly.

## Rate limits

| Operation | Limit |
| --- | --- |
| Create endpoints | 60 requests per minute |
| Read endpoints | 600 requests per minute |

Organization-level spend limits and tier-based API limits still apply.

## Branding guidance

If you are embedding Claude Managed Agents into your own product, keep your product branding separate. Use names like `Claude Agent`, `Claude`, or `{YourAgentName} Powered by Claude` when appropriate, and do not make your product appear to be Claude Code or another Anthropic product.

## Local companion docs

- `getting_started.md`
- `define_your_agent.md`
- `tools.md`
- `mcp_connector.md`
- `skills.md`
- `container_reference.md`
- `reduce_hallucinations.md`
