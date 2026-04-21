# Keeping Your Project in Sync with the Template

GitHub template repositories create a **one-time copy** — there is no built-in upstream link like forks provide. Use the git remote approach below to pull in future template improvements.

## Syncing via Git Remote

Add the template as an upstream remote (one-time setup):

```bash
git remote add template https://github.com/merlinf14b/React-UI-Template.git
```

Fetch and review changes when you want to sync:

```bash
git fetch template main

# See what changed since you last synced
git log template/main --oneline -20
```

Since template files (CI workflows, config, tooling) rarely overlap with app-specific code, a merge is usually clean:

```bash
git merge template/main --allow-unrelated-histories
```

If you prefer more control, diff only the files most likely to have relevant updates before merging:

```bash
git diff HEAD template/main -- .github/ package.json tsconfig.json eslint.config.js vite.config.ts
```

## What Typically Changes

When reviewing template updates, focus on:

- **CI/CD workflows** (`.github/workflows/`) — security patches, new checks
- **Dependencies** (`package.json`) — major version bumps, new tools
- **Config files** (ESLint, TypeScript, Vite) — rule updates, new options
- **Storybook stories** (`src/stories/`) — new component showcases
- **Testing config** (`vitest.config.ts`, `playwright.config.ts`) — coverage changes
