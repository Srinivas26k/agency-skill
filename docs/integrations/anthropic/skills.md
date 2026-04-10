# Skills

Skills are reusable, filesystem-based resources that provide domain-specific expertise with progressive disclosure. They let a general-purpose agent become a specialist without loading every instruction into the initial prompt.

## Supported skill types

| Type | Description |
| --- | --- |
| `anthropic` | Pre-built Anthropic skills such as spreadsheet and document workflows |
| `custom` | Skills authored and uploaded by your organization |

## Attach skills to an agent

```json
{
  "name": "Financial Analyst",
  "model": "claude-sonnet-4-6",
  "system": "You are a financial analysis agent.",
  "skills": [
    { "type": "anthropic", "skill_id": "xlsx" },
    { "type": "custom", "skill_id": "skill_abc123", "version": "latest" }
  ]
}
```

## Field reference

| Field | Description |
| --- | --- |
| `type` | `anthropic` or `custom` |
| `skill_id` | Anthropic short name or custom `skill_*` identifier |
| `version` | Custom skills only. Use a pinned version or `latest` |

## Design note for this repository

This repository uses the same general pattern even outside Managed Agents:

- Keep durable knowledge in standalone skill files.
- Load only what is relevant to the task.
- Separate core skill logic from platform-specific adapters.