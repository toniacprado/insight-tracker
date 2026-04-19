# Insight Tracker

Insight Tracker is a secure, human-in-the-loop capture and review app for live
professional context. The product is meant for real-world use during meetups, coffee
chats, hackathons, and similar situations where a quick note or voice memo is easy to
capture but hard to turn into trustworthy follow-through.

## Product focus
- Inbox-first capture for text and several-minute audio
- Structured AI assistance without handing control to the model
- Clear traceability from raw capture and transcript to reviewed output
- Security and privacy as default design constraints, not later cleanup
- Access from anywhere through a hosted, authenticated web app

## Current plan
The next implementation slice is [`PRODUCT-001`](/Users/toniacprado/Dev/insight-tracker/work/items/PRODUCT-001-core-capture-review-flow.md):

1. Keep the hosted TypeScript app shell and text review loop working as the canonical root implementation.
2. Replace the development magic-link preview and file-backed runtime store with the first real hosted auth, database, and storage providers.
3. Add audio upload and processing after the text path is stable on the real provider set.
4. Keep raw captures private and auditable, with manual archive still explicit rather than automatic.

## Read first
- [`docs/START_HERE.md`](/Users/toniacprado/Dev/insight-tracker/docs/START_HERE.md)
- [`docs/PROJECT_MANIFESTO.md`](/Users/toniacprado/Dev/insight-tracker/docs/PROJECT_MANIFESTO.md)
- [`docs/PROJECT_CHARTER.md`](/Users/toniacprado/Dev/insight-tracker/docs/PROJECT_CHARTER.md)
- [`docs/GUARDRAILS.md`](/Users/toniacprado/Dev/insight-tracker/docs/GUARDRAILS.md)
- [`work/ACTIVE_TASKS.md`](/Users/toniacprado/Dev/insight-tracker/work/ACTIVE_TASKS.md)

## Verification
```text
pnpm test
pnpm check
pnpm build
ruff format .
ruff check .
pytest -q
python scripts/check_repo.py
```
