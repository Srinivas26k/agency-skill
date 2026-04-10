# MCP Connector

Claude Managed Agents can connect to remote MCP servers so the agent can use external tools and data through the Model Context Protocol.

## Two-step configuration model

1. Declare MCP servers on the agent.
2. Provide auth at session creation using vault IDs.

This keeps credentials out of reusable agent definitions.

## Declare MCP servers on the agent

```json
{
  "name": "GitHub Assistant",
  "model": "claude-sonnet-4-6",
  "mcp_servers": [
    {
      "type": "url",
      "name": "github",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  ],
  "tools": [
    { "type": "agent_toolset_20260401" },
    { "type": "mcp_toolset", "mcp_server_name": "github" }
  ]
}
```

The `name` assigned in `mcp_servers` must match the `mcp_server_name` used by the `mcp_toolset` entry.

## Provide auth at session creation

```json
{
  "agent": "agent_id_here",
  "environment_id": "environment_id_here",
  "vault_ids": ["vault_id_here"]
}
```

If MCP auth is invalid, session creation still succeeds. The runtime emits a `session.error` event describing the auth failure, and the session may continue without that MCP connection.

## Supported MCP servers

Managed Agents connects to remote MCP servers over HTTP using the protocol's streamable HTTP transport. For durable cross-platform design, keep your MCP declarations narrow and purpose-specific so they can be mirrored in other runtimes as needed.