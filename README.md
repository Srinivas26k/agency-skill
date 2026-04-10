# Agency Designer Skill

A cross-platform skill and agent toolkit for agency-grade frontend execution, managed runtimes, and AI IDE workflows.

Created by Srinivas Nampalli
Built for modern AI editors, coding agents, managed execution environments, and reusable workflow packaging.

---

[![NPM Version](https://img.shields.io/npm/v/agency-designer-skill?color=blue&style=flat-square)](https://www.npmjs.com/package/agency-designer-skill)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

Agency Designer is designed to act like an agency acceleration layer for AI. It gives AI systems stronger frontend taste, better execution patterns, clearer runtime guidance, and tighter context efficiency.

## Overview

**Agency Designer Skill** began as a premium UI and UX skill pack. It is now expanding into a broader toolkit for:

- beautiful frontend execution,
- agent orchestration,
- managed runtime design,
- MCP and tool integration,
- graph-based knowledge packaging.

The repository is structured so one shared core can be reused across GitHub Copilot, Claude Managed Agents, Claude Code, Cursor, Kiro, Goose, Gemini, Antigravity, Windsurf, and similar environments without duplicating the entire knowledge base.

## What It Adds To AI

Most AI systems fail in one of two ways:

1. They produce generic design because they lack a strong creative system.
2. They waste context because they load too much flat, unstructured documentation.

Agency Designer addresses both problems. It upgrades visual and strategic quality while organizing the knowledge base into reusable, graph-friendly units.

## Core Capabilities

- **Premium design system**: High-end UI direction, typography, color psychology, imagery, and motion patterns.
- **Agency-grade frontend output**: Better landing pages, component systems, interaction design, and conversion-aware structure.
- **Agent orchestration**: Reusable planning, delegation, quality gates, and workflow structure.
- **Managed runtime support**: Documentation for Claude Managed Agents, environments, tools, MCP, skills, and sessions.
- **Cross-platform adapters**: Guidance for GitHub Copilot, Claude Code, Claude Managed Agents, Cursor, Kiro, Goose, Gemini, Antigravity, Windsurf, Codex-style local agents, and VS Code-based workflows.
- **Graph-based context compression**: Knowledge graph generation so agents can load connected concepts instead of scanning the whole repo.

## Managed Agents and Multi-Model Routing

Claude Managed Agents is an important runtime in this repository, but it is not the only target and it should not be treated as a lock-in layer.

Recommended architecture:

1. Use Claude Managed Agents as the orchestration runtime when you want long-running tasks, hosted tools, persistent sessions, and strong MCP support.
2. Connect other model providers through custom tools or MCP servers.
3. Reuse the same core skill files directly in Copilot, Cursor, Goose, Kiro, Gemini, or other platforms when Claude orchestration is not needed.

Typical ways to connect other models:

1. **Custom tools**: expose a backend tool such as `generate_with_model` or `route_generation_request` and call Gemini, OpenAI, xAI, or another provider from your own infrastructure.
2. **MCP servers**: expose model-routing tools over MCP and let the managed agent call them as needed.
3. **Direct adapters**: load the same core skill in a different IDE or runtime without going through Claude.

Key docs:

- [docs/integrations/anthropic/managed_agents_overview.md](docs/integrations/anthropic/managed_agents_overview.md)
- [docs/integrations/anthropic/mcp_connector.md](docs/integrations/anthropic/mcp_connector.md)
- [docs/integrations/MANAGED_AGENTS_AND_MODEL_ROUTING.md](docs/integrations/MANAGED_AGENTS_AND_MODEL_ROUTING.md)
- [docs/integrations/UNIVERSAL_AGENT_PLAYBOOK.md](docs/integrations/UNIVERSAL_AGENT_PLAYBOOK.md)

## Installation

### Via NPX

Bootstrap the starter kit into any project:

```bash
npx agency-designer-skill init
```

### Via Skills Registry

Add the skill from the registry:

```bash
npx skills add srinivas-nampalli/agency-designer-skill
```

### Local Repository Setup

If you are working inside this repository:

```bash
bash scripts/install.sh
```

This installs dependencies, installs Git hooks when a `.git` directory is present, builds the knowledge graph, and validates the documentation set.

## Supported Platforms

- Claude Managed Agents
- Claude Code
- GitHub Copilot and VS Code
- Cursor
- Kiro
- Goose
- Gemini
- Antigravity
- Windsurf
- Codex-style local agent workflows

## Knowledge Graph Architecture

This repository includes a graph-generation step to reduce context waste.

Instead of relying only on flat indexing, the graph maps:

- documents to concepts,
- concepts to platforms,
- concepts to workflows,
- concepts to runtime capabilities.

Generated file:

- [skills/agency-designer/knowledge-graph.json](skills/agency-designer/knowledge-graph.json)

Build it locally with:

```bash
npm run build:graph
```

The intent is to let an agent start from a task node and walk only the nearest supporting documents, reducing context window usage and keeping runtime selection more efficient.

## Repository Structure

The repository separates canonical skill content from runtime-specific adapters.

```text
.
├── .claude-plugin/      # Claude Code-specific local instruction files
├── .codex/              # Codex-style adapter notes
├── .cursor-plugin/      # Cursor-specific configuration
├── .github/             # GitHub Copilot repository instructions
├── .opencode/           # OpenCode integration notes
├── agents/              # Agent orchestration docs and patterns
├── docs/                # Integration and publishing documentation
│   ├── integrations/
│   │   ├── GEMINI.md
│   │   ├── MANAGED_AGENTS_AND_MODEL_ROUTING.md
│   │   ├── UNIVERSAL_AGENT_PLAYBOOK.md
│   │   └── anthropic/
│   │       ├── container_reference.md
│   │       ├── define_your_agent.md
│   │       ├── getting_started.md
│   │       ├── managed_agents_overview.md
│   │       ├── mcp_connector.md
│   │       ├── reduce_hallucinations.md
│   │       ├── skills.md
│   │       └── tools.md
├── hooks/               # Git hooks for validation and graph refresh
├── scripts/             # Installation, validation, and graph-generation scripts
├── skills/              # Canonical skill corpus, packaged resources, and exports
├── tests/               # Validation suite for the quality rubric
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
└── RELEASE-NOTES.md
```

## Universal Packaging Model

This repository treats platform support as an adapter layer:

1. Core skill knowledge lives under `skills/agency-designer/`.
2. Agent orchestration patterns live under `agents/`.
3. Runtime and platform notes live under `docs/integrations/`.
4. GitHub Copilot-specific repository guidance lives under `.github/`.
5. The CLI projects the shared system into consumer repos without changing the canonical source.

That means the same design and workflow logic can be reused in a managed cloud agent, a local IDE assistant, or a skill registry installation.

## Hooks and Scripts

Relevant local automation included in this repository:

- `scripts/install.sh`: bootstrap dependencies, hooks, graph output, and docs validation.
- `scripts/install-hooks.sh`: install repository hooks into `.git/hooks`.
- `scripts/build-knowledge-graph.js`: generate the graph-oriented context file.
- `scripts/validate-docs.js`: validate that critical documentation assets exist.
- `hooks/pre-commit.sh`: run tests, doc validation, and graph generation before commit.
- `hooks/post-merge.sh`: rebuild the graph and revalidate docs after merges.

## GitHub Copilot Support

This repository uses `.github` for Copilot-related guidance rather than CI pipelines.

Primary file:

- [.github/copilot-instructions.md](.github/copilot-instructions.md)

The goal is to keep repository-level Copilot behavior aligned with the shared skill corpus instead of adding unrelated workflow automation.

## AI Agent Slash Commands

When a host platform supports slash-style workflows, these commands can be used to bypass generic component generation:

- `/design [1-100]`
- `/animate [type]`
- `/imagery [mood]`
- `/palette [emotion]`
- `/evaluate`

## Quality Gate

Every interface component produced under this skill is expected to clear a consistent quality threshold:

1. **Typography**: Character-rich display fonts over default system combinations.
2. **Color architecture**: HSL-based, emotionally intentional palettes with depth.
3. **Motion systems**: Deliberate motion language, not decorative filler.
4. **Marketing nuance**: Headlines and CTAs that promise clear value.

## Anthropic Managed Agent Coverage

The Anthropic integration set currently covers:

- Managed Agents overview and positioning
- Agent creation and lifecycle
- Environment and session setup
- Tool configuration and custom tools
- MCP connector patterns
- Skill attachment
- Cloud container reference
- Hallucination reduction guidance

## Contributing

Contributions should improve the shared core or add clearly scoped platform adapters.

1. Review [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
2. Keep platform-specific behavior out of the canonical core unless it is broadly reusable.
3. Update integration docs when runtime assumptions change.
4. Prefer focused pull requests with concrete examples.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
