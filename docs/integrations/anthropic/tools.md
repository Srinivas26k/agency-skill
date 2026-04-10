# Tools

Claude Managed Agents exposes a built-in toolset that the agent can use autonomously during a session. You control the tool surface at agent-definition time.

## Built-in tools

| Tool | Name | Description |
| --- | --- | --- |
| Bash | `bash` | Execute shell commands in the container |
| Read | `read` | Read local files |
| Write | `write` | Write local files |
| Edit | `edit` | Perform string replacement in files |
| Glob | `glob` | Match file patterns quickly |
| Grep | `grep` | Search text with regex |
| Web fetch | `web_fetch` | Retrieve content from a URL |
| Web search | `web_search` | Search the web |

## Enable the full toolset

```json
{
  "type": "agent_toolset_20260401"
}
```

## Disable specific tools

```json
{
  "type": "agent_toolset_20260401",
  "configs": [
    { "name": "web_fetch", "enabled": false },
    { "name": "web_search", "enabled": false }
  ]
}
```

## Enable only a small subset

```json
{
  "type": "agent_toolset_20260401",
  "default_config": { "enabled": false },
  "configs": [
    { "name": "bash", "enabled": true },
    { "name": "read", "enabled": true },
    { "name": "write", "enabled": true }
  ]
}
```

## Custom tools

You can attach custom tools alongside the built-in toolset. Claude emits a structured tool call, your application executes the tool, and the result is sent back into the session.

```json
{
  "type": "custom",
  "name": "get_weather",
  "description": "Get current weather for a location.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": { "type": "string", "description": "City name" }
    },
    "required": ["location"]
  }
}
```

## Best practices for custom tools

- Write long, explicit descriptions with clear usage and non-usage guidance.
- Prefer fewer, broader tools to many tiny tools.
- Namespace tool names when your tool library spans multiple services.
- Return high-signal, compact responses instead of bloated payloads.