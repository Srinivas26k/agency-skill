# Reduce Hallucinations

Even strong models can produce claims that are unsupported, inconsistent, or simply wrong. The safest way to reduce hallucination risk is to structure prompts and tool workflows so the model must ground its output in retrievable evidence.

## Basic techniques

- Allow the model to say `I don't know` when evidence is missing.
- Ask for direct quotes before asking for analysis.
- Require every important claim to be backed by a citation or quote.
- Restrict the model to provided documents when accuracy matters more than coverage.

## Advanced techniques

- Use reasoning verification before the final answer.
- Run best-of-N comparisons for high-stakes tasks.
- Use iterative refinement to re-check claims from earlier outputs.
- Have the model retract unsupported claims automatically.

## Prompt pattern

```text
1. Extract the exact quotes relevant to the task.
2. Number the quotes.
3. Perform the analysis using only those quotes.
4. If a claim cannot be supported, say so explicitly instead of guessing.
```

## Why this matters in managed agents

Managed agents can access tools, files, and web content, which helps with grounding, but tool access does not automatically prevent hallucinations. You still need prompt discipline, explicit evidence requirements, and post-generation verification when the task is sensitive.