# Start Here
*Version:* v1.1
*Date:* 2026-04-19
*Last reviewed:* 2026-04-19

This is the shortest useful path for working in Insight Tracker.

## Read first
1. `README.md`
2. `docs/PROJECT_MANIFESTO.md`
3. `docs/PROJECT_CHARTER.md`
4. `docs/GUARDRAILS.md`
5. `work/ACTIVE_TASKS.md`
6. the relevant file in `work/items/`

## Default work loop
1. Confirm the product goal and scope before editing.
2. Load only the smallest relevant context from `docs/CONTEXT_ENGINEERING.md`.
3. Implement one thin slice.
4. Update docs, tests, and `work/` in the same diff when behavior changes.
5. Run verification and record any remaining gap honestly.

## Current target
- The active implementation slice is `PRODUCT-001`.
- The canonical implementation path is the root repository tree.
- The current product direction is a hosted, authenticated, inbox-first capture and
  review app for text plus several-minute audio.
- Security, privacy, and human review are part of the product definition, not optional
  polish.
