# GitHub Copilot Repository Instructions

This repository is a cross-platform skill and agent toolkit, not a generic application scaffold.

## Repository intent

- `commands/` — slash command entry points (/web-design, /agents-make, /marketing-pro)
- `skills/web-design/` — design system protocol and all design resources
- `skills/agents-make/` — agent orchestration protocol
- `skills/marketing-pro/` — conversion copy protocol
- `agents/` — reusable agent role definitions
- `docs/integrations/` — runtime and platform adapter documentation

## Quality bar

- Prefer agency-grade frontend output over generic boilerplate.
- Keep documentation professional, concrete, and reusable.
- Preserve the universal adapter model: one core, many runtimes.
- Prefer graph-oriented context references when summarizing large repo knowledge.

## When editing this repository

- Keep Copilot-facing repository guidance inside `.github/`.
- Do not add CI workflows unless explicitly requested.
- Update integration docs when changing runtime assumptions.
- If you add platform support, document both the adapter surface and the reusable core it depends on.