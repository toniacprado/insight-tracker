# Project Charter
*Version:* v0.4
*Date:* 2026-04-19
*Last reviewed:* 2026-04-19

This charter defines the first-release boundary for Insight Tracker so implementation
can stay narrow and verifiable.

## Scope
### In Scope For The First Release
- Sign in to a hosted personal app with simple magic-link authentication.
- Capture one quick fragment into an inbox, starting with text and expanding to
  several-minute audio in v1.
- Process a capture asynchronously into a retained transcript, one primary insight,
  and multiple candidate follow-ups.
- Let the user review, edit, confirm, and persist the structured result while keeping
  it linked to the raw capture and transcript.
- Allow a reviewed item to remain insight-only with zero follow-ups when no action is
  justified.
- Keep the experience mobile-friendly enough for live-event use and simple enough to
  access away from one device.

### Out Of Scope For Now
- Full calendar sync, in-app calendar management, or deep email workflows
- CRM-style contact management, team collaboration, or advanced autonomous agents
- Photo capture, rich attachments, or ambient always-on recording as core workflows
- Editable transcripts
- Google Drive as the live source of truth or automatic archive behavior
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
- The app stores the raw capture, transcript, and reviewed structured output with a
  clear link between them.
- At least one real or realistic event scenario produces a confirmed insight and
  zero-to-many follow-ups worth keeping instead of discarding.
- Sensitive capture data stays narrow, intentional, and reviewable rather than flowing
  through broad or implicit external integrations.
- The hosted access pattern does not require the user's Mac to be online for review.

## Risks
- The capture flow may still feel too slow or too interruptive during real events.
- Audio upload and background processing may introduce enough complexity to slow down
  the first release.
- AI suggestions may be generic or noisy enough that review feels like cleanup work
  instead of leverage, especially if too many follow-up candidates are produced.
- Scope can drift into calendar, CRM, archive, or note-taking replacement behavior
  before the core loop is proven.
- Security shortcuts could undermine trust before the product proves value.

## Delivery Approach
- Start with one thin slice: auth, inbox text capture, structured suggestion,
  review, confirmation, and persistence.
- Keep the architecture single-user and simple until the core workflow proves useful.
- Add audio upload next, but defer Google Drive archive and deeper integrations if
  they threaten the capture-to-review slice.
- Keep docs, code, and tests aligned in the same diff when behavior changes.
- Keep external provider boundaries explicit and small enough to reason about.
