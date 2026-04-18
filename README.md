# Insight Tracker

Insight Tracker is a mobile-first TypeScript web app for people who leave events with
useful fragments but weak follow-through. The product focuses on one narrow promise:
capture a quick event note, turn it into a suggested insight and follow-up, then let a
human review and confirm the result before it becomes trusted output.

## Product focus
- Fast event capture for meetups, coffee chats, hackathons, and similar live contexts
- AI-assisted suggestion generation with explicit human review
- Clear persistence of both the raw capture and the reviewed structured result

## Current implementation plan
The canonical implementation path is the root repository tree. The next build slice is
`PRODUCT-001` in [`work/ACTIVE_TASKS.md`](/Users/toniacprado/Dev/insight-tracker/work/ACTIVE_TASKS.md)
and [`work/items/PRODUCT-001-core-capture-review-flow.md`](/Users/toniacprado/Dev/insight-tracker/work/items/PRODUCT-001-core-capture-review-flow.md):

1. Scaffold the TypeScript app in the root tree.
2. Implement event creation and one text capture flow.
3. Process the capture into a suggested insight and follow-up.
4. Review, edit, confirm, and persist the reviewed output.
5. Add the first app-native test coverage and replace template-only assumptions as the
   scaffold becomes real.

## Repo structure
- [`docs/START_HERE.md`](/Users/toniacprado/Dev/insight-tracker/docs/START_HERE.md) for the shortest current working path
- [`docs/PROJECT_MANIFESTO.md`](/Users/toniacprado/Dev/insight-tracker/docs/PROJECT_MANIFESTO.md) for product intent and anti-goals
- [`docs/PROJECT_CHARTER.md`](/Users/toniacprado/Dev/insight-tracker/docs/PROJECT_CHARTER.md) for first-release scope
- [`docs/TECH_STACK_SELECTION.md`](/Users/toniacprado/Dev/insight-tracker/docs/TECH_STACK_SELECTION.md) for the selected stack and verification direction
- [`docs/REPO_STRUCTURE.md`](/Users/toniacprado/Dev/insight-tracker/docs/REPO_STRUCTURE.md) for source-of-truth boundaries
- [`work/`](/Users/toniacprado/Dev/insight-tracker/work/README.md) for active plan state, work items, and durable learnings

## Contributor workflow references
- `docs/CODEX_FIRST_HOUR.md` for the shortest orientation path in a fresh session
- `docs/CODEX_SESSION_STARTER.md` for the recommended Codex prompt structure
- `docs/CONTEXT_ENGINEERING.md` for the repo's just-in-time context rules
- `docs/GIT_WORKFLOW.md` for the publish path and branch guidance
- `scripts/bootstrap_new_project.py` as the original bootstrap utility; do not rerun it
  for ongoing Insight Tracker work unless you explicitly intend to reset the repo from
  the template

## Current status
The repo is back to one canonical workflow: Codex-first guidance, root-tree
implementation, and no secondary Claude compatibility path. Until the TypeScript app
exists, the inherited Python maintenance scripts remain the temporary repo checks:
`python3 scripts/run_prompt_evals.py` and `python3 scripts/newcomer_smoke_test.py`.
