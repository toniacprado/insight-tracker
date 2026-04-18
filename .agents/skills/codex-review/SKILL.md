# Skill: codex-review

## Use when
- You need a correctness-first review of a proposed change.
- You want explicit findings for bugs, regressions, security risks, or missing tests.

## Workflow
1. Read `AGENTS.md`, `docs/GUARDRAILS.md`, and the changed files.
2. Identify concrete findings first; include file references.
3. Prioritize issues by impact and likelihood.
4. Call out missing verification and missing task-state updates.
5. End with residual risk and the smallest next fix.

## Output contract
- Findings are primary output.
- If no findings exist, say so explicitly and list residual risk or testing gaps.
