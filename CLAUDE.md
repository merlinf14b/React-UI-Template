# Claude Code Instructions

## Pull Requests

After pushing a new commit to a branch that has an open PR, update the PR description to accurately reflect the current state of all changes on the branch — not just the latest commit.

---

This file provides guidance for Claude when working in this repository.

## Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Type check + build
pnpm lint             # Run ESLint
pnpm lint:fix         # ESLint with auto-fix
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
pnpm typecheck        # TypeScript type check
pnpm test             # Run unit/component tests
pnpm test:coverage    # Run tests with 100% coverage enforcement
pnpm test:e2e         # Run Playwright E2E tests
pnpm storybook        # Start Storybook (port 6006)
```

## Architecture

- **Routing**: TanStack Router with file-based routes in `src/routes/`. `src/routeTree.gen.ts` is auto-generated — never edit it manually.
- **UI**: Adobe React Spectrum — all components require a `<Provider>` wrapper (see tests for pattern).
- **Data fetching**: TanStack Query with a global `QueryClient` (staleTime: 5min, retry: 1) configured in `App.tsx`.
- **Path alias**: `@/*` maps to `./src/*`.

## Testing

- Unit/component tests: co-located `*.test.tsx` files, run with Vitest + jsdom + React Testing Library.
- E2E tests: `e2e/` directory, run with Playwright against `http://localhost:4173`.
- **100% coverage is enforced in CI** (lines, branches, functions, statements). Every new component needs full test coverage.
- Tests use `userEvent.setup()` for interactions and wrap React Spectrum components in `<Provider theme={defaultTheme} colorScheme="light">`.

## Code Style

- TypeScript strict mode with additional checks: `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`. No `any`.
- ESLint 9 flat config (`eslint.config.js`). Prettier integrated (double quotes, 2 spaces, trailing commas, semicolons, 80 char width).
- New JSX transform — no need to import React in component files.

## Pre-commit Hooks

Husky runs on every commit:

1. `lint-staged` — ESLint + Prettier on staged files
2. `typecheck` — full TypeScript check
3. `vitest related --run` — only tests related to changed files

The PostToolUse Claude hook also auto-runs ESLint + Prettier after every file write/edit.

## Security

- All dependencies pinned to exact versions (`save-exact=true`).
- `minimumReleaseAge: 20160` in `pnpm-workspace.yaml` — pnpm rejects packages published less than 14 days ago (supply chain protection). Override with `pnpm install --minimum-release-age=0` when needed.
- To exempt trusted internal packages/scopes, use `minimumReleaseAgeExclude` in `pnpm-workspace.yaml`.
- Gitleaks runs pre-commit and in CI to catch accidentally committed secrets.
- `pnpm audit --audit-level=high` runs in CI.

## Component Pattern

Each component lives in its own directory with three co-located files:

```
src/components/MyComponent/
├── MyComponent.tsx          # Component
├── MyComponent.test.tsx     # Unit/component tests
└── MyComponent.stories.tsx  # Storybook stories
```
