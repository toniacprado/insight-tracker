# Project Charter
*Version:* v0.2
*Date:* 2026-03-28
*Last reviewed:* 2026-03-28

This charter defines the first-release boundary for Insight Tracker so implementation
can stay narrow and verifiable.

## Scope
### In Scope For The First Release
- Create and reopen a lightweight event context for a meetup, coffee chat, hackathon,
  or similar live interaction.
- Capture one quick fragment for that event, starting with text and leaving room for
  mocked voice, photo, or link inputs while the contracts are established.
- Process a capture into a suggested insight and a suggested follow-up action.
- Let the user review, edit, confirm, and persist the structured result while keeping
  it linked to the raw capture.
- Keep the experience mobile-friendly enough for live-event use.

### Out Of Scope For Now
- Full calendar sync, in-app calendar management, or deep email workflows
- CRM-style contact management, team collaboration, or advanced autonomous agents
- Long ambient recording as a core workflow
- Heavy tagging systems, analytics dashboards, or broad personal knowledge management
- Any attempt to replace Notes, Notion, WhatsApp, Google Calendar, or Outlook as a
  general-purpose tool

## Primary Users
- An intentional professional attendee such as a founder, PM, consultant, researcher,
  or career-transition professional who wants better follow-through from live events
- A solo early adopter who values lightweight capture and review more than automation
  breadth

## Success Metrics
- A user can complete the capture-to-review flow end to end without manual database
  edits.
- The app stores both the raw capture and the reviewed structured output with a clear
  link between them.
- At least one real or realistic event scenario produces a confirmed insight and
  follow-up worth keeping instead of discarding.

## Risks
- The capture flow may still feel too slow or too interruptive during real events.
- AI suggestions may be generic or noisy enough that review feels like cleanup work
  instead of leverage.
- Scope can drift into calendar, CRM, or note-taking replacement behavior before the
  core loop is proven.

## Delivery Approach
- Start with one thin slice: event creation, text capture, structured suggestion,
  review, confirmation, and persistence.
- Keep the architecture single-user and simple until the core workflow proves useful.
- Defer `.ics` export, real voice/photo processing, and deeper integrations if they
  threaten the capture-to-review slice.
- Keep docs, code, prompts, evals, and tests aligned in the same diff when behavior
  changes.

## Next In Fast Path
Open `work/items/PRODUCT-001-core-capture-review-flow.md` and implement the happy path
described there against the stack choices in `docs/TECH_STACK_SELECTION.md`.
