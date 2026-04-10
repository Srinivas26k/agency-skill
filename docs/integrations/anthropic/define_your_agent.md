# Define Your Agent

An agent is a reusable, versioned configuration that defines persona, capabilities, tool access, and domain context. You create it once and reference it by ID when starting sessions.

## Core fields

| Field | Description |
| --- | --- |
| `name` | Required human-readable name. |
| `model` | Required Claude model configuration. Claude 4.5 and later models are supported. |
| `system` | System prompt that defines role and behavioral rules. |
| `tools` | Built-in agent tools, MCP toolsets, and custom tools. |
| `mcp_servers` | Declared remote MCP servers. |
| `skills` | Attached Anthropic or custom skills. |
| `callable_agents` | Other agents available for orchestration in research preview. |
| `description` | Optional summary of what the agent does. |
| `metadata` | Optional key-value pairs for your own tracking. |

## Create an agent

### HTTP

```bash
agent=$(curl -fsSL https://api.anthropic.com/v1/agents \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d '{
    "name": "Coding Assistant",
    "model": "claude-sonnet-4-6",
    "system": "You are a helpful coding agent.",
    "tools": [{"type": "agent_toolset_20260401"}]
  }')

AGENT_ID=$(jq -r '.id' <<< "$agent")
AGENT_VERSION=$(jq -r '.version' <<< "$agent")
```

### CLI

```bash
ant beta:agents create \
  --name "Coding Assistant" \
  --model '{id: claude-sonnet-4-6}' \
  --system "You are a helpful coding agent." \
  --tool '{type: agent_toolset_20260401}'
```

## Update semantics

Updating an agent creates a new version when the configuration meaningfully changes.

- Omitted fields are preserved.
- Scalar fields are replaced.
- Array fields are fully replaced.
- Metadata is merged by key.
- No-op updates return the existing version.

### Example update

```bash
updated_agent=$(curl -fsSL "https://api.anthropic.com/v1/agents/$AGENT_ID" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "content-type: application/json" \
  -d @- <<EOF
{
  "version": $AGENT_VERSION,
  "system": "You are a helpful coding agent. Always write tests."
}
EOF
)

echo "New version: $(jq -r '.version' <<< "$updated_agent")"
```

## Lifecycle operations

| Operation | Behavior |
| --- | --- |
| Update | Generates a new version when the effective config changes. |
| List versions | Returns version history for auditing and rollback decisions. |
| Archive | Makes the agent read-only. Existing sessions continue; new sessions cannot use it. |

## Notes for this repository

Use agent definitions as adapters, not as the only source of truth. Keep durable workflow knowledge in the skill and docs, then project only the necessary subset into each managed-agent system prompt.
