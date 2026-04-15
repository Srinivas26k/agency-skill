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

## AGENT CONTRACT TEMPLATE

Every agent must have a defined contract:

```markdown
## Agent: [name]
**Responsibility:** [one sentence]
**Input:** [what it receives]
**Output:** [what it produces]
**Tools:** [list of tools]
**Failure modes:** [what can go wrong]
**Calls:** [agents it delegates to, if any]
```

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

---

## QUALITY GATES

Every agent system must pass before delivery:
- [ ] Each agent has exactly one responsibility (no multi-purpose agents)
- [ ] Every agent has a defined input/output contract
- [ ] Director agents only plan and delegate — no direct execution
- [ ] Error propagation is explicit (no silent failures)
- [ ] System has been tested with a real task end-to-end
