# Vercel Plugin

This is a repo-local Codex plugin scaffold for Vercel workflows.

## What is included

- `.codex-plugin/plugin.json` manifest
- Marketplace registration via `.agents/plugins/marketplace.json`
- `skills/vercel-deploy-check/SKILL.md` for Vercel deployment readiness reviews

## What it can do now

- Review a Next.js app for Vercel deployment readiness
- Check required production environment variables
- Summarize blockers before deployment

## Suggested next steps

1. Replace placeholder author and repository fields in `.codex-plugin/plugin.json`.
2. Add `hooks`, `scripts`, or `.mcp.json` if you want this plugin to execute automated Vercel actions.
3. Refresh plugin discovery in Codex and test the `vercel-deploy-check` skill.
