# Agency Skill v2 — Full Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure agency-skill from a messy mono-directory into a clean obra-superpowers-patterned skill with three top-level slash commands (/web-design, /agents-make, /marketing-pro), unified naming, zero duplication, and first-principles workflow baked into every command.

**Architecture:** Three skill namespaces (web-design, agents-make, marketing-pro), each with a commands/*.md entry point and a skills/*/SKILL.md deep protocol. Platform adapters (CLAUDE.md, .cursorrules, copilot-instructions.md, plugin configs) all load from the same source of truth. CLI init copies the right files into user projects.

**Tech Stack:** Node.js 18+, commander, fs-extra, Markdown skill files, JSON plugin manifests

---

## File Map

### Created
- `commands/web-design.md` — /web-design slash command (brief → agents → plan → execute → design.md)
- `commands/agents-make.md` — /agents-make slash command
- `commands/marketing-pro.md` — /marketing-pro slash command
- `skills/web-design/SKILL.md` — full design protocol (from current SKILL.md root)
- `skills/web-design/resources/` — all design reference files (moved from skills/agency-designer/resources/)
- `skills/agents-make/SKILL.md` — agent orchestration protocol
- `skills/agents-make/resources/AGENT_TREE.md` — agent definitions (from agents/AGENT.md)
- `skills/marketing-pro/SKILL.md` — marketing/conversion protocol
- `skills/marketing-pro/resources/MARKETING_COPY.md` — copy reference
- `agents/visual-director.md`, `agents/motion-engineer.md`, `agents/copy-strategist.md`, `agents/quality-auditor.md`, `agents/brief-analyst.md` — individual agent role files
- `GEMINI.md` — Gemini adapter (new, clean)
- `.opencode/plugins/agency-skill.js` — OpenCode plugin

### Modified
- `CLAUDE.md` — points to commands/ and new skill paths
- `package.json` — remove agency-designer bin alias
- `skill.json` — fix main_instruction path, single file at root only
- `bin/cli.js` — fix filesToCopy paths to new structure
- `.cursorrules` — update slash command references and skill paths
- `.github/copilot-instructions.md` — update skill folder references
- `.claude-plugin/instructions.md` — update references
- `.claude-plugin/plugin.json` (new proper format) — register commands

### Deleted
- `core/` (root) — duplicate of skills/web-design/resources/core/
- `animations/` (root) — duplicate
- `psychology/` (root) — duplicate
- `styles/` (root) — duplicate
- `commands/SLASH_COMMANDS.md` (root) — replaced by commands/*.md
- `AGENCY_DESIGNER.md` (root) — content merged into CLAUDE.md
- `SKILL.md` (root) — moved to skills/web-design/SKILL.md
- `skills/agency-designer/` (entire folder) — replaced by three skill folders

---

## Task 1: Fix package.json and skill.json naming

**Files:**
- Modify: `package.json`
- Modify: `skill.json`

- [ ] **Step 1: Update package.json** — remove the `agency-designer` bin alias, it should only have `agency-skill`

```json
{
  "name": "agency-skill",
  "version": "2.0.2",
  "description": "A cross-platform agency framework and skill toolkit for premium frontend execution, managed agents, and multi-model AI IDE workflows.",
  "main": "index.js",
  "bin": {
    "agency-skill": "bin/cli.js"
  },
  "scripts": {
    "test": "node tests/basic-rubric.test.js",
    "build:graph": "node scripts/build-knowledge-graph.js",
    "validate:docs": "node scripts/validate-docs.js",
    "install:hooks": "bash scripts/install-hooks.sh"
  },
  "keywords": [
    "ai", "agency-framework", "frontend-agency", "agent-orchestration",
    "design-system", "premium-ui", "managed-agents", "multi-model", "mcp",
    "cursor", "claude-code", "github-copilot", "gemini", "goose", "kiro",
    "web-design", "marketing", "ux", "srinivas-nampalli", "agency-skill"
  ],
  "author": {
    "name": "Srinivas Nampalli",
    "url": "https://www.linkedin.com/in/srinivas-nampalli/"
  },
  "license": "MIT",
  "dependencies": {
    "commander": "^11.1.0",
    "fs-extra": "^11.2.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

- [ ] **Step 2: Update skill.json** — single file at root, fix main_instruction to new path

```json
{
  "name": "agency-skill",
  "brand": "Agency Designer",
  "version": "2.0.2",
  "author": "Srinivas Nampalli",
  "description": "Cross-platform agency framework for premium frontend execution, managed agents, and multi-model AI IDE workflows.",
  "platforms": [
    "cursor", "windsurf", "claude-code", "managed-agents",
    "github-copilot", "gemini", "goose", "kiro", "qwen", "vscode", "opencode"
  ],
  "main_instruction": "skills/web-design/SKILL.md",
  "commands": [
    { "name": "web-design", "file": "commands/web-design.md" },
    { "name": "agents-make", "file": "commands/agents-make.md" },
    { "name": "marketing-pro", "file": "commands/marketing-pro.md" }
  ],
  "skills": [
    { "name": "web-design", "file": "skills/web-design/SKILL.md" },
    { "name": "agents-make", "file": "skills/agents-make/SKILL.md" },
    { "name": "marketing-pro", "file": "skills/marketing-pro/SKILL.md" }
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add package.json skill.json
git commit -m "fix: unify naming — single agency-skill identity, remove agency-designer alias"
```

---

## Task 2: Create commands/web-design.md

**Files:**
- Create: `commands/web-design.md`

- [ ] **Step 1: Write the command file**

```markdown
---
description: Premium UI/UX design — brief interrogation, agent selection, implementation plan, execute, generate design.md
---

# /web-design — Agency Designer

You are activating the **Agency Designer /web-design** skill. This is a structured workflow. Follow every phase in order. No shortcuts.

Read `skills/web-design/SKILL.md` before executing. All deep reference material is in `skills/web-design/resources/`.

---

## Phase 1 — Brief Interrogation (one question at a time)

Ask these questions ONE AT A TIME. Wait for each answer before asking the next.

1. **WHO** is the target user? (age, profession, primary device, emotional state when they land)
2. **WHAT** is the single conversion goal? (sign up / buy / trust / contact / download)
3. **FEEL** — give me 3 emotional adjectives the design must produce (e.g. "powerful, clean, trustworthy")
4. **STYLE** — pick a number 1–100 or describe the aesthetic (dark/light, modern/editorial, minimal/expressive)
5. **FRAMEWORK** — React/JSX or vanilla HTML/CSS/JS?

---

## Phase 2 — Agent Selection

After the brief, announce which agents you will activate based on the answers:

- **@visual-director** — always active (palette + typography + style spec)
- **@motion-engineer** — activate if style is expressive, dark-premium, or user asked for animation
- **@copy-strategist** — activate if user needs headlines/CTAs written
- **@quality-auditor** — always runs last (Premium Quality Rubric check)

State: "I will activate: [list agents]. Here's the plan:"

---

## Phase 3 — Implementation Plan

Present a numbered step-by-step plan for the specific project. **WAIT for user approval before doing anything.**

Example plan structure:
1. Style + palette decision (Visual Director)
2. Typography system (Visual Director)
3. Page structure / sitemap
4. Component build order
5. Motion layer (Motion Engineer, if active)
6. Copy layer (Copy Strategist, if active)
7. Quality audit (Quality Auditor)
8. Generate design.md

---

## Phase 4 — Execute

Execute each step. For each agent phase:
- State which agent is active: "@visual-director is running"
- Complete the work
- State when the agent hands off

---

## Phase 5 — Generate design.md (MANDATORY)

After completing all steps, write `design.md` into the user's project root. Use this exact structure:

```markdown
# Design System — [Project Name]
Generated by Agency Designer | [date]

## Palette
\`\`\`css
:root {
  --color-primary: hsl(...);
  --color-primary-light: hsl(...);
  --color-primary-dark: hsl(...);
  --color-accent: hsl(...);
  --color-surface: hsl(...);
  --color-surface-raised: hsl(...);
  --color-text: hsl(...);
  --color-text-muted: hsl(...);
  --color-border: hsl(...);
}
\`\`\`

## Typography
- Heading font: [name] — [Google Fonts import URL]
- Body font: [name] — [Google Fonts import URL]
\`\`\`css
:root {
  --font-heading: '[font]', serif;
  --font-body: '[font]', sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
}
\`\`\`

## Spacing
\`\`\`css
:root {
  --space-1: 0.25rem; --space-2: 0.5rem; --space-3: 0.75rem;
  --space-4: 1rem; --space-6: 1.5rem; --space-8: 2rem;
  --space-12: 3rem; --space-16: 4rem; --space-20: 5rem;
  --space-24: 6rem; --space-32: 8rem;
}
\`\`\`

## Component Language
\`\`\`css
:root {
  --radius-sm: [value];
  --radius-md: [value];
  --radius-lg: [value];
  --radius-full: 9999px;
  --shadow-sm: [value];
  --shadow-md: [value];
  --shadow-lg: [value];
  --border-width: [value];
}
\`\`\`

## Motion Rules
- Primary library: [GSAP / Framer Motion / Anime.js]
- Default ease: [value]
- Duration tokens: fast 200ms, base 400ms, slow 700ms, dramatic 1200ms
- Stagger: 80ms between items
- Scroll trigger: start="top 85%" — standard reveal threshold

## Imagery Rules
- Style: [description]
- Always apply CSS overlay (Veneer) — never raw stock
- Recommended Unsplash collections: [keywords]

## Icon System
- Primary: [Phosphor / Heroicons / Tabler / Custom SVG]
- Import: [CDN or package]
```
```

- [ ] **Step 2: Commit**

```bash
git add commands/web-design.md
git commit -m "feat: add /web-design slash command with first-principles protocol and design.md generation"
```

---

## Task 3: Create commands/agents-make.md

**Files:**
- Create: `commands/agents-make.md`

- [ ] **Step 1: Write the command file**

```markdown
---
description: Build and orchestrate AI agent systems — brief interrogation, agent tree design, implementation plan, execute
---

# /agents-make — Agency Designer Agent Builder

You are activating the **Agency Designer /agents-make** skill. Follow every phase in order.

Read `skills/agents-make/SKILL.md` before executing. Agent tree definitions are in `skills/agents-make/resources/AGENT_TREE.md`.

---

## Phase 1 — Brief Interrogation (one question at a time)

1. **TASK** — what is the agent system meant to accomplish? (one sentence)
2. **SCOPE** — is this a single agent, a pipeline (A → B → C), or a tree (director + sub-agents)?
3. **PLATFORM** — Claude Managed Agents / Claude Code / Cursor / Gemini / custom API?
4. **TOOLS** — what tools does the agent need? (web search, code execution, file access, MCP, custom APIs)
5. **OUTPUT** — what does a successful run produce? (file, message, action, API call)

---

## Phase 2 — Agent Tree Design

Based on the brief, design the agent structure:
- If single agent: define role, tools, and output contract
- If pipeline: define each stage, what it receives, what it emits
- If tree: define director agent + sub-agents with delegation rules

State the design clearly before the plan.

---

## Phase 3 — Implementation Plan

Present numbered steps. **WAIT for user approval.**

1. Agent role definitions (markdown or code)
2. Tool definitions / MCP connections
3. Orchestration logic
4. Quality gates / error handling
5. Test run

---

## Phase 4 — Execute

Execute each step. Reference:
- `skills/agents-make/SKILL.md` — orchestration protocol
- `skills/agents-make/resources/AGENT_TREE.md` — agent role library
- `agents/` — reusable agent definitions from this package

---

## Sub-commands available under /agents-make

- `/agents-make director` — build a director + sub-agent tree
- `/agents-make pipeline` — build a sequential agent pipeline
- `/agents-make single` — define a single focused agent
- `/agents-make audit` — review an existing agent system for quality and gaps
```

- [ ] **Step 2: Commit**

```bash
git add commands/agents-make.md
git commit -m "feat: add /agents-make slash command with orchestration protocol"
```

---

## Task 4: Create commands/marketing-pro.md

**Files:**
- Create: `commands/marketing-pro.md`

- [ ] **Step 1: Write the command file**

```markdown
---
description: Conversion-focused marketing layer — headlines, CTAs, copy strategy, A/B variants, full audit
---

# /marketing-pro — Agency Designer Marketing Layer

You are activating the **Agency Designer /marketing-pro** skill. Follow every phase in order.

Read `skills/marketing-pro/SKILL.md` before executing. Copy frameworks are in `skills/marketing-pro/resources/MARKETING_COPY.md`.

---

## Phase 1 — Brief Interrogation (one question at a time)

1. **PRODUCT** — what is being sold/offered in one sentence?
2. **PERSONA** — who is the buyer? (role, pain point, awareness level)
3. **GOAL** — what is the single conversion action? (signup / purchase / demo / download)
4. **TONE** — choose: authoritative / empathetic / urgent / inspirational / playful
5. **EXISTING COPY** — paste your current headline or leave blank for a full rewrite

---

## Phase 2 — Framework Selection

Based on the brief, select the conversion framework:
- **PAS** (Problem → Agitation → Solution) — best for pain-aware audiences
- **AIDA** (Attention → Interest → Desire → Action) — best for cold traffic
- **FAB** (Feature → Advantage → Benefit) — best for product pages
- **BAB** (Before → After → Bridge) — best for transformation stories

State which framework and why before proceeding.

---

## Phase 3 — Implementation Plan

Present numbered steps. **WAIT for user approval.**

1. Hero headline (3 variants)
2. Sub-headline / value proposition
3. CTA copy (primary + secondary)
4. Social proof copy
5. Section headlines throughout the page
6. FAQ objection handling
7. Conversion audit score

---

## Phase 4 — Execute

Execute each step. Never use:
- "Learn More" (replace with benefit-forward CTAs)
- Generic "Welcome to [Product]" headlines
- Passive voice in hero copy

Always follow: **[RESULT] without [PAIN]** headline formula.

Reference: `skills/marketing-pro/resources/MARKETING_COPY.md`

---

## Sub-commands available under /marketing-pro

- `/marketing-pro headline [context]` — generate 5 headline variants
- `/marketing-pro cta [action]` — generate CTA copy variants
- `/marketing-pro audit` — score existing copy against conversion rubric
- `/marketing-pro rewrite` — full page copy rewrite
- `/marketing-pro email [type]` — email sequence copy
```

- [ ] **Step 2: Commit**

```bash
git add commands/marketing-pro.md
git commit -m "feat: add /marketing-pro slash command with conversion protocol"
```

---

## Task 5: Create skills/web-design/

**Files:**
- Create: `skills/web-design/SKILL.md` (move content from root SKILL.md)
- Move: `skills/agency-designer/resources/` → `skills/web-design/resources/`
- Move: `skills/agency-designer/resources/SLASH_COMMANDS.md` → `skills/web-design/resources/SLASH_COMMANDS.md`

- [ ] **Step 1: Create skills/web-design/ and move resources**

```bash
mkdir -p skills/web-design/resources
cp skills/agency-designer/resources/animations/* skills/web-design/resources/ 2>/dev/null || true
cp skills/agency-designer/resources/core/* skills/web-design/resources/ 2>/dev/null || true
cp skills/agency-designer/resources/psychology/* skills/web-design/resources/ 2>/dev/null || true
cp skills/agency-designer/resources/styles/* skills/web-design/resources/ 2>/dev/null || true
cp skills/agency-designer/resources/commands/SLASH_COMMANDS.md skills/web-design/resources/
```

Run from: `agency-skill/` root

- [ ] **Step 2: Create skills/web-design/SKILL.md**

Copy the content from root `SKILL.md` (the file starting with `---\nname: agency-skill\n...`) and write it to `skills/web-design/SKILL.md`. Update the frontmatter:

```markdown
---
name: web-design
description: Premium UI/UX design system — color psychology, typography, GSAP motion, conversion-first layouts. Produces S-Tier agency output.
---
```

Keep all existing content below the frontmatter unchanged.

- [ ] **Step 3: Commit**

```bash
git add skills/web-design/
git commit -m "feat: create skills/web-design/ with SKILL.md and all design resources"
```

---

## Task 6: Create skills/agents-make/

**Files:**
- Create: `skills/agents-make/SKILL.md`
- Create: `skills/agents-make/resources/AGENT_TREE.md` (from agents/AGENT.md)

- [ ] **Step 1: Create skills/agents-make/SKILL.md**

Create this file:

```markdown
---
name: agents-make
description: Agent orchestration protocol — design, build, and coordinate AI agent systems across any platform.
---

# AGENTS-MAKE — Agent Orchestration Skill

> "An agent that can't delegate is just a loop."

This skill governs the design and execution of AI agent systems: single agents, pipelines, and full director-tree architectures.

---

## PRINCIPLES

1. **Every agent has one job.** A focused agent outperforms a general one.
2. **Agents communicate through contracts.** Define input and output for each agent before building.
3. **Director agents plan, sub-agents execute.** Never let a director write code.
4. **Quality gates are non-negotiable.** Every agent tree ends with a @quality-auditor pass.
5. **Fail loudly.** Agents should surface errors immediately, not silently skip steps.

---

## AGENT DESIGN CHECKLIST

Before building any agent, answer:
- [ ] What is the agent's single responsibility?
- [ ] What does it receive as input?
- [ ] What does it produce as output?
- [ ] What tools does it need?
- [ ] What are its failure modes?
- [ ] Who calls it and who does it call?

---

## ORCHESTRATION PATTERNS

### Pattern 1: Single Agent
```
User → @agent → Output
```
Use when: one focused task, no delegation needed.

### Pattern 2: Pipeline
```
User → @agent-a → @agent-b → @agent-c → Output
```
Use when: task has sequential stages with clear handoffs.

### Pattern 3: Director Tree
```
User → @director → spawns → [@sub-a, @sub-b, @sub-c] → merges → Output
```
Use when: complex task requiring parallel specialization.

---

## PLATFORM ADAPTERS

| Platform | How to deploy agents |
|---|---|
| Claude Managed Agents | Use `define_your_agent.md` + MCP tools |
| Claude Code | Use `agents/` directory + Skill tool |
| Cursor | Use `.cursorrules` agent definitions |
| GitHub Copilot | Use `.github/copilot-instructions.md` |
| Custom API | Use `docs/integrations/MANAGED_AGENTS_AND_MODEL_ROUTING.md` |

See `skills/agents-make/resources/AGENT_TREE.md` for the full agent role library.
See `docs/integrations/` for platform-specific deployment guides.
```

- [ ] **Step 2: Create skills/agents-make/resources/AGENT_TREE.md**

Copy the content from `agents/AGENT.md` into `skills/agents-make/resources/AGENT_TREE.md`. This centralizes the agent definitions inside the skill.

```bash
mkdir -p skills/agents-make/resources
cp agents/AGENT.md skills/agents-make/resources/AGENT_TREE.md
```

- [ ] **Step 3: Commit**

```bash
git add skills/agents-make/
git commit -m "feat: create skills/agents-make/ with orchestration protocol and agent tree"
```

---

## Task 7: Create skills/marketing-pro/

**Files:**
- Create: `skills/marketing-pro/SKILL.md`
- Create: `skills/marketing-pro/resources/MARKETING_COPY.md` (from skills/web-design/resources/MARKETING_AND_LAYOUTS.md)

- [ ] **Step 1: Create skills/marketing-pro/SKILL.md**

```markdown
---
name: marketing-pro
description: Conversion-focused marketing and copy system — headlines, CTAs, PAS/AIDA frameworks, full audit rubric.
---

# MARKETING-PRO — Conversion Copy Skill

> "A beautiful design that doesn't convert is just decoration."

This skill governs all marketing copy, conversion strategy, and persuasion architecture across every surface.

---

## CORE RULES

1. **Every headline follows [RESULT] without [PAIN].** No exceptions.
2. **CTAs are never generic.** "Get Started" → "Start Building Free". "Learn More" → "See How It Works".
3. **Social proof is always specific.** "Loved by thousands" → "Used by 4,200 marketing teams".
4. **Structure for scanners.** 80% of readers scan. Every section must communicate value in < 5 seconds.
5. **One CTA per section.** Never compete with yourself.

---

## HEADLINE FORMULAS

| Formula | Template | Example |
|---|---|---|
| Result Without Pain | [Get X] without [Y] | "Ship faster without breaking things" |
| Specific Outcome | [Number/Timeframe] to [Result] | "30 minutes to a production-ready API" |
| Negation | Stop [Pain]. Start [Result] | "Stop guessing. Start converting." |
| Social Proof | [Audience] uses [Product] to [Outcome] | "10,000 designers use Agency to ship in half the time" |
| Question | Are you still [Pain]? | "Are you still writing CSS from scratch?" |

---

## CONVERSION FRAMEWORKS

### PAS — Problem, Agitation, Solution
Best for: Pain-aware audiences who know they have a problem.
```
Problem:   State the pain clearly
Agitation: Make it worse — what happens if unsolved?
Solution:  Your product as the relief
```

### AIDA — Attention, Interest, Desire, Action
Best for: Cold traffic, awareness-stage campaigns.
```
Attention: Hook (stat, bold claim, question)
Interest:  Why this matters to them
Desire:    Social proof + benefits
Action:    Specific CTA
```

### FAB — Feature, Advantage, Benefit
Best for: Product pages, comparison pages.
```
Feature:   What it does
Advantage: Why that matters
Benefit:   What the user feels/gains
```

---

## QUALITY RUBRIC

Score each copy block 1–10:
- [ ] Headline clarity: reader knows the offer in < 3 seconds
- [ ] Benefit specificity: no vague claims ("powerful", "easy", "best")
- [ ] CTA specificity: action verb + outcome, not generic label
- [ ] Social proof: specific numbers, names, or logos
- [ ] Objection handling: FAQ addresses top 3 reasons not to buy
- [ ] Readability: Flesch score > 60, sentences < 20 words average

See `skills/marketing-pro/resources/MARKETING_COPY.md` for full copy framework library.
```

- [ ] **Step 2: Create skills/marketing-pro/resources/MARKETING_COPY.md**

```bash
mkdir -p skills/marketing-pro/resources
cp skills/web-design/resources/MARKETING_AND_LAYOUTS.md skills/marketing-pro/resources/MARKETING_COPY.md
```

- [ ] **Step 3: Commit**

```bash
git add skills/marketing-pro/
git commit -m "feat: create skills/marketing-pro/ with conversion protocol and copy framework"
```

---

## Task 8: Create individual agent files

**Files:**
- Create: `agents/visual-director.md`
- Create: `agents/motion-engineer.md`
- Create: `agents/copy-strategist.md`
- Create: `agents/quality-auditor.md`
- Create: `agents/brief-analyst.md`

- [ ] **Step 1: Write agents/visual-director.md**

```markdown
---
name: visual-director
description: Makes all visual decisions — palette, typography, style selection, imagery direction
---

# @visual-director

**Single responsibility:** Translate the brief into a complete visual identity.

**Inputs:** WHO, FEEL, STYLE number, FRAMEWORK from brief interrogation

**Outputs:** 
- CSS :root palette (HSL tokens)
- Font pair + Google Fonts imports
- Component language (radius, shadow, border)
- Style declaration ("This design is Style #28 — Glassmorphism")

**Process:**
1. Select style from `skills/web-design/resources/100_GRAPHIC_STYLES.md`
2. Map FEEL adjectives to palette via `skills/web-design/resources/COLOR_PSYCHOLOGY.md`
3. Select font pair from `skills/web-design/resources/TYPOGRAPHY_AND_ICONS.md`
4. Output complete CSS :root block

**Does NOT:** write HTML, implement animations, write copy
```

- [ ] **Step 2: Write agents/motion-engineer.md**

```markdown
---
name: motion-engineer
description: Implements all animation and scroll behavior — GSAP, Framer Motion, Anime.js
---

# @motion-engineer

**Single responsibility:** Add motion that serves the design, never distracts from it.

**Inputs:** Style declaration from @visual-director, component structure, user's motion preferences

**Outputs:**
- GSAP timeline code or Framer Motion variants
- ScrollTrigger configuration
- Hover/interaction micro-animations
- Page transition setup

**Process:**
1. Select animation pattern from `skills/web-design/resources/GSAP_ANIMATIONS.md`
2. Select scroll behavior from `skills/web-design/resources/SCROLL_AND_FRAMER.md`
3. Implement stagger entrances for all above-fold content
4. Add scroll-triggered reveals for body content

**Rules:**
- Default ease: `power2.out`
- Entrance stagger: 80ms
- Never animate more than 3 properties simultaneously
- All motion must be reducible via `prefers-reduced-motion`
```

- [ ] **Step 3: Write agents/copy-strategist.md**

```markdown
---
name: copy-strategist
description: Writes all conversion copy — headlines, CTAs, microcopy, social proof
---

# @copy-strategist

**Single responsibility:** Every word must earn its place by moving the user toward the conversion goal.

**Inputs:** WHO, WHAT, TONE, conversion framework selection from /marketing-pro brief

**Outputs:**
- Hero headline (3 variants)
- Sub-headline
- Primary + secondary CTA copy
- Section headlines
- Social proof copy
- FAQ entries (3–5 objection handlers)

**Rules (enforced, no exceptions):**
- Headlines: [RESULT] without [PAIN] formula first
- CTAs: action verb + specific outcome (never "Learn More" / "Get Started")
- Social proof: specific numbers or named companies
- No passive voice in hero copy
- No adjectives without proof ("world-class" = banned, "used by 4,200 teams" = allowed)
```

- [ ] **Step 4: Write agents/quality-auditor.md**

```markdown
---
name: quality-auditor
description: Final rubric check — scores output against Agency Designer Premium Standards
---

# @quality-auditor

**Single responsibility:** Catch anything below S-Tier standards before delivery.

**Inputs:** Complete output from all previous agents

**Outputs:** Score (0–50) + action list for any item below threshold

**Rubric (10 points each):**

1. **Typography** (0–10)
   - [ ] No system fonts (no Arial, Helvetica, sans-serif generics)
   - [ ] Character-rich heading font (not Inter/Roboto for headings)
   - [ ] Fluid type scale with CSS tokens
   - [ ] Correct hierarchy (3+ clear weight/size jumps)
   - [ ] Line height ≥ 1.5 for body, ≤ 1.2 for display headings

2. **Color** (0–10)
   - [ ] All colors as HSL CSS variables
   - [ ] No flat solid backgrounds
   - [ ] Contrast ratio ≥ 4.5:1 for all text
   - [ ] Atmospheric depth (gradients, overlays, or textures used)
   - [ ] Consistent token usage (no raw hex values in component code)

3. **Motion** (0–10)
   - [ ] Stagger on all entrance animations
   - [ ] GSAP or Framer present (no plain CSS transitions for major animations)
   - [ ] Scroll-triggered reveals implemented
   - [ ] prefers-reduced-motion respected
   - [ ] No jarring or instant state changes

4. **Imagery** (0–10)
   - [ ] No raw stock photos
   - [ ] CSS overlay (Veneer) applied to all images
   - [ ] object-fit: cover on all image containers
   - [ ] Grain/texture overlay present on hero
   - [ ] Images optimized (lazy loading, width/height set)

5. **Copy** (0–10)
   - [ ] Hero headline follows [RESULT] without [PAIN]
   - [ ] No generic CTAs
   - [ ] Social proof is specific
   - [ ] FAQ section present
   - [ ] No "powerful", "easy", "best" without proof

**Threshold:** Score ≥ 40 = S-Tier. Score < 40 = return to relevant agent with specific fixes.
```

- [ ] **Step 5: Write agents/brief-analyst.md**

```markdown
---
name: brief-analyst
description: Parses vague or complex briefs into structured WHO/WHAT/WHY/FEEL/STYLE answers
---

# @brief-analyst

**Single responsibility:** Turn ambiguous input into a crisp, structured brief that all other agents can execute against.

**Inputs:** Any vague user request (e.g. "build me a cool dark website for my startup")

**Outputs:**
- WHO: [specific persona]
- WHAT: [single conversion goal]
- WHY: [USP / differentiator]
- FEEL: [3 emotional adjectives]
- STYLE: [number 1–100 or description]
- FRAMEWORK: [React or HTML]

**Process:**
1. Extract any explicit signals from the brief
2. Infer what's missing from context
3. Ask ONE clarifying question for the most critical unknown
4. Never ask more than 2 questions total — infer the rest
5. Output the structured brief
```

- [ ] **Step 6: Commit**

```bash
git add agents/
git commit -m "feat: add individual agent role files (visual-director, motion-engineer, copy-strategist, quality-auditor, brief-analyst)"
```

---

## Task 9: Update CLAUDE.md and platform adapters

**Files:**
- Modify: `CLAUDE.md`
- Modify: `.claude-plugin/instructions.md`
- Modify: `.cursorrules`
- Modify: `.github/copilot-instructions.md`
- Create: `GEMINI.md`

- [ ] **Step 1: Rewrite CLAUDE.md**

```markdown
# Agency Designer — Claude Code

You are operating as the **Agency Designer** skill.

## Available Commands
- `/web-design` — premium UI/UX design workflow (brief → agents → plan → design.md)
- `/agents-make` — design and build AI agent systems
- `/marketing-pro` — conversion copy and marketing strategy

Type any command to activate its workflow. The skill will interrogate your brief one question at a time, select the right agents, present a plan, and wait for your approval before executing.

## Skill Files
- Entry: `skills/web-design/SKILL.md` (design system protocol)
- Commands: `commands/` (one file per slash command)
- Agents: `agents/` (individual role definitions)
- Resources: `skills/*/resources/` (deep reference material — load on demand)

## Standards
- HSL CSS variables only. No raw hex in component code.
- Contrast ratio ≥ 4.5:1 minimum.
- GSAP for all complex animations.
- No stock photos without CSS Veneer overlay.
- No generic CTAs ("Learn More", "Get Started").
- Every /web-design session generates or updates `design.md`.
```

- [ ] **Step 2: Rewrite .claude-plugin/instructions.md** (same as CLAUDE.md above — they're the same file content)

Replace the content of `.claude-plugin/instructions.md` with the same content as CLAUDE.md above.

- [ ] **Step 3: Update .cursorrules**

Replace the `### Slash Commands` section and the `### Reference` section at the bottom with:

```
### Commands
- `/web-design`    → Full design workflow: brief → agents → plan → design.md
- `/agents-make`   → Build AI agent systems
- `/marketing-pro` → Conversion copy and marketing strategy

### Reference
- Commands: `commands/` (one .md per slash command)
- Design skill: `skills/web-design/SKILL.md`
- Agent skill: `skills/agents-make/SKILL.md`
- Marketing skill: `skills/marketing-pro/SKILL.md`
- Agents: `agents/` (individual role files)
- Resources: `skills/*/resources/`
```

- [ ] **Step 4: Update .github/copilot-instructions.md**

Replace the "Repository intent" bullet list with:

```markdown
## Repository intent

- `commands/` — slash command entry points (/web-design, /agents-make, /marketing-pro)
- `skills/web-design/` — design system protocol and resources
- `skills/agents-make/` — agent orchestration protocol
- `skills/marketing-pro/` — conversion copy protocol
- `agents/` — reusable agent role definitions
- `docs/integrations/` — runtime and platform adapter docs
```

- [ ] **Step 5: Create GEMINI.md**

```markdown
# Agency Designer — Gemini Configuration

You are operating as the **Agency Designer** skill.

## Available Commands
- `/web-design` — premium UI/UX design (brief → agents → plan → design.md)
- `/agents-make` — build and orchestrate AI agent systems
- `/marketing-pro` — conversion copy and marketing strategy

## How commands work
Each command activates a structured workflow:
1. Brief interrogation (one question at a time)
2. Agent selection announcement
3. Implementation plan (wait for approval)
4. Execute with selected agents
5. /web-design always generates design.md

## Skill entry points
- `skills/web-design/SKILL.md`
- `skills/agents-make/SKILL.md`
- `skills/marketing-pro/SKILL.md`

## Standards
All output meets Agency Designer S-Tier standards: HSL color tokens, premium typography, GSAP motion, conversion-first copy. Refer to `skills/web-design/resources/` for deep specifications.
```

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md GEMINI.md .claude-plugin/instructions.md .cursorrules .github/copilot-instructions.md
git commit -m "fix: update all platform adapters to point to new commands/ and skills/ structure"
```

---

## Task 10: Update .claude-plugin/plugin.json

**Files:**
- Modify: `.claude-plugin/plugin.json` (likely exists but needs updating)

- [ ] **Step 1: Write .claude-plugin/plugin.json**

```json
{
  "name": "agency-skill",
  "description": "Agency Designer — premium UI/UX, agent orchestration, and conversion marketing for any AI IDE.",
  "version": "2.0.2",
  "instructions": ".claude-plugin/instructions.md",
  "commands": [
    {
      "name": "web-design",
      "description": "Premium UI/UX design workflow — brief, agents, plan, execute, generate design.md",
      "instructionFile": "commands/web-design.md"
    },
    {
      "name": "agents-make",
      "description": "Design and build AI agent systems — single agent, pipeline, or director tree",
      "instructionFile": "commands/agents-make.md"
    },
    {
      "name": "marketing-pro",
      "description": "Conversion-focused copy — headlines, CTAs, full page rewrite, audit",
      "instructionFile": "commands/marketing-pro.md"
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add .claude-plugin/plugin.json
git commit -m "fix: update claude-plugin manifest with correct command registrations"
```

---

## Task 11: Update bin/cli.js

**Files:**
- Modify: `bin/cli.js`

- [ ] **Step 1: Rewrite bin/cli.js with corrected paths**

```javascript
#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');

const program = new Command();

const BRAND = 'Agency Designer';
const AUTHOR = 'by Srinivas Nampalli';

program
  .name('agency-skill')
  .description('Agency Designer — premium UI/UX, agent orchestration, and marketing for AI IDEs.')
  .version('2.0.2');

program
  .command('init')
  .description('Bootstrap your project with Agency Designer skill files.')
  .argument('[dir]', 'Target directory', '.')
  .action(async (dir) => {
    console.log(`\nInitializing ${BRAND} ${AUTHOR} in ${dir}...\n`);

    const targetDir = path.resolve(process.cwd(), dir);
    const sourceDir = path.resolve(__dirname, '..');

    const filesToCopy = [
      // Core skill entry points
      { src: 'skills/web-design/SKILL.md',      dest: 'SKILL.md' },
      { src: 'CLAUDE.md',                        dest: 'CLAUDE.md' },
      { src: 'GEMINI.md',                        dest: 'GEMINI.md' },
      { src: '.cursorrules',                     dest: '.cursorrules' },
      // Slash commands → .claude/commands/ for Claude Code native slash commands
      { src: 'commands/web-design.md',           dest: '.claude/commands/web-design.md' },
      { src: 'commands/agents-make.md',          dest: '.claude/commands/agents-make.md' },
      { src: 'commands/marketing-pro.md',        dest: '.claude/commands/marketing-pro.md' },
      // Agent definitions
      { src: 'agents',                           dest: 'agents' },
      // Design resource folders
      { src: 'skills/web-design/resources',      dest: 'agency-designer/resources' },
    ];

    try {
      await fs.ensureDir(targetDir);

      for (const item of filesToCopy) {
        const src = path.join(sourceDir, item.src);
        const dest = path.join(targetDir, item.dest);

        if (path.resolve(src) === path.resolve(dest)) {
          console.log(`  [skip] ${item.dest} — already in source repo`);
          continue;
        }

        if (await fs.pathExists(dest)) {
          console.log(`  [skip] ${item.dest} — already exists`);
          continue;
        }

        if (await fs.pathExists(src)) {
          await fs.ensureDir(path.dirname(dest));
          console.log(`  [ok]   ${item.dest}`);
          await fs.copy(src, dest);
        } else {
          console.log(`  [warn] ${item.src} not found — skipping`);
        }
      }

      console.log(`\n${BRAND} initialized.\n`);
      console.log(`Next steps:`);
      console.log(`  1. Open in Claude Code, Cursor, Copilot, Gemini, or any supported IDE`);
      console.log(`  2. Type /web-design, /agents-make, or /marketing-pro to activate a workflow\n`);

    } catch (err) {
      console.error('\nError during init:', err.message);
      process.exit(1);
    }
  });

program
  .command('audit')
  .description('Audit your project against Agency Designer Premium Standards.')
  .action(() => {
    console.log(`\nRunning ${BRAND} quality audit...\n`);
    console.log('  Use /web-design → @quality-auditor within your AI IDE for a full scored audit.\n');
  });

program.parse();
```

- [ ] **Step 2: Commit**

```bash
git add bin/cli.js
git commit -m "fix: update CLI paths to new skills/ structure, copy commands to .claude/commands/"
```

---

## Task 12: Delete all duplicate files and old structure

**Files to delete:**
- `core/` (root duplicate)
- `animations/` (root duplicate)
- `psychology/` (root duplicate)
- `styles/` (root duplicate)
- `commands/SLASH_COMMANDS.md` (replaced by commands/*.md)
- `AGENCY_DESIGNER.md` (root — content merged into CLAUDE.md)
- `SKILL.md` (root — moved to skills/web-design/SKILL.md)
- `skills/agency-designer/` (entire folder — replaced by three skill folders)

- [ ] **Step 1: Delete duplicate root folders and files**

```bash
rm -rf core/ animations/ psychology/ styles/
rm -f AGENCY_DESIGNER.md SKILL.md
rm -f commands/SLASH_COMMANDS.md
```

Run from: `agency-skill/` root

- [ ] **Step 2: Delete old skills/agency-designer folder**

```bash
rm -rf skills/agency-designer/
```

- [ ] **Step 3: Update scripts/validate-docs.js to use new paths**

Open `scripts/validate-docs.js` and replace the `requiredFiles` array with:

```javascript
const requiredFiles = [
  'README.md',
  'CLAUDE.md',
  'GEMINI.md',
  'skill.json',
  'commands/web-design.md',
  'commands/agents-make.md',
  'commands/marketing-pro.md',
  'skills/web-design/SKILL.md',
  'skills/agents-make/SKILL.md',
  'skills/marketing-pro/SKILL.md',
  'agents/visual-director.md',
  'agents/quality-auditor.md',
  'docs/integrations/UNIVERSAL_AGENT_PLAYBOOK.md',
  '.github/copilot-instructions.md',
];
```

- [ ] **Step 4: Update scripts/build-knowledge-graph.js to use new paths**

Open `scripts/build-knowledge-graph.js` and replace the `nodes` array with:

```javascript
const nodes = [
  { id: 'web-design-skill', type: 'skill', label: 'Web Design', path: 'skills/web-design/SKILL.md', tags: ['frontend', 'design-system', 'ux'] },
  { id: 'agents-make-skill', type: 'skill', label: 'Agents Make', path: 'skills/agents-make/SKILL.md', tags: ['agents', 'orchestration', 'delegation'] },
  { id: 'marketing-pro-skill', type: 'skill', label: 'Marketing Pro', path: 'skills/marketing-pro/SKILL.md', tags: ['marketing', 'copy', 'conversion'] },
  { id: 'cmd-web-design', type: 'command', label: '/web-design', path: 'commands/web-design.md', tags: ['slash-command'] },
  { id: 'cmd-agents-make', type: 'command', label: '/agents-make', path: 'commands/agents-make.md', tags: ['slash-command'] },
  { id: 'cmd-marketing-pro', type: 'command', label: '/marketing-pro', path: 'commands/marketing-pro.md', tags: ['slash-command'] },
  { id: 'visual-director', type: 'agent', label: 'Visual Director', path: 'agents/visual-director.md', tags: ['design', 'palette', 'typography'] },
  { id: 'motion-engineer', type: 'agent', label: 'Motion Engineer', path: 'agents/motion-engineer.md', tags: ['gsap', 'animation', 'scroll'] },
  { id: 'copy-strategist', type: 'agent', label: 'Copy Strategist', path: 'agents/copy-strategist.md', tags: ['copy', 'cta', 'headlines'] },
  { id: 'quality-auditor', type: 'agent', label: 'Quality Auditor', path: 'agents/quality-auditor.md', tags: ['rubric', 'audit', 'quality'] },
  { id: 'universal-playbook', type: 'integration', label: 'Universal Playbook', path: 'docs/integrations/UNIVERSAL_AGENT_PLAYBOOK.md', tags: ['platforms', 'adapters'] },
];

const edges = [
  ['cmd-web-design', 'web-design-skill', 'activates'],
  ['cmd-agents-make', 'agents-make-skill', 'activates'],
  ['cmd-marketing-pro', 'marketing-pro-skill', 'activates'],
  ['web-design-skill', 'visual-director', 'spawns'],
  ['web-design-skill', 'motion-engineer', 'spawns'],
  ['web-design-skill', 'copy-strategist', 'spawns'],
  ['web-design-skill', 'quality-auditor', 'spawns'],
  ['agents-make-skill', 'quality-auditor', 'spawns'],
  ['marketing-pro-skill', 'copy-strategist', 'spawns'],
  ['marketing-pro-skill', 'quality-auditor', 'spawns'],
].map(([from, to, relation]) => ({ from, to, relation }));
```

Also update the `outputPath` line:
```javascript
const outputPath = path.join(repoRoot, 'skills', 'web-design', 'knowledge-graph.json');
```

- [ ] **Step 5: Run validation**

```bash
npm run validate:docs
```

Expected output: `Documentation validation passed.`

If it fails, check the reported missing file and ensure it was created in the earlier tasks.

- [ ] **Step 6: Run tests**

```bash
npm test
```

Expected output: `✅ Audit Complete: Project reflects S-Tier standards.`

- [ ] **Step 7: Commit everything**

```bash
git add -A
git commit -m "refactor: remove all duplicate files and legacy skills/agency-designer/ folder"
```

---

## Task 13: Update index.js and README

**Files:**
- Modify: `index.js`
- Modify: `README.md` (key sections only)

- [ ] **Step 1: Update index.js**

```javascript
module.exports = {
  name: "agency-skill",
  brand: "Agency Designer",
  version: "2.0.2",
  commands: ["web-design", "agents-make", "marketing-pro"],
  skills: ["skills/web-design/SKILL.md", "skills/agents-make/SKILL.md", "skills/marketing-pro/SKILL.md"]
};
```

- [ ] **Step 2: Update README.md installation section**

Find the `## Installation` section in README.md and update it:

```markdown
## Installation

### Via NPX (bootstrap into any project)

\`\`\`bash
npx agency-skill init
\`\`\`

Copies: CLAUDE.md, GEMINI.md, .cursorrules, .claude/commands/, agents/, and design resources into your project.

### Via Skills Registry

Install once, use everywhere:

\`\`\`bash
# skills.sh
skills install agency-skill
\`\`\`

### Via NPM

\`\`\`bash
npm install agency-skill
\`\`\`

## Commands

| Command | What it does |
|---|---|
| `/web-design` | Full design workflow: brief → agents → plan → execute → generates `design.md` |
| `/agents-make` | Build AI agent systems: single agent, pipeline, or director tree |
| `/marketing-pro` | Conversion copy: headlines, CTAs, full rewrite, audit |

Each command interrogates your brief one question at a time, selects the right agents, presents a numbered implementation plan, and waits for your approval before executing.
```

- [ ] **Step 3: Final commit**

```bash
git add index.js README.md
git commit -m "docs: update README and index.js for v2 restructured architecture"
```

---

## Self-Review

**Spec coverage:**
- ✅ Unified naming (Task 1)
- ✅ /web-design command (Task 2)
- ✅ /agents-make command (Task 3)
- ✅ /marketing-pro command (Task 4)
- ✅ skills/web-design/ with resources (Task 5)
- ✅ skills/agents-make/ (Task 6)
- ✅ skills/marketing-pro/ (Task 7)
- ✅ Individual agent files (Task 8)
- ✅ Platform adapters updated (Task 9)
- ✅ Plugin manifest updated (Task 10)
- ✅ CLI paths fixed (Task 11)
- ✅ Duplicates removed (Task 12)
- ✅ design.md generation in /web-design command (Task 2, Phase 5)
- ✅ First-principles workflow in all commands (Tasks 2, 3, 4)
- ✅ Agent selection announcement in all commands (Tasks 2, 3, 4)
- ✅ Implementation plan + approval gate in all commands (Tasks 2, 3, 4)

**Placeholder scan:** No TBDs, no "implement later", no "similar to task N". All code blocks are complete.

**Type consistency:** No cross-task function/type references — this is a markdown/config refactor, no shared function signatures.
