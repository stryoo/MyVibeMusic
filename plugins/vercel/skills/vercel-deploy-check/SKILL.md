---
name: vercel-deploy-check
description: Review a Next.js project for Vercel deployment readiness, verify required environment variables, inspect routing/build settings, and produce a concise deploy checklist.
---

# Vercel Deploy Check

Use this skill when a project is targeting Vercel and you need a practical readiness pass before deployment.

## What this skill checks

- Next.js app structure and build command
- Required environment variables for runtime and build
- Presence of `vercel.json` when custom config is used
- Common deployment blockers such as:
  - missing env vars
  - unsupported filesystem assumptions
  - local-only URLs
  - API routes relying on missing secrets
  - accidental inclusion of local artifacts

## Recommended workflow

1. Inspect `package.json`, `next.config.*`, `vercel.json`, `.env.example`, and app API routes.
2. Compare expected env vars with production env naming.
3. Run `npm run build` when the user wants verification and the environment allows it.
4. Summarize:
   - what is ready
   - what is missing
   - what the user must configure in Vercel

## Output format

Keep the result concise and deployment-oriented:

- Ready items
- Missing or risky items
- Exact env vars to add in Vercel
- Final go/no-go recommendation

## Notes

- Prefer actionable fixes over abstract advice.
- If the project already has `vercel.json`, preserve it unless there is a clear issue.
- If secrets are missing, explicitly list the missing keys instead of saying "config is missing".

