# agency-skill

**Agency Designer** is a cross-platform AI skill that brings agency-grade design, agent engineering, and conversion marketing into any AI IDE or coding environment.

Install it once. Use it in Claude, Copilot, Cursor, Gemini, Goose, Kiro, Windsurf — any environment that supports skills or instruction files.

[![NPM Version](https://img.shields.io/npm/v/agency-skill?color=blue&style=flat-square)](https://www.npmjs.com/package/agency-skill)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

---

## What It Does

Three commands. Each one turns a vague idea into structured, production-ready output.

| Command | What it gives you |
|---|---|
| `/web-design` | A full design system — palette, typography, layout, motion, components — and a `design.md` your team can build from |
| `/agents-make` | A production-grade agent definition with model, system prompt, tools, MCP servers, skills, and callable agents — Anthropic Managed Agents style |
| `/marketing-pro` | Conversion-focused copy — headlines that follow the [Result without Pain] formula, specific CTAs, structured page copy, and an audit score |

Every command interrogates your brief one question at a time, selects the right sub-agents, presents a numbered plan, and waits for your approval before doing anything.

---

## Install

**Bootstrap into any project:**

```bash
npx agency-skill init
```

This copies the slash commands, agent definitions, and design resources directly into your project.

**Via Skills Registry:**

```bash
skills install agency-skill
```

**Via NPM:**

```bash
npm install agency-skill
```

---

## How It Works

1. Type `/web-design`, `/agents-make`, or `/marketing-pro` in your AI IDE
2. Answer a few brief questions — one at a time, no walls of text
3. Review the proposed plan
4. Approve it, then let the skill execute with the right agents in scope

---

## /web-design

Produces a complete design system for any product, page, or component.

**What you get:**
- Color palette as HSL CSS variables (psychology-first, not random)
- Premium font pairing with full type scale
- Layout structure and component language
- GSAP / Framer Motion animation layer
- A `design.md` file written to your project root — your living design system doc

**Sub-commands:**
```
/web-design component [name]   → generate a single component
/web-design page [type]        → full page (saas-landing, portfolio, agency, etc.)
/web-design palette [emotion]  → psychology-first color system
/web-design font [personality] → premium font pairing
/web-design animate [type]     → GSAP / Framer / Anime.js animation
/web-design audit              → quality rubric score
/web-design style [1-100]      → apply one of 100 graphic design styles
```

---

## /agents-make

Designs a real agent system — not a vague description of one.

Output follows the Anthropic Managed Agents definition format:

```json
{
  "name": "Your Agent",
  "model": "claude-sonnet-4-6",
  "description": "What it does",
  "system": "Behavioral rules and constraints",
  "tools": [{ "type": "agent_toolset_20260401" }],
  "mcp_servers": [],
  "skills": [],
  "callable_agents": [],
  "metadata": {}
}
```

Plus: environment definition, session contract, and quality gates.

Works for any platform — if you're not on Anthropic Managed Agents, the same schema is adapted to your runtime.

**Sub-commands:**
```
/agents-make single     → one production-ready agent definition
/agents-make pipeline   → sequential pipeline with handoff contracts
/agents-make director   → director + callable sub-agent tree
/agents-make managed    → full Anthropic Managed Agents spec
/agents-make mcp        → MCP server and tool boundary setup
/agents-make audit      → review an existing system for gaps
```

---

## /marketing-pro

Structured conversion copy using proven frameworks.

**What you get:**
- Hero headline in 3 variants (using [Result without Pain] formula)
- Sub-headline and value proposition
- Primary and secondary CTAs — never "Learn More" or "Get Started"
- Specific social proof copy
- Section headlines and FAQ objection handlers
- Conversion audit score

**Frameworks available:** PAS, AIDA, FAB, BAB

**Sub-commands:**
```
/marketing-pro headline [context]  → 5 headline variants
/marketing-pro cta [action]        → CTA copy variants
/marketing-pro audit               → conversion rubric score
/marketing-pro rewrite             → full page copy rewrite
/marketing-pro email [type]        → email sequence
/marketing-pro seo [keyword]       → SEO-optimised copy
/marketing-pro ab [element]        → A/B test variants
```

---

## Supported Environments

Works in any AI IDE or coding agent that supports skills, instruction files, or slash commands:

- Claude Code
- Claude Managed Agents
- GitHub Copilot
- Cursor
- Gemini
- Goose
- Kiro
- Windsurf
- VS Code agent workflows
- Any custom agent runtime

---

## Agents Included

The skill ships with five reusable agent role definitions your AI can invoke during any workflow:

- `@visual-director` — palette, typography, and style decisions
- `@motion-engineer` — GSAP, Framer Motion, and scroll behavior
- `@copy-strategist` — headlines, CTAs, and conversion copy
- `@quality-auditor` — S-Tier rubric check (scores 0–50 across typography, color, motion, imagery, copy)
- `@brief-analyst` — turns vague briefs into structured WHO/WHAT/FEEL/STYLE specs

---

## Anthropic Agent Docs Included

Full Anthropic Managed Agents documentation is bundled so your AI can reference the real spec while designing:

- Agent definition schema
- Tool configuration (built-in toolset + custom tools)
- MCP connector setup
- Skills attachment
- Environment and session planning
- Hallucination reduction patterns

---

## License

MIT. Created by [Srinivas Nampalli](https://www.linkedin.com/in/srinivas-nampalli/).
