# Insight Tracker

Insight Tracker is a secure, human-in-the-loop capture and review app for event
follow-through. The product is meant for real-world use during meetups, coffee chats,
hackathons, and similar live contexts where notes are easy to take but hard to turn
into trustworthy next actions.

## Product focus
- Fast capture while the event context is still fresh
- Structured AI assistance without handing control to the model
- Clear traceability from raw capture to reviewed output
- Security and privacy as default design constraints, not later cleanup

## Current plan
The next implementation slice is [`PRODUCT-001`](/Users/toniacprado/Dev/insight-tracker/work/items/PRODUCT-001-core-capture-review-flow.md):

1. Scaffold the root-tree TypeScript web app.
2. Support event creation and one text capture flow.
3. Generate a suggested insight and follow-up behind a typed processing boundary.
4. Require review and confirmation before persistence.
5. Add app-native tests and keep the data flow narrow, local-first, and auditable.

## Read first
- [`docs/START_HERE.md`](/Users/toniacprado/Dev/insight-tracker/docs/START_HERE.md)
- [`docs/PROJECT_MANIFESTO.md`](/Users/toniacprado/Dev/insight-tracker/docs/PROJECT_MANIFESTO.md)
- [`docs/PROJECT_CHARTER.md`](/Users/toniacprado/Dev/insight-tracker/docs/PROJECT_CHARTER.md)
- [`docs/GUARDRAILS.md`](/Users/toniacprado/Dev/insight-tracker/docs/GUARDRAILS.md)
- [`work/ACTIVE_TASKS.md`](/Users/toniacprado/Dev/insight-tracker/work/ACTIVE_TASKS.md)

## Verification
```text
ruff format .
ruff check .
pytest -q
python scripts/check_repo.py
```
