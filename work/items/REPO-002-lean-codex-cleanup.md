---
type: work_item
item_id: REPO-002
title: Lean the repo down to a single Codex-first product workflow
status: done
owner: codex
updated: 2026-04-18
next_action: Start `PRODUCT-001` from the cleaned root-tree structure and add new guidance layers only when the product needs them.
blocked_on: none
---

# Lean the repo down to a single Codex-first product workflow

## Summary
- Remove legacy scaffolding that no longer serves the product repo.
- Consolidate overlapping guidance into a smaller, security-aware Codex workflow.

## Acceptance Criteria
- Legacy scaffolding references are removed from the canonical repo contract.
- The remaining docs form one coherent entry path for humans and Codex.
- Repo verification checks the lean structure instead of enforcing old template bloat.

## Progress Log
- 2026-04-18: completed the repo cleanup, consolidated security guidance, and replaced
  the old template checks with a smaller repo-contract verification layer.

## Verification
- Ran: `python3 scripts/check_repo.py`
- Not run: `ruff format .` because `ruff` is not installed in the current shell
- Not run: `ruff check .` because `ruff` is not installed in the current shell
- Not run: `python3 -m pytest -q` because `pytest` is not installed in the current shell

## Next Action
- Start `PRODUCT-001` from the lean repo structure and add new instruction files only
  when the product has a concrete need for them.
