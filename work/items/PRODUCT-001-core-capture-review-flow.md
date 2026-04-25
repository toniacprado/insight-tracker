---
type: work_item
item_id: PRODUCT-001
title: Build the core capture-to-review flow
status: in_progress
owner: codex
updated: 2026-04-25
next_action: Wire Supabase Auth, Postgres, and private Storage behind the existing boundaries, then deploy through Vercel env configuration before adding audio upload.
blocked_on: none
---

# Build the core capture-to-review flow

## Summary
- Implement the first thin slice of Insight Tracker: sign in, submit one quick capture
  into an inbox, process it into a transcript, a suggested insight, and multiple
  follow-up candidates, then let the user review and confirm the result in the UI.
- Keep this slice narrow enough to prove the product promise without deep integrations
  or production-grade media processing.
- Keep the first data flow hosted but explicit so security, privacy, and review
  boundaries stay easy to inspect.

## Acceptance Criteria
- A user can sign in through the first supported auth flow.
- A user can submit one text capture into an inbox without creating an event first.
- The system processes that capture into normalized source text, a suggested insight,
  and multiple suggested follow-up candidates.
- The user can review a read-only source view, edit the insight, and confirm zero, one,
  or many follow-ups in the UI.
- The app stores both the raw capture and the reviewed structured output with a clear
  relationship between them.
- The full happy path works end to end without manual database editing.
- External provider boundaries stay behind explicit interfaces and are easy to disable
  while the first slice is being proven.

## Progress Log
- 2026-03-28: work item created during the initial product-definition pass to define
  the first implementation slice and verification path.
- 2026-04-18: repo cleanup re-established the root tree as the only canonical source
  of truth before app scaffolding begins.
- 2026-04-18: lean repo cleanup removed old scaffolding and elevated security as a
  first-class product constraint.
- 2026-04-19: product direction shifted from event-first local prototyping to a hosted,
  inbox-first personal app with async processing, retained transcripts, and optional
  later grouping.
- 2026-04-19: scaffolded a working Next.js text flow with development magic-link
  preview, file-backed runtime state, async processing status, and review confirmation.
- 2026-04-25: reviewed the repo and confirmed the current plan still points at the
  right next slice: replace development adapters with hosted auth, relational
  persistence, and private storage before audio upload. The app and repo checks pass,
  but the production build emits a Turbopack NFT tracing warning from the development
  file-backed store that should be removed as part of the provider replacement.
- 2026-04-25: fixed the review findings by adding expiring development magic links,
  moving processing advancement from page render to an authenticated route used by the
  poller, and replacing the file-backed development store with in-memory state so
  production builds no longer trace the runtime state directory.
- 2026-04-25: selected the first hosted provider set: Vercel for the Next.js host and
  Supabase for magic-link auth, Postgres persistence, and private object storage.

## Verification
- Completed unit or integration checks on 2026-04-25: `pnpm test`, `pnpm check`,
  `pnpm build`
- Completed repo checks on 2026-04-25: `python3 scripts/check_repo.py`,
  `python3 -m py_compile scripts/check_repo.py tests/test_repo_contract.py src/insight_tracker_repo/__init__.py`
- Completed Python checks on 2026-04-25 after installing local `.venv` dev tooling:
  `.venv/bin/python -m pytest -q`, `.venv/bin/python -m ruff format . --check`, and
  `.venv/bin/python -m ruff check .`
- Resolved build warning on 2026-04-25: `pnpm build` passes without the Turbopack NFT
  trace after removing the file-backed development store from production imports.
- Pending end-to-end check: `pnpm exec playwright test`
- Pending manual check: complete the happy path on a mobile-width viewport and confirm
  that raw and reviewed records are both persisted

## Next Action
- Add Supabase environment variables and server/client boundaries.
- Create the first schema migration for captures, processing state, suggestions, and
  reviews with RLS policies scoped to the signed-in user.
- Replace the development magic-link preview and in-memory state without changing the
  existing text capture and review flow.
- Add private `raw-captures` storage and audio upload only after the hosted text path
  passes verification.

## Notes
- Audio upload is part of v1 direction, but the first implementation slice should prove
  the inbox text flow before adding several-minute audio handling.
- Event or session grouping remains deferred; the first slice should keep captures
  usable without that structure.
- Google Drive archive stays manual and should not be put on the operational hot path
  for this slice.
- The current app shell is intentionally not production-ready because auth delivery and
  persistence still rely on development adapters under explicit interfaces.
- Local development state is currently in-memory and resets with the server process;
  durability is intentionally deferred to the hosted persistence adapter.
