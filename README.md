# Agency Designer Skill

Agency Designer is a cross-platform skill pack for teams who want better AI output in three areas:

- premium web design
- production-grade agent design
- structured marketing copy

It gives your AI workflows stronger taste, better planning, and more reusable execution patterns across Claude, Copilot, Cursor, Gemini, and similar environments.

[![NPM Version](https://img.shields.io/npm/v/agency-skill?color=blue&style=flat-square)](https://www.npmjs.com/package/agency-skill)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

## What You Get

- `/web-design` for high-quality UI direction, layout planning, motion, and implementation guidance
- `/agents-make` for building real agent systems with clear contracts, tool boundaries, and Anthropic-style agent structure
- `/marketing-pro` for landing page copy, positioning, messaging, and CTA refinement
- reusable role docs under `agents/`
- integration guides for Anthropic Managed Agents, MCP, Gemini, and multi-runtime workflows

## Why Use It

Most AI workflows break in predictable ways: generic design, weak orchestration, bloated prompts, and vague agent definitions.

Agency Designer fixes that by pushing the workflow toward:

- stronger visual direction
- better decomposition of work
- narrower and safer tool usage
- reusable skill-based context instead of one giant prompt
- clearer agent definitions for managed runtimes

## Install

### NPX

```bash
npx agency-skill init
```

### Skills Registry

```bash
skills install agency-skill
```

### NPM

```bash
npm install agency-skill
```

## Main Commands

| Command | Use it for |
|---|---|
| `/web-design` | Turn a vague product brief into stronger UI, layout, motion, and implementation direction |
| `/agents-make` | Design a single agent, pipeline, or director tree with production-grade contracts |
| `/marketing-pro` | Write or refine headlines, CTA systems, and conversion-focused page copy |

## /agents-make Now Follows Anthropic-Style Agent Design

`/agents-make` is not just an agent brainstorming prompt.

It now expects an agent system to be defined with the same level of seriousness used in Anthropic Managed Agents documentation:

- agent name
- model choice
- system prompt
- tools
- MCP servers if needed
- attached skills if needed
- callable agents if orchestration is needed
- environment assumptions
- session plan
- quality gates

That means a user can use `/agents-make` to move from an idea to a reusable agent definition instead of getting a loose paragraph about "how an agent might work."

## Anthropic Docs Included

If you want to build agents with Managed Agents-style structure, start here:

- [docs/integrations/anthropic/managed_agents_overview.md](docs/integrations/anthropic/managed_agents_overview.md)
- [docs/integrations/anthropic/define_your_agent.md](docs/integrations/anthropic/define_your_agent.md)
- [docs/integrations/anthropic/tools.md](docs/integrations/anthropic/tools.md)
- [docs/integrations/anthropic/mcp_connector.md](docs/integrations/anthropic/mcp_connector.md)
- [docs/integrations/anthropic/skills.md](docs/integrations/anthropic/skills.md)
- [docs/integrations/anthropic/container_reference.md](docs/integrations/anthropic/container_reference.md)

These docs are included so users can design agents with a proper runtime model, not just prompt wording.

## Supported Environments

- Claude Managed Agents
- Claude Code
- GitHub Copilot
- VS Code agent workflows
- Cursor
- Gemini
- Goose
- Kiro
- Windsurf
- custom agent runtimes

## Typical Workflow

1. Install the skill in your project.
2. Use `/web-design`, `/agents-make`, or `/marketing-pro` depending on the task.
3. Answer the brief questions.
4. Review the proposed system design or plan.
5. Let the agent execute with the right files, tools, and docs in scope.

## Repository Layout

If you want to extend or inspect the package:

- `skills/` contains the core skill files
- `commands/` contains slash-command behavior
- `agents/` contains reusable role definitions
- `docs/integrations/` contains runtime-specific guidance
- `scripts/` contains validation and graph tooling

## Development

```bash
npm test
npm run validate:docs
npm run build:graph
```

## License

MIT. See [LICENSE](LICENSE).
