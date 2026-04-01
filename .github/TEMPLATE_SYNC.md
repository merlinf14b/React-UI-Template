# Keeping Your Project in Sync with the Template

GitHub template repositories create a **one-time copy** — there is no built-in upstream link like forks provide. Here are strategies to keep your project updated with template improvements.

## Option 1: Automated Sync with GitHub Actions (Recommended)

Add this workflow to your downstream project:

```yaml
# .github/workflows/template-sync.yml
name: Template Sync

on:
  schedule:
    - cron: "0 0 * * 0" # Weekly on Sunday
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: AndreasAugustin/actions-template-template-sync@v6
        with:
          source_repo_path: merlinf14b/React-UI-Template
          upstream_branch: main
          pr_title: "chore: sync with upstream template"
          pr_labels: template-sync
```

This will automatically create PRs in your project when the template is updated.

## Option 2: Manual Sync via Git Remote

Add the template as an upstream remote:

```bash
# Add template as remote (one-time setup)
git remote add template https://github.com/merlinf14b/React-UI-Template.git

# Fetch template changes
git fetch template main

# Review changes
git log template/main --oneline -20

# Cherry-pick specific commits
git cherry-pick <commit-hash>

# Or merge all changes (may have conflicts)
git merge template/main --allow-unrelated-histories
```

## Option 3: Diff and Apply

Compare your project against the current template:

```bash
# Clone template to a temp directory
git clone https://github.com/merlinf14b/React-UI-Template.git /tmp/template

# Compare specific files
diff -r /tmp/template/src/stories your-project/src/stories
diff /tmp/template/.github/workflows/ci.yml your-project/.github/workflows/ci.yml
```

## What Typically Changes

When reviewing template updates, focus on:

- **CI/CD workflows** (`.github/workflows/`) — security patches, new checks
- **Dependencies** (`package.json`) — major version bumps, new tools
- **Config files** (ESLint, TypeScript, Vite) — rule updates, new options
- **Storybook stories** (`src/stories/`) — new component showcases
- **Testing config** (`vitest.config.ts`, `playwright.config.ts`) — coverage changes
