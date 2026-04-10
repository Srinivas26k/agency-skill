# Define your agent

Create a reusable, versioned agent configuration.

---

An agent is a reusable, versioned configuration that defines persona and capabilities. It bundles the model, system prompt, tools, MCP servers, and skills that shape how Claude behaves during a session.

Create the agent once as a reusable resource and reference it by ID each time you start a session.

## Agent configuration fields

| Field | Description |
| --- | --- |
| `name` | Required. A human-readable name for the agent. |
| `model` | Required. The Claude model that powers the agent. |
| `system` | A system prompt that defines the agent's behavior and persona. |
| `tools` | The tools available to the agent. |
| `mcp_servers` | MCP servers that provide standardized third-party capabilities. |
| `skills` | Skills that supply domain-specific context. |

## Create an agent example (CLI)

```bash
ant beta:agents create \
  --name "Coding Assistant" \
  --model '{id: claude-sonnet-4-6}' \
  --system "You are a helpful coding assistant. Write clean, well-documented code." \
  --tool '{type: agent_toolset_20260401}'
```

The response echoes your configuration and adds an `id`. The `version` starts at 1 and increments each time you update the agent.
