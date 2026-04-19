# Guardrails
*Version:* v1.1  
*Date:* 2026-04-19  
*Last reviewed:* 2026-04-19

This file defines the security, privacy, and AI-safety boundaries for the repo and the
product.

## Core rule
Keep the system as capable as needed, but no more capable than the task requires.

## Default posture
- private-by-default data flows
- network and external processing off by default unless the task or product path needs them
- narrow file writes
- explicit human approval before destructive or externally visible actions
- no secrets or private data in source, fixtures, or logs

## Data handling
- Treat live-context captures as potentially sensitive user data.
- Keep raw captures, derived suggestions, and review history traceable and auditable.
- Do not send user data to external services unless the boundary is explicit and reviewed.
- Redact or avoid logging sensitive content when debugging.

## Model and automation policy
- User-facing AI behavior must stay reviewable and reversible.
- Validate model outputs before they become writes, commands, or trusted records.
- Keep external provider behavior behind explicit interfaces and contracts.
- Do not hide risky autonomous behavior behind convenience abstractions.

## Human review triggers
Require explicit human review before:
- deleting or overwriting important data
- enabling broader network access
- introducing a new external model or data processor
- broad dependency or environment changes
- automated external sends, syncs, or publication
- any workflow that touches sensitive or regulated data

## Runtime design reminders
- Prefer typed boundaries and explicit schemas.
- Keep permission scopes tight.
- Plan for model failure, provider outage, and bad output.
- Make it easy to inspect what data moved where and why.
