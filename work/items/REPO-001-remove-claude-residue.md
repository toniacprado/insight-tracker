---
template: work_item
template_version: 0.4
template_date: 2026-03-11
template_last_reviewed: 2026-03-11
type: work_item
item_id: REPO-001
title: Remove abandoned rewrite residue and recenter the repo on the canonical Codex workflow
status: done
owner: codex
updated: 2026-04-18
next_action: Start the canonical root-tree app scaffold for PRODUCT-001 without reusing abandoned scratch work as source of truth.
blocked_on: none
---

# Remove abandoned rewrite residue and recenter the repo on the canonical Codex workflow

## Summary
- Remove secondary-tool compatibility artifacts and abandoned scratch state from the
  root repository contract.
- Rewrite the top-level guidance so the repo has one unambiguous execution path again.

## Acceptance Criteria
- Secondary-tool compatibility files are removed from the canonical repo contract.
- The repo structure and onboarding docs no longer describe Claude as a first-class path.
- The durable work plan points back to the root tree as the only canonical location for
  product implementation.

## Progress Log
- 2026-04-18: removed secondary-tool references from the repo contract and rewrote the
  structure and maintenance guidance around a Codex-only workflow.

## Verification
- Ran `python3 scripts/newcomer_smoke_test.py`
- Ran `python3 scripts/run_prompt_evals.py`

## Next Action
- Scaffold the root-tree TypeScript app for `PRODUCT-001` and treat abandoned scratch
  worktrees only as optional reference material, not code to merge blindly.

## Notes
- An abandoned side worktree contained a divergent Next.js attempt, but it was not the
  canonical repository state.
