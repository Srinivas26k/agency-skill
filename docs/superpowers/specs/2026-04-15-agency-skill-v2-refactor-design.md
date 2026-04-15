---
title: Agency Skill v2 — Full Refactor Design
date: 2026-04-15
status: approved
---

## Goal
Restructure agency-skill to match the obra-superpowers architecture pattern: clean commands/, skills/ separation, single naming convention, first-principles workflow baked into every command, design.md generation.

## Naming Convention
- npm / skills.sh / CLI binary: `agency-skill` (one name everywhere)
- Display brand: `Agency Designer`
- Skill folder names: kebab-case matching slash command name

## Folder Structure

```
agency-skill/
├── CLAUDE.md                        ← entry point (Claude Code + Managed Agents)
├── GEMINI.md
├── AGENTS.md → CLAUDE.md
├── package.json
├── skill.json                       ← single canonical manifest
├── bin/cli.js
├── commands/
│   ├── web-design.md                ← /web-design
│   ├── agents-make.md               ← /agents-make
│   └── marketing-pro.md             ← /marketing-pro
├── skills/
│   ├── web-design/
│   │   ├── SKILL.md
│   │   └── resources/               ← COLOR_PSYCHOLOGY, TYPOGRAPHY, GSAP, etc.
│   ├── agents-make/
│   │   ├── SKILL.md
│   │   └── resources/AGENT_TREE.md
│   └── marketing-pro/
│       ├── SKILL.md
│       └── resources/MARKETING_COPY.md
├── agents/                          ← reusable agent role definitions
├── docs/integrations/
├── hooks/
├── scripts/
├── tests/
├── .claude-plugin/plugin.json
├── .cursor-plugin/plugin.json
├── .codex/INSTALL.md
├── .opencode/plugins/agency-skill.js
└── .github/copilot-instructions.md
```

## Command Protocol (all three commands follow this)
1. Brief interrogation — one question at a time
2. Agent selection — announce which agents activate
3. Implementation plan — numbered steps, wait for approval
4. Execute
5. /web-design always generates/updates design.md in user project root

## design.md Contents
Palette (HSL tokens), Typography (pairs + scale), Spacing system, Component language (radius/shadow/border), Motion rules (easing/GSAP config), Imagery rules, Icon system.

## Deletions
- Root-level core/, animations/, psychology/, styles/, commands/ (all duplicates)
- Root SKILL.md, root AGENCY_DESIGNER.md (replaced)
- skills/agency-designer/ (split into 3 skill folders)
- Duplicate skill.json inside skills/agency-designer/
- agency-designer CLI alias
