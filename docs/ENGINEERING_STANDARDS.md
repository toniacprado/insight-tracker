# Engineering Standards
*Version:* v1.0  
*Date:* 2026-04-18  
*Last reviewed:* 2026-04-18

## Principles
- Prefer the simplest readable approach that works.
- Avoid speculative knobs and future-scope abstractions.
- Keep modules, docs, and work items focused.
- Use names that explain intent.
- Handle errors with actionable messages.
- Keep write paths idempotent where practical.

## Change rules
- Product behavior change: update docs, tests, and work tracking in the same diff.
- Multi-step work: update `work/` before handoff.
- Security or data-flow change: review `docs/GUARDRAILS.md`.
- Material Markdown guidance change: update version/date/review stamps.

## Testing rules
- Add at least one happy-path test for important new behavior.
- Add regression coverage for meaningful bug fixes.
- Prefer deterministic tests over fuzzy assertions.
- If a workflow cannot be verified yet, record the blocker explicitly.

## Hygiene checklist
- Is the diff scoped to one clear outcome?
- Can another contributor understand the next step from `work/` alone?
- Did the change make the repo simpler instead of more clever?
- Did the change keep the security posture explicit?
