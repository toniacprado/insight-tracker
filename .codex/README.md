# Codex Project Files
*Version:* v0.7  
*Date:* 2026-04-18  
*Last reviewed:* 2026-04-18

Use this directory for repo-shared Codex configuration and local-environment notes.

Recommended usage:
- keep `.codex/config.toml` in Git with conservative shared defaults
- document any environment setup or external service assumptions near the config
- keep network and permissions as narrow as the repo can tolerate by default
- only rely on project config in trusted repositories
- document why non-default `project_doc_max_bytes` values are chosen
