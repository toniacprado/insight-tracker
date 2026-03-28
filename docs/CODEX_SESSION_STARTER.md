# Codex Session Starter
*Version:* v0.1
*Date:* 2026-03-28
*Last reviewed:* 2026-03-28

This file is for the human starting the first Codex session in Insight Tracker. Copy
one of the prompts below into Codex instead of starting with a vague one-shot request.

## Recommended Prompt
Use this unless you have a strong reason to skip bootstrap.

```text
Goal: Take over bootstrap and turn this fresh repo into a real first-pass
project definition.
Context: Read README.md, AGENTS.md, docs/CONTEXT_ENGINEERING.md,
docs/START_HERE.md, docs/CODEX_SESSION_STARTER.md,
docs/BOOTSTRAP_NEXT_STEPS.md, docs/BOOTSTRAP_ARTIFACT_WORKSHOP.md,
docs/PROJECT_MANIFESTO.md, docs/PROJECT_CHARTER.md, docs/TECH_STACK_SELECTION.md,
docs/DECISIONS.md, work/ACTIVE_TASKS.md, and
work/items/BOOTSTRAP-001-initialize-project.md.
Constraints: Stay in bootstrap/spec mode first. Strongly recommend finishing the
landing docs, manifesto, charter, tech stack decision, decision log, and first work
item before feature implementation. Do not ask me to fill blank forms; interview me
with a short focused set of questions, then draft the files directly. Load only the
bootstrap context pack first, then retrieve extra files just in time. If I explicitly
choose to skip bootstrap, warn me once about the risk, then proceed and record
assumptions and follow-up bootstrap debt in work/.
Done when: README.md, docs/START_HERE.md, the core project artifacts, and the first
implementation slice plus verification path are defined in work/.
```

## What Good Looks Like
- Codex asks a short set of targeted questions instead of waiting for a perfect brief.
- Codex drafts the manifesto, charter, stack decision, decision log, and work item.
- You review and correct assumptions before feature work begins.

## Corrective Prompt
If Codex starts implementing features too early, paste this:

```text
Goal: Stop implementation and switch back to bootstrap mode.
Context: Read AGENTS.md, docs/CONTEXT_ENGINEERING.md, docs/CODEX_SESSION_STARTER.md,
docs/BOOTSTRAP_NEXT_STEPS.md, docs/BOOTSTRAP_ARTIFACT_WORKSHOP.md,
work/ACTIVE_TASKS.md, and work/items/BOOTSTRAP-001-initialize-project.md.
Constraints: Do not implement features yet. Finish the core project artifacts first
unless I explicitly tell you to skip bootstrap.
Done when: bootstrap artifacts and work tracking are drafted well enough to define the
first implementation slice.
```

## Skip Path
Skipping bootstrap is allowed but not recommended.

```text
Goal: Start the first feature even though bootstrap artifacts are incomplete.
Context: Read AGENTS.md, docs/CONTEXT_ENGINEERING.md, docs/BOOTSTRAP_NEXT_STEPS.md,
work/ACTIVE_TASKS.md, and work/items/BOOTSTRAP-001-initialize-project.md.
Constraints: Warn me once that missing manifesto and charter context increases
assumption risk. Then proceed only if I confirm. Record the missing artifacts, key
assumptions, and a follow-up task in work/. Keep the feature slice small and
verifiable.
Done when: the first feature slice is defined or implemented, verification is clear,
and bootstrap debt is tracked in work/.
```
