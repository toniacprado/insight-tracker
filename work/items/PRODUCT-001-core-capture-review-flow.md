---
type: work_item
item_id: PRODUCT-001
title: Build the core capture-to-review flow
status: todo
owner: codex
updated: 2026-04-18
next_action: Scaffold the secure root-tree TypeScript web app shell and implement event creation plus one text capture happy path.
blocked_on: none
---

# Build the core capture-to-review flow

## Summary
- Implement the first thin slice of Insight Tracker: create an event, submit one quick
  capture, process it into a suggested insight and follow-up, and let the user review
  and confirm the result in the UI.
- Keep this slice narrow enough to prove the product promise without deep integrations
  or production-grade media processing.
- Keep the first data flow local-first and explicit so security and privacy assumptions
  stay easy to inspect.

## Acceptance Criteria
- A user can create a basic event context in the app.
- A user can submit one text capture for that event.
- The system processes that capture into a suggested insight and a suggested follow-up.
- The user can review, edit, and confirm the structured result in the UI.
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

## Verification
- Planned unit or integration checks: `pnpm test`
- Planned end-to-end check: `pnpm exec playwright test`
- Planned manual check: complete the happy path on a mobile-width viewport and confirm
  that raw and reviewed records are both persisted

## Next Action
- Scaffold the root-tree app shell, persistence schema, and happy-path UI for event
  creation plus one text capture.

## Notes
- Voice, photo, and link inputs can stay mocked or stubbed in this slice as long as the
  data contracts remain explicit.
- `.ics` export is intentionally deferred until the core review loop is stable.
