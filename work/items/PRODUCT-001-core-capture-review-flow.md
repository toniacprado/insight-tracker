---
type: work_item
item_id: PRODUCT-001
title: Build the core capture-to-review flow
status: todo
owner: codex
updated: 2026-04-19
next_action: Scaffold the hosted TypeScript web app shell with magic-link auth, inbox capture, and one text-capture review happy path.
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

## Verification
- Planned unit or integration checks: `pnpm test`
- Planned end-to-end check: `pnpm exec playwright test`
- Planned manual check: complete the happy path on a mobile-width viewport and confirm
  that raw and reviewed records are both persisted

## Next Action
- Scaffold the hosted app shell, auth boundary, persistence schema, and happy-path UI
  for inbox capture plus one text review flow.

## Notes
- Audio upload is part of v1 direction, but the first implementation slice should prove
  the inbox text flow before adding several-minute audio handling.
- Event or session grouping remains deferred; the first slice should keep captures
  usable without that structure.
- Google Drive archive stays manual and should not be put on the operational hot path
  for this slice.
