# Universal Agent Playbook

This repository should not be modeled as a Claude-only package. The correct architecture is a universal core with thin adapters for each host environment.

## Core principle

Separate these concerns:

1. Core knowledge: design systems, workflows, evaluation rules, prompts, and reference material.
2. Agent behavior: orchestration, delegation, quality gates, task planning, and tool strategy.
3. Platform adapters: how each host loads instructions, tools, skills, or MCP connections.
4. Branding: the host product keeps its own product identity while reusing the shared skill corpus.

## Recommended support matrix

| Platform | Best adapter surface | What to reuse from this repo |
| --- | --- | --- |
| GitHub Copilot and VS Code | Prompt files, instructions, repo docs | `skills/`, `agents/`, `docs/integrations/` |
| Cursor | Rulesets and repo docs | `.cursorrules`, `skills/`, `agents/` |
| Claude Code | Local instruction files | `.claude-plugin/`, `docs/integrations/anthropic/` |
| Claude Managed Agents | Agent definitions, tools, MCP, skills, environments | `docs/integrations/anthropic/`, core skill content |
| Kiro | Skill and instruction imports | `skills/`, `agents/`, generated root exports |
| Goose | Prompt packs and tool policies | `skills/`, `agents/`, adapter docs |
| Gemini | Extension manifest and system context | `gemini-extension.json`, `docs/integrations/GEMINI.md` |
| Antigravity | Skill manifest and packaged resources | `skills/agency-designer/skill.json`, packaged corpus |
| Windsurf | Rules and repo-local guidance | `skills/`, `agents/`, flattened exports |
| Codex-style local agents | Prompt files and CLI bootstrap | `.codex/`, CLI, core docs |

## Universal packaging rules

- Keep the canonical skill corpus under `skills/agency-designer/`.
- Keep orchestration patterns under `agents/`.
- Put runtime-specific guidance under `docs/integrations/`.
- Use the CLI only as a projection layer that copies the shared system into a target repo.
- Avoid embedding product-specific branding into the shared skill body unless a platform requires it.

## Naming and branding

When a platform wraps Claude, Gemini, Copilot, or another provider, do not rename the whole project around one provider. Keep the package identity independent and let each adapter describe the runtime it targets.

## Practical rollout plan

1. Maintain one strong core skill.
2. Add per-platform wrappers only when they differ operationally.
3. Normalize tool and MCP guidance so it can be translated between vendors.
4. Keep universal docs current before deepening any single-provider branch.

## What this means for this repository

The design material remains the premium creative core, but the repo should also document:

- managed runtime patterns,
- tool restrictions and policies,
- MCP integration,
- session and orchestration design,
- cross-IDE installation and usage patterns.