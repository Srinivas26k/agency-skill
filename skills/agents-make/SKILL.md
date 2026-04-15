---
name: agents-make
description: Design production-ready agent systems with Anthropic-style definitions, tool contracts, and orchestration rules.
---

# AGENTS-MAKE — Agent System Design Skill

> Build agents as reusable systems, not vague prompts.

This skill governs the design and execution of AI agent systems: single agents, pipelines, and director trees. It is intentionally aligned with the Anthropic Managed Agents model so a user can define a serious agent system, not just describe one loosely.

---

## PRINCIPLES

1. **Every agent has one job.** A focused agent outperforms a general one.
2. **Define the agent, then the session.** Separate reusable agent configuration from one-off execution.
3. **Agents communicate through contracts.** Define input, output, tools, and failure behavior before building.
4. **Director agents plan and delegate.** Sub-agents execute. Do not collapse the two unless the task is truly small.
5. **Quality gates are non-negotiable.** Every multi-agent flow ends with an audit pass.
6. **Fail loudly.** Agents should surface missing tools, missing context, and blocked dependencies explicitly.

---

## ANTHROPIC-STYLE AGENT DEFINITION

When this skill creates or specifies an agent, it should use this shape as the baseline:

```json
{
	"name": "Research Director",
	"model": "claude-sonnet-4-6",
	"description": "Coordinates research and synthesis for a specific domain.",
	"system": "You are a focused research director. Plan, delegate, verify, and summarize.",
	"tools": [
		{ "type": "agent_toolset_20260401" }
	],
	"mcp_servers": [],
	"skills": [],
	"callable_agents": [],
	"metadata": {
		"owner": "team-name",
		"domain": "research"
	}
}
```

Treat this as the contract to fill in. If the target platform is not Anthropic Managed Agents, still preserve the same structure conceptually and adapt the syntax to that runtime.

---

## AGENT DESIGN CHECKLIST

Before building any agent, answer:
- [ ] What is the agent's single responsibility?
- [ ] What user or system event starts the work?
- [ ] What does it receive as input?
- [ ] What does it produce as output?
- [ ] Which model should own this responsibility?
- [ ] What tools does it need?
- [ ] Does it need MCP servers?
- [ ] Does it need attached skills?
- [ ] Does it need callable sub-agents?
- [ ] What are its failure modes?
- [ ] Which environment constraints matter?
- [ ] Who calls it and who does it call?

If any of these are undefined, the agent design is incomplete.

---

## BUILD ORDER

Always work in this order:

1. **Task definition**: what business or product job the system must do.
2. **Agent definition**: reusable agent config with model, system, tools, MCP, skills, and callable agents.
3. **Environment definition**: network access, container needs, secrets, filesystem assumptions.
4. **Session contract**: what a live run receives, streams, produces, and persists.
5. **Evaluation plan**: how success, failure, and handoff quality are verified.

---

## ORCHESTRATION PATTERNS

### Pattern 1: Single Agent
```
User → @agent → Output
```
Use when: one focused task, stable toolset, no delegated specialists needed.

### Pattern 2: Pipeline
```
User → @agent-a → @agent-b → @agent-c → Output
```
Use when: task has sequential stages with explicit handoffs and each stage can validate the previous output.

### Pattern 3: Director Tree
```
User → @director → spawns → [@sub-a, @sub-b, @sub-c] → merges → Output
```
Use when: task requires parallel specialization, centralized planning, and an integration step.

---

## AGENT CONTRACT TEMPLATE

Every agent must have a defined contract:

```markdown
## Agent: [name]
**Responsibility:** [one sentence]
**Model:** [model id and why it fits]
**Description:** [human-readable summary]
**System:** [behavioral rules and constraints]
**Input:** [what it receives]
**Output:** [what it produces]
**Tools:** [built-in tools or custom tools]
**MCP Servers:** [remote tool systems, if any]
**Skills:** [reusable knowledge packs, if any]
**Callable Agents:** [agents it can delegate to]
**Failure modes:** [what can go wrong]
**Escalation rule:** [when it should stop and ask for help]
```

---

## SESSION CONTRACT TEMPLATE

For Anthropic-style runtimes, define the live execution contract separately:

```markdown
## Session
**Agent:** [agent id or local equivalent]
**Environment:** [container/network assumptions]
**Initial user message:** [first task payload]
**Expected events:** [status, tool activity, output, errors]
**Artifacts:** [files, reports, patches, API calls]
**Stop conditions:** [done, blocked, waiting on approval]
```

---

## TOOLING RULES

1. Default to the built-in agent toolset when the task needs shell, files, search, or web access.
2. Add MCP servers only when the tool capability is external and stable enough to justify maintenance.
3. Attach skills for durable domain knowledge, not transient task instructions.
4. Add callable agents only when delegation boundaries are explicit.
5. Do not give every agent every tool. Tool access must match responsibility.

---

## ENVIRONMENT RULES

When the user is targeting Anthropic Managed Agents, also specify:

- Network access requirements
- Filesystem requirements
- Secrets or credentials required
- External service dependencies
- Time sensitivity or long-running session expectations

If the environment is underspecified, the design is incomplete even if the system prompt looks good.

---

## PLATFORM ADAPTERS

| Platform | How to deploy agents |
|---|---|
| Claude Managed Agents | Define agent config, environment, session flow, and optional MCP/skills |
| Claude Code | Use `agents/` docs as role definitions and adapt the same contract locally |
| Cursor | Adapt the contract into project rules and role-specific prompt files |
| GitHub Copilot | Use repo instructions plus slash-command workflow docs |
| Custom API | Use the same schema and map it into your own agent registry/runtime |

See `skills/agents-make/resources/AGENT_TREE.md` for the full agent role library.
See `docs/integrations/anthropic/define_your_agent.md` for the canonical Anthropic agent shape.
See `docs/integrations/anthropic/managed_agents_overview.md` for the runtime model.
See `docs/integrations/anthropic/skills.md` for skill attachment patterns.

---

## QUALITY GATES

Every agent system must pass before delivery:
- [ ] Each agent has exactly one responsibility (no multi-purpose agents)
- [ ] Every agent has a defined model, system, tools, and I/O contract
- [ ] Director agents only plan, route, and verify unless the user explicitly wants a single-agent design
- [ ] Tool access is minimal and justified
- [ ] Environment assumptions are documented
- [ ] Error propagation is explicit (no silent failures)
- [ ] Session behavior is defined for start, progress, blocked, and done states
- [ ] System has been tested with a realistic task end-to-end
