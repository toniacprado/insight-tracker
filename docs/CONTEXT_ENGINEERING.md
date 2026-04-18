# Context Engineering
*Version:* v1.0  
*Date:* 2026-04-18  
*Last reviewed:* 2026-04-18

This file defines how to keep Codex effective without drowning it in repo text.

## Core rule
Treat context as a finite attention budget.

Default behavior:
- start with the smallest relevant context pack
- prefer repo files over chat recollection
- retrieve extra files just in time
- compact long-session state back into the repo

## Context order
1. Product intent: `docs/PROJECT_MANIFESTO.md`, `docs/PROJECT_CHARTER.md`
2. Working contract: `AGENTS.md`, this file, `docs/GUARDRAILS.md`
3. Current task state: `work/ACTIVE_TASKS.md` and the relevant work item
4. Direct targets: the exact files you expect to edit or verify
5. External sources: only when the repo is insufficient

## Context packs
### Planning
Load:
- `README.md`
- `AGENTS.md`
- `docs/PROJECT_MANIFESTO.md`
- `docs/PROJECT_CHARTER.md`
- `work/ACTIVE_TASKS.md`
- the relevant work item

### Implementation
Load:
- `AGENTS.md`
- `docs/CONTEXT_ENGINEERING.md`
- `docs/GUARDRAILS.md` if data flow or AI behavior is involved
- `work/ACTIVE_TASKS.md`
- the relevant work item
- only the exact source and test files involved

### Review
Load:
- `AGENTS.md`
- `docs/GUARDRAILS.md`
- the changed files or diff
- the directly related tests and work item

### External research
Load:
- the smallest relevant repo pack first
- the official source only
- the minimum external material needed for the decision

## Retrieval rules
- Search narrowly before opening files.
- Avoid “read the whole repo” unless you are intentionally doing an audit.
- If a prompt is vague, tighten the goal before loading more context.
- Write durable decisions back into the repo instead of trusting the next chat to remember them.

## Compaction rules
Compact state back into the repo when:
- a task spans multiple steps
- the thread gets long
- the plan changes
- you are about to hand off

Minimum compaction payload:
- current goal
- major decisions
- files touched or to read next
- verification run and results
- blockers or open questions
- next action

Write it to:
- `work/items/` for task-local state
- `docs/DECISIONS.md` for enduring choices
- `work/LEARNINGS.md` for reusable discoveries
