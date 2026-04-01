# React UI Template

A production-ready React SPA template with React Spectrum, TanStack ecosystem, strict TypeScript, comprehensive testing, and CI/CD.

## Tech Stack

| Category        | Technology                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Build           | [Vite](https://vite.dev)                                                                                                  |
| UI Framework    | [React 19](https://react.dev) + TypeScript (strict mode)                                                                  |
| Components      | [React Spectrum](https://react-spectrum.adobe.com) (Adobe)                                                                |
| Routing         | [TanStack Router](https://tanstack.com/router) (file-based)                                                               |
| Data Fetching   | [TanStack Query](https://tanstack.com/query)                                                                              |
| Virtualization  | [TanStack Virtual](https://tanstack.com/virtual)                                                                          |
| Tables          | [TanStack Table](https://tanstack.com/table)                                                                              |
| Forms           | [TanStack Form](https://tanstack.com/form)                                                                                |
| Unit Tests      | [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react)                                 |
| E2E Tests       | [Playwright](https://playwright.dev)                                                                                      |
| Documentation   | [Storybook](https://storybook.js.org)                                                                                     |
| Linting         | [ESLint](https://eslint.org) (flat config) + [Prettier](https://prettier.io)                                              |
| Git Hooks       | [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged)                     |
| Security        | [Gitleaks](https://gitleaks.io) (secret detection) + [CodeQL](https://codeql.github.com) (static analysis) + `pnpm audit` |
| CI/CD           | [GitHub Actions](https://github.com/features/actions)                                                                     |
| Package Manager | [pnpm](https://pnpm.io)                                                                                                   |

## Using This Template

### Create a New Project

1. Click **"Use this template"** → **"Create a new repository"** on GitHub
2. Clone your new repository
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start developing:
   ```bash
   pnpm dev
   ```

### Enable Template Mode (Maintainers)

Go to **Settings** → check **"Template repository"** to make this repo available as a template.

## Available Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `pnpm dev`             | Start Vite dev server                    |
| `pnpm build`           | Type check and build for production      |
| `pnpm preview`         | Preview production build                 |
| `pnpm lint`            | Run ESLint                               |
| `pnpm lint:fix`        | Run ESLint with auto-fix                 |
| `pnpm format`          | Format code with Prettier                |
| `pnpm format:check`    | Check formatting                         |
| `pnpm typecheck`       | Run TypeScript type checking             |
| `pnpm test`            | Run unit/component tests                 |
| `pnpm test:watch`      | Run tests in watch mode                  |
| `pnpm test:coverage`   | Run tests with 100% coverage enforcement |
| `pnpm test:e2e`        | Run Playwright E2E tests                 |
| `pnpm test:e2e:ui`     | Run E2E tests with Playwright UI         |
| `pnpm storybook`       | Start Storybook dev server               |
| `pnpm build-storybook` | Build Storybook for deployment           |

## Project Structure

```
├── .github/
│   ├── dependabot.yml          # Automated dependency updates
│   ├── TEMPLATE_SYNC.md        # Guide for syncing downstream repos
│   └── workflows/
│       ├── ci.yml              # Lint, typecheck, test (100% coverage), E2E, security
│       ├── codeql.yml          # Static security analysis
│       └── storybook.yml       # Build & deploy Storybook to GitHub Pages
├── .husky/
│   └── pre-commit              # Lint, format, typecheck, related tests
├── .storybook/                 # Storybook configuration
├── e2e/                        # Playwright E2E tests
├── public/                     # Static assets
├── src/
│   ├── components/             # Reusable components (co-located tests & stories)
│   ├── hooks/                  # Custom React hooks
│   ├── pages/                  # Page components
│   ├── routes/                 # TanStack Router file-based routes
│   └── stories/                # Showcase stories
│       ├── react-spectrum/     # React Spectrum component demos
│       └── tanstack/           # TanStack library demos
├── eslint.config.js            # ESLint flat config
├── playwright.config.ts        # Playwright E2E config
├── tsconfig.json               # TypeScript config (strict mode)
├── vite.config.ts              # Vite + TanStack Router plugin
└── vitest.config.ts            # Vitest + 100% coverage thresholds
```

## Testing Strategy

- **Unit tests** (Vitest): Co-located `*.test.tsx` files for components and pages
- **Component tests** (Vitest + RTL): Render components with providers, test interactions
- **E2E tests** (Playwright): Full browser tests for critical user flows
- **Coverage**: 100% threshold enforced in CI (lines, branches, functions, statements)
- **Pre-commit**: Lint + format + typecheck + related tests (fast feedback)

## Security

- **Gitleaks**: Pre-commit and CI secret detection prevents accidental credential commits
- **CodeQL**: Weekly static analysis scans for vulnerabilities (also runs on PRs)
- **pnpm audit**: Dependency vulnerability scanning in CI
- **Dependabot**: Automated dependency update PRs (weekly, grouped by severity)
- **Pinned versions**: All dependencies use exact versions (`save-exact=true` in `.npmrc`)

## CI/CD Pipelines

### CI (`ci.yml`)

Runs on all pushes and PRs:

- Lint + typecheck + format check
- Unit/component tests with 100% coverage
- E2E tests (Chromium)
- Security audit (pnpm audit + Gitleaks)

### Storybook (`storybook.yml`)

- Builds Storybook on all PRs
- Deploys to GitHub Pages on merge to `main`

### CodeQL (`codeql.yml`)

- Runs on PRs and weekly schedule
- JavaScript/TypeScript static security analysis

## Customizing for Your Project

When creating a new project from this template:

1. Update `package.json`: name, version, description
2. Update `README.md` with your project's information
3. Replace example components/pages with your own
4. Update `.github/dependabot.yml` reviewers
5. Configure GitHub Pages in repo Settings (for Storybook deployment)
6. Delete `src/stories/` showcase stories once you're familiar with the patterns

## Keeping in Sync with Template Updates

See [`.github/TEMPLATE_SYNC.md`](.github/TEMPLATE_SYNC.md) for strategies to pull in template improvements to your downstream projects.

## License

MIT
