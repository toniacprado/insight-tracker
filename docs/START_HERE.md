# Start Here
*Version:* v0.3
*Date:* 2026-04-18
*Last reviewed:* 2026-04-18

This is the shortest useful path for contributors working on Insight Tracker's first
real product slice.

## Read First
1. `docs/PROJECT_MANIFESTO.md`
2. `docs/PROJECT_CHARTER.md`
3. `docs/TECH_STACK_SELECTION.md`
4. `work/ACTIVE_TASKS.md`
5. The current task file in `work/items/`

## Current Recommended Workflow
1. Treat the manifesto and charter as scope guardrails before making implementation
   decisions.
2. Start from `PRODUCT-001` in `work/items/PRODUCT-001-core-capture-review-flow.md`
   unless a newer task has replaced it in `work/ACTIVE_TASKS.md`.
3. Record any meaningful product or architecture change in `docs/DECISIONS.md`.
4. Keep implementation in the root repository tree; do not treat scratch worktrees or
   abandoned side experiments as canonical source.
5. Keep docs, work items, tests, and implementation aligned in the same diff.

## Useful Reference Docs
- `AGENTS.md`
- `docs/CONTEXT_ENGINEERING.md`
- `docs/GIT_WORKFLOW.md`
- `docs/CODEX_PROMPTING.md`
- `docs/TASK_MANAGEMENT.md`
- `docs/BOOTSTRAP_NEXT_STEPS.md` for the inherited maintenance commands

## Current State
- The project definition is concrete enough to start implementation without relying on
  chat memory.
- The product stack is provisionally a single TypeScript web app.
- The next success condition is a working capture-to-review flow that stores both the
  raw capture and the reviewed structured output without manual database edits.
