# Claude Managed Agents Overview

Pre-built, configurable agent harness that runs in managed infrastructure. Best for long-running tasks and asynchronous work.

---

Anthropic offers two ways to build with Claude, each suited to different use cases:

| | Messages API | Claude Managed Agents |
|---|---|---|
| **What it is** | Direct model prompting access | Pre-built, configurable agent harness that runs in managed infrastructure |
| **Best for** | Custom agent loops and fine-grained control | Long-running tasks and asynchronous work |
| **Learn more** | [Messages API docs](/docs/en/build-with-claude/working-with-messages) | [Claude Managed Agents docs](/docs/en/managed-agents/overview) |

Claude Managed Agents provides the harness and infrastructure for running Claude as an autonomous agent. Instead of building your own agent loop, tool execution, and runtime, you get a fully managed environment where Claude can read files, run commands, browse the web, and execute code securely. The harness supports built in prompt caching, compaction, and other performance optimizations for high quality, efficient agent outputs.

## Core concepts

Claude Managed Agents is built around four concepts:

| Concept | Description |
|---------|-------------|
| **Agent** | The model, system prompt, tools, MCP servers, and skills |
| **Environment** | A configured container template (packages, network access) |
| **Session** | A running agent instance within an environment, performing a specific task and generating outputs |
| **Events** | Messages exchanged between your application and the agent (user turns, tool results, status updates) |

## How it works

1. **Create an agent**: Define the model, system prompt, tools, MCP servers, and skills. Create the agent once and reference it by ID across sessions.
2. **Create an environment**: Configure a cloud container with pre-installed packages (Python, Node.js, Go, etc.), network access rules, and mounted files.
3. **Start a session**: Launch a session that references your agent and environment configuration.
4. **Send events and stream responses**: Send user messages as events. Claude autonomously executes tools and streams back results via server-sent events (SSE).
5. **Steer or interrupt**: Send additional user events to guide the agent mid-execution, or interrupt it to change direction.

## When to use Claude Managed Agents

- **Long-running execution** - Tasks that run for minutes or hours with multiple tool calls
- **Cloud infrastructure** - Secure containers with pre-installed packages and network access
- **Minimal infrastructure** - No need to build your own agent loop, sandbox, or tool execution layer
- **Stateful sessions** - Persistent file systems and conversation history across multiple interactions
