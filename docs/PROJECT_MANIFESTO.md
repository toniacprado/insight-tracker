# Project Manifesto
*Version:* v0.2
*Date:* 2026-03-28
*Last reviewed:* 2026-03-28

Insight Tracker exists because valuable event insights decay almost immediately.
People leave meetups, hackathons, coffee chats, and networking conversations with
fragments: a sentence in Notes, a link in WhatsApp, a voice memo, a photo, or a
mental promise to follow up later. Those fragments rarely turn into action because
capture is scattered and review is too much work.

## Why This Exists
- Intentional professional attendees need a lightweight way to capture valuable
  fragments before they disappear.
- Existing workarounds are optimized for storage, not follow-through.
- This repo exists to build a focused product that turns event fragments into usable
  next steps without forcing a heavy workflow in the moment.

## The Promise
- Make event capture fast enough to use between conversations or on the way home.
- Turn raw captures into structured insight suggestions and follow-up actions with AI
  assistance.
- Keep the human in control through review, editing, and confirmation before anything
  becomes trusted output.

## Non-Negotiables
- The repo stays the durable source of truth for product intent, scope, and task state.
- The capture flow must feel lighter than opening a general-purpose note-taking system.
- Reviewed outputs must stay traceable to the raw capture they came from.
- The product uses explicit user-initiated capture, not ambient always-on recording.

## Anti-Goals
- Do not build a general-purpose notes app, calendar, or CRM replacement.
- Do not prioritize full sync integrations, email automation, or autonomous follow-up
  agents before the core loop works.
- Do not add complex taxonomy, dashboards, or collaboration features before single-user
  value is proven.

## What Good Looks Like First
- A user creates an event, submits a quick capture, and receives a suggested insight
  plus a suggested follow-up worth reviewing.
- The user can edit and confirm the structured result without leaving the product or
  touching the database manually.
- The repo makes the next implementation step obvious to a new contributor through
  `docs/` and `work/`.

## Constraints
- The first product surface is a mobile-friendly TypeScript web app, not a native app
  suite.
- The first release should stay simple enough for a single-user or very small-scale
  workflow.
- Real-time integrations and broad automation stay deferred until the review loop
  proves useful.
- Privacy and trust matter: captures should be intentional, reviewable, and
  user-controlled.
