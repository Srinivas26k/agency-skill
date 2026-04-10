# Agents

This repository orchestrates several subagents for design, build, review, and platform-integration tasks.

The goal is not to lock the project to a single vendor runtime. The same agent patterns should be adaptable across local IDE assistants, managed agents, and skill-based ecosystems.

## Integration Instructions

1. Configure your AI agent workspace to source local instructions from `AGENCY_DESIGNER.md` or the platform-specific docs under `docs/integrations/`.
2. Allow subagents to call `/design`, `/animate`, and other workflow commands where the host platform supports them.
3. For managed runtimes, pair these orchestration docs with the Anthropic guides in `docs/integrations/anthropic/`.
