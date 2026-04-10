# GitHub Copilot Repository Instructions

This repository is a cross-platform skill and agent toolkit, not a generic application scaffold.

## Repository intent

- Treat `skills/agency-designer/` as the canonical skill corpus.
- Treat `agents/` as orchestration guidance.
- Treat `docs/integrations/` as runtime and platform adapter documentation.
- Keep vendor-specific behavior out of the core skill unless it is broadly reusable.

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