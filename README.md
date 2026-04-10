# Agency Designer Skill

A cross-platform skill and agent toolkit for premium product design, managed runtimes, and AI IDE workflows.

Created by Srinivas Nampalli
Built to work across modern AI editors, coding agents, and managed execution environments.

---

[![NPM Version](https://img.shields.io/npm/v/agency-designer-skill?color=blue&style=flat-square)](https://www.npmjs.com/package/agency-designer-skill)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

Stop building generic outputs. Start shipping opinionated, production-grade work.

## Overview

**Agency Designer Skill** started as a premium UI and UX skill pack. It is now expanding into a broader cross-platform toolkit that combines design direction, agent orchestration patterns, managed runtime guidance, MCP integration notes, and reusable workflow documentation.

The repository is designed so the same core knowledge can be adapted to IDE-native assistants, managed agents, skill registries, and platform-specific wrappers without rewriting the underlying system from scratch.

## Core Capabilities

- **Premium design system**: High-end UI direction, typography, color psychology, imagery, and motion patterns.
- **Agent orchestration**: Reusable agent planning, delegation, quality gates, and workflow structure.
- **Managed runtime support**: Documentation for Claude Managed Agents, environments, tools, MCP, skills, and session workflows.
- **Cross-platform adapters**: Guidance for Claude Code, Claude Managed Agents, GitHub Copilot, Cursor, Kiro, Goose, Gemini, Antigravity, Windsurf, Codex, and VS Code-based setups.
- **Portable knowledge packaging**: Keep the core skill in one place and project platform-specific wrappers around it.

## Installation

### Via Node Package Manager (NPX)
Bootstrap the design system into any project rapidly:
```bash
npx agency-designer-skill init
```

### Via Skills Registry
Add this procedural skill to your global ecosystem:
```bash
npx skills add srinivas-nampalli/agency-designer-skill
```

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

## Repository Structure

The repository now separates core skill content from platform-specific integration docs.

```text
.
├── .claude-plugin/      # IDE-specific integrations for Claude Code
├── .codex/              # Rulesets for Codex environments
├── .cursor-plugin/      # IDE-specific integrations for Cursor
├── .github/             # GitHub workflow automations and issue templates
├── .opencode/           # OpenCode integrations
├── agents/              # Agent orchestration docs and patterns
├── docs/                # Integration and publishing documentation
│   ├── integrations/
│   │   ├── GEMINI.md
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
├── hooks/               # Git and system hooks for workflow maintenance
├── scripts/             # Utility scripts for initialization and publishing
├── skills/              # Core skill corpus, packaged resources, and module exports
├── tests/               # Validation suite for the design system components
├── CODE_OF_CONDUCT.md   # Guidelines for community participation
├── CHANGELOG.md         # Version history tracking
└── RELEASE-NOTES.md     # Detailed patch and minor update notes
```

## Universal Model

This repository treats platform support as an adapter layer:

1. Core skill knowledge lives under `skills/agency-designer`.
2. Agent orchestration patterns live under `agents/`.
3. Platform and runtime notes live under `docs/integrations/`.
4. The CLI exports a flattened starter kit for teams that want local files in their repo root.

That means the same design and workflow logic can be reused in a managed cloud agent, a local IDE assistant, or a skill registry installation.

## AI Agent Slash Commands

When utilizing a supported AI IDE, you can trigger these directives to bypass generic component generation:

- `/design [1-100]` — Apply a specific graphic style from the repository.
- `/animate [type]` — Inject advanced GSAP or Framer motion sequences.
- `/imagery [mood]` — Source premium visual assets with CSS branding overlays.
- `/palette [emotion]` — Generate psychology-backed color themes and CSS variables.
- `/evaluate` — Run the rigorous 50-point Agency Designer Quality Rubric assessment.

## The Agency Designer Quality Gate

Every interface component produced under this skill is rigorously evaluated against specific standards:
1. **Typography**: Enforces character-rich display fonts and avoids basic system default fonts.
2. **Color Architecture**: Discards flat primary colors in favor of HSL-based palettes with atmospheric depth and dynamic lighting.
3. **Motion Systems**: Mandates ScrollTrigger narratives, stagger entrances, and kinetic typography.
4. **Marketing Nuance**: Requires headlines and subtext to promise clear outcomes using advanced copywriting psychology.

## Managed Agent Coverage

The Anthropic integration set now covers:

- Managed Agents overview and positioning
- Agent creation and lifecycle
- Environment and session setup
- Tool configuration and custom tools
- MCP connector patterns
- Skill attachment
- Cloud container reference
- Hallucination reduction guidance

## Contributing

We welcome contributions that push the boundaries of AI-assisted UI/UX design.

1. Review the `CODE_OF_CONDUCT.md`.
2. Ensure you are familiar with the 50-point Quality Gate.
3. Keep platform-specific docs separate from the core skill corpus.
4. Submit focused Pull Requests and include examples when changing orchestration or integration guidance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
