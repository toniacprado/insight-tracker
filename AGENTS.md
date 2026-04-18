# AGENTS.md - Insight Tracker
*Version:* v2.0  
*Date:* 2026-04-18  
*Last reviewed:* 2026-04-18

This repo is designed for Codex-first collaboration on the actual product, not as a
generic bootstrap template. Keep the instruction surface small, explicit, and durable.

## Core rule
Use the repo as the source of truth. If a decision, plan, risk, or next step should
survive the current chat, write it into the repo.

## Canonical files
When sources conflict, prefer this order:
1. `docs/PROJECT_MANIFESTO.md`
2. `docs/PROJECT_CHARTER.md`
3. `docs/TECH_STACK_SELECTION.md`
4. `docs/ENGINEERING_STANDARDS.md`
5. `docs/GUARDRAILS.md`
6. `docs/CONTEXT_ENGINEERING.md`
7. `docs/GIT_WORKFLOW.md`
8. `docs/REPO_STRUCTURE.md`
9. `work/ACTIVE_TASKS.md` and the relevant file in `work/items/`

## Default context load
Start with:
1. `README.md`
2. `docs/PROJECT_MANIFESTO.md`
3. `docs/PROJECT_CHARTER.md`
4. `docs/CONTEXT_ENGINEERING.md`
5. `work/ACTIVE_TASKS.md`
6. the relevant work item

Load more only when the current step actually needs it.

## Working rules
- Tighten ambiguous specs before changing code.
- Prefer one small, verifiable slice at a time.
- Keep the root tree canonical; do not treat scratch worktrees as source of truth.
- Update docs, tests, and `work/` in the same diff when behavior changes.
- Before ending non-trivial work, update the relevant task artifact with status,
  verification, blockers, learnings, and next action.
- If you materially edit Markdown guidance, update its version/date/review stamps.

## Security rules
- Default to local-first, narrow-permission workflows.
- Network access stays off unless the task needs it.
- Ask before destructive actions, external sends, or broader data exposure.
- Never commit secrets, private user data, or provider credentials.
- Treat AI outputs as untrusted until validated by code or human review.
- Keep user-facing AI features reviewable, traceable, and easy to override.

## Repo boundaries
- `docs/` holds product intent, engineering rules, security policy, and workflow guidance.
- `work/` holds active task state and durable handoff information.
- `src/` holds implementation code.
- `tests/` holds deterministic verification.
- `.codex/` holds shared Codex config.
- `.agents/skills/` holds optional repeatable Codex workflows.
- `runtime/` holds rebuildable outputs only.

## Verification
- Run the relevant checks for the files you touched.
- Report exactly what ran and what did not.
- Do not claim a workflow works unless you verified it.

## Definition of done
- The change is scoped and understandable.
- Security or data-flow impact is explicit.
- Verification is reported honestly.
- `work/` shows the next action without relying on chat history.
