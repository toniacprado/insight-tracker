---
template: work_item
template_version: 0.4
template_date: 2026-03-11
template_last_reviewed: 2026-03-11
type: work_item
item_id: BOOTSTRAP-001
title: Initialize Insight Tracker from the Codex-first template
status: done
owner: codex
updated: 2026-03-28
next_action: Start PRODUCT-001 from work/items/PRODUCT-001-core-capture-review-flow.md.
blocked_on: none
---

# Initialize Insight Tracker from the Codex-first template

## Summary
- Replaced the remaining placeholder content with a first-pass product definition for
  Insight Tracker.
- The repo now has project-specific landing docs, manifesto, charter, stack guidance,
  decisions, and a first implementation work item for the capture-to-review flow.

## Acceptance Criteria
- `README.md` describes the real project rather than the template.
- `docs/START_HERE.md` reflects the real project workflow rather than the generated draft.
- `docs/PROJECT_MANIFESTO.md` is rewritten for the real product.
- `docs/PROJECT_CHARTER.md` is rewritten with real scope and non-goals.
- `docs/TECH_STACK_SELECTION.md` reflects the actual stack decision.
- `docs/DECISIONS.md` contains project-specific decisions.
- `work/ACTIVE_TASKS.md` points at the first non-bootstrap product task.

## Progress Log
- 2026-03-28: bootstrap task created from the template with project-draft docs, a Codex
  session starter, and a guided handoff.
- 2026-03-28: replaced placeholder product docs with a concrete first-pass definition
  focused on event capture, AI-assisted structuring, and human review.
- 2026-03-28: created `PRODUCT-001` to define the first implementation slice and its
  verification path.

## Verification
- Passed placeholder-removal check across the rewritten bootstrap artifacts via
  `rg -n "Replace this with|starter draft|generated during bootstrap|Open docs/CODEX_SESSION_STARTER.md and paste the recommended prompt|product definition is still in draft form" ...`
- Passed `python3 scripts/newcomer_smoke_test.py`
- Warning only: PowerShell is unavailable locally, so the smoke test reported that
  PowerShell-specific bootstrap-script checks may be skipped on this machine

## Next Action
- Start `PRODUCT-001` and scaffold the TypeScript web app around the capture-to-review
  happy path.

## Notes
- Review `docs/REPO_BOOTSTRAP_CHECKLIST.md` before the first real feature.
- Use `docs/GIT_WORKFLOW.md` to choose the publish path for the new repo instead of
  assuming every change needs a new branch.
- Exact model provider, authentication, and `.ics` export timing remain intentionally
  deferred until the core flow is stable.
