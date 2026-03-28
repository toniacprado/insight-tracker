# Insight Tracker

Insight Tracker is a mobile-friendly TypeScript web app for intentional professional
attendees who leave events with scattered fragments instead of usable follow-through.
It helps users capture quick text notes, links, photos, or short voice snippets during
or right after live conversations, then turns those fragments into structured insights
and suggested next actions that a human can review before acting on.

## What v1 Is Trying To Prove
- People will revisit event captures if the product turns raw fragments into clear,
  reviewable insights instead of another pile of notes.
- The fastest path to value is a lightweight capture-to-review loop, not a full
  replacement for notes apps, calendars, or CRMs.
- Human review is part of the product, not an afterthought.

## First Release Workflow
1. Create or open a lightweight event context.
2. Add one quick capture input.
3. Process that capture into a suggested insight and follow-up.
4. Review, edit, and confirm the structured result.
5. Store both the raw capture and the reviewed output for later retrieval.

## Out Of Scope Right Now
- Full calendar sync or in-app calendar management
- CRM-style contact management
- Email integration
- Long ambient conversation recording as a core workflow
- Team collaboration, advanced autonomous agents, or heavy analytics dashboards
- Replacing Notes, Notion, WhatsApp, Google Calendar, or Outlook as general-purpose tools

## Repo Entry Points
- `docs/START_HERE.md` for the current working path
- `docs/PROJECT_MANIFESTO.md` for product intent and anti-goals
- `docs/PROJECT_CHARTER.md` for first-release scope and success criteria
- `docs/TECH_STACK_SELECTION.md` for the provisional stack and verification path
- `docs/DECISIONS.md` for project-level decisions and revisit triggers
- `work/ACTIVE_TASKS.md` for the next implementation slice

## Contributor Workflow References
- `docs/CODEX_FIRST_HOUR.md` for the shortest orientation path in a fresh session
- `docs/CODEX_SESSION_STARTER.md` for the recommended Codex prompt structure
- `docs/CONTEXT_ENGINEERING.md` for the repo's just-in-time context rules
- `docs/GIT_WORKFLOW.md` for the publish path and branch guidance
- `scripts/bootstrap_new_project.py` as the original template bootstrap utility; do not
  rerun it for ongoing Insight Tracker work unless you explicitly intend to reset the
  repo from the template

## Current Status
The first-pass project definition is in place. The next repo-visible milestone is
`PRODUCT-001`, which defines the initial capture-to-review implementation slice and
its verification path.

Until the TypeScript app scaffold exists, the inherited Python maintenance commands in
`docs/BOOTSTRAP_NEXT_STEPS.md` remain the temporary repo-level checks.
