# Contributing
*Version:* v1.0  
*Date:* 2026-04-18  
*Last reviewed:* 2026-04-18

Insight Tracker is maintained as a product repo with Codex as the primary coding
partner. Keep changes small, reviewable, and grounded in the repo rather than chat.

## Preferred workflow
1. Read `README.md`, `docs/START_HERE.md`, and `AGENTS.md`.
2. Tighten the spec first if scope or intent is unclear.
3. Update `work/` for non-trivial or multi-step work.
4. Make the smallest useful change that moves the product forward.
5. Update docs, tests, and task state in the same diff when behavior changes.
6. Run verification and report gaps honestly.

## Local setup
macOS/Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
pre-commit install
```

Windows (PowerShell):

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
pre-commit install
```

## Verification
```text
ruff format .
ruff check .
pytest -q
python scripts/check_repo.py
```

## Change expectations
- Product behavior changes require updated docs and tests.
- Security or data-flow changes require `docs/GUARDRAILS.md` review.
- Meaningful progress must be reflected in `work/`.
- Material edits to Markdown guidance files require updated version and review stamps.
