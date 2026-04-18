# Repo Structure
*Version:* v1.0  
*Date:* 2026-04-18  
*Last reviewed:* 2026-04-18

Insight Tracker keeps a small number of first-class directories on purpose.

```text
repo/
  README.md
  AGENTS.md
  docs/
  work/
  src/
  tests/
  scripts/
  .codex/
  .agents/
  runtime/
```

## Boundary guide
- `docs/` holds product intent, engineering rules, security policy, and repo workflow.
- `work/` holds active tasks, detailed work items, and durable learnings.
- `src/` holds implementation code.
- `tests/` holds deterministic verification.
- `scripts/` holds small repo utilities such as health checks.
- `.codex/` holds shared Codex configuration.
- `.agents/skills/` holds optional repeatable Codex workflows.
- `runtime/` holds rebuildable outputs only.

## Practical rules
- If the information should survive the current chat, put it in `docs/` or `work/`.
- If the file exists only to preserve old scaffolding, delete it.
- If an output can be regenerated, keep it out of canonical source paths.
