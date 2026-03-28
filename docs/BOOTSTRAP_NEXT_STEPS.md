# Bootstrap Next Steps
*Version:* v0.1
*Date:* 2026-03-28
*Last reviewed:* 2026-03-28

This guide is the primary post-bootstrap handoff for Insight Tracker. It strongly
recommends a spec-first bootstrap before feature work, but it does not hard-block you
if you choose to skip.

## Why This Path Is Recommended
Even users who already know the product idea benefit from this flow. The point is not
to slow you down. The point is to convert the idea in your head into repo-visible
artifacts that later Codex sessions can read, trust, and extend without guessing.

## What Bootstrap Already Did
- Renamed the repo landing page to `Insight Tracker`.
- Set the project slug to `insight-tracker` in `pyproject.toml`.
- Reset `CHANGELOG.md`, `work/ACTIVE_TASKS.md`, `work/LEARNINGS.md`, and
  `docs/DECISIONS.md`.
- Removed template-only work items under `work/items/TEMPLATE-*.md`.
- Generated project-draft placeholders plus a Codex session starter and artifact
  workshop.

## Recommended Path
1. Open `docs/CODEX_SESSION_STARTER.md` and paste the recommended prompt into Codex.
   Use this even if the product idea feels clear already.
2. Keep `docs/CONTEXT_ENGINEERING.md` and this file open while Codex works.
3. Use `docs/BOOTSTRAP_ARTIFACT_WORKSHOP.md` if Codex needs more structure for the
   manifesto, charter, stack decision, decision log, and work tracking.
4. Review the drafted files and replace incorrect assumptions.
5. Only then move into feature work.

## Complete These Artifacts
1. Rewrite `README.md` and `docs/START_HERE.md`.
   Done when: the first files a newcomer opens describe the real project and current
   workflow instead of the generated draft state.
2. Rewrite `docs/PROJECT_MANIFESTO.md`.
   Done when: a new contributor can explain why the project exists and what it will
   not do yet.
3. Rewrite `docs/PROJECT_CHARTER.md`.
   Done when: scope, users, success metrics, and non-goals are explicit.
4. Rewrite `docs/TECH_STACK_SELECTION.md`.
   Done when: the real implementation stack and verification path are named, even if
   some decisions are provisional.
5. Review `docs/DECISIONS.md`.
   Done when: it contains project-specific decisions rather than template history.
6. Update `work/items/BOOTSTRAP-001-initialize-project.md` and `work/ACTIVE_TASKS.md`.
   Done when: another contributor can see the next real task without chat history.

## Skip Path
Skipping bootstrap is allowed, but do it deliberately.
- Tell Codex explicitly that you are skipping bootstrap for now.
- Require Codex to warn once about the risk of missing manifesto and charter context.
- Require Codex to record assumptions, unresolved product questions, and follow-up
  bootstrap debt in `work/`.
- Revisit the skipped artifacts before broadening scope or adding collaborators.

## Current Setup Commands
If you want to keep the template's maintenance stack temporarily, use these commands.

macOS/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
```

Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
```

Default verification while the maintenance stack is still in place:

```text
ruff format .
ruff check .
pytest -q
python scripts/run_prompt_evals.py
python scripts/newcomer_smoke_test.py
```

## Before The First Feature
- Work through `docs/REPO_BOOTSTRAP_CHECKLIST.md`.
- Choose a Git publish path. If the repo is protected, shared, or public, use
  short-lived PR branches. If it is private, solo, and unprotected, direct commits
  to `main` can be fine. See `docs/GIT_WORKFLOW.md`.
- Add at least one real decision entry in `docs/DECISIONS.md`.
- Make sure `work/ACTIVE_TASKS.md` points at the first product slice, not only
  bootstrap cleanup.
