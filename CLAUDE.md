# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current State

This repository is **specification-first**: it currently contains only `docs/` and a placeholder `README.md`. There is no application code, `package.json`, build, or test setup yet. The `docs/` files are binding architectural contracts that define how Cuentas Version 2 must be built **before** any implementation begins.

The "Version 1" referenced throughout the docs is a single-file React `.tsx` prototype that is **not yet in this repo**. It is the *functional* reference (what the app does), never the *architectural* reference (how it is built). When it is added, follow `docs/01_REVERSE_ENGINEERING.md`: preserve behavior, replace implementation.

When scaffolding the actual project, the docs mandate a specific stack and structure — do not improvise alternatives.

## Authority Hierarchy (read before deciding anything)

When any conflict arises, this precedence is absolute. **Existing/generated code never overrides documentation.**

1. `docs/00_SYSTEM_CONTRACT` — highest authority
2. `docs/02_ARCHITECTURE.md.md` (note the doubled `.md` in the filename)
3. `docs/03_DATA_LAYER.md`
4. `docs/04_DESIGN_SYSTEM.md`
5. `docs/05_QUALITY.md`
6. `docs/06_EXECUTION.md`
7. `docs/07_GIT_WORKFLOW.md`
8. `docs/08_DEVELOPMENT_PLAYBOOK.md`
9. The codebase

If generated code conflicts with the contract, the contract is correct and the code is wrong.

## Mandated Architecture

Layered, with dependencies flowing **strictly downward** (never upward, never circular):

```
Presentation → Application → Domain → Infrastructure → Persistence
```

- **Presentation** (`components/`, `app/`): pages, layouts, UI. Contains **no business logic**.
- **Application**: use cases, orchestration, command/query handlers.
- **Domain** (`domains/<name>/`): entities, business rules, validation, calculations — the heart of the app, framework-independent.
- **Infrastructure** (`infrastructure/`): repositories, adapters, sync.
- **Persistence**: Dexie + IndexedDB, schema, migrations.

Target `src/` layout (from `docs/02_ARCHITECTURE.md.md` §4): `app/`, `components/{ui,layout,feedback,charts}/`, `domains/<domain>/{components,hooks,services,repositories,models,types,validation,selectors,store}/`, `shared/`, `infrastructure/{database,repositories,sync,storage}/`, `styles/{tokens,themes,typography}/`, `lib/`, `tests/`, `workers/`.

### Domain-centric design
Code is organized by business capability, not technical layer. Planned domains: `accounts`, `transactions`, `budgets`, `categories`, `analytics`, `dashboard`, `settings`. Each domain owns its components, hooks, services, repositories, models, validation, selectors, and store. **Nothing outside a domain may modify its internal business rules directly.** Feature A → Feature B → Feature A dependencies are forbidden. `shared/` may never import domain logic.

## Mandated Stack & Data Flow

- **React** (functional components + hooks only; no class components) with **TypeScript strict mode** (no `any`, explicit return types on exports, discriminated unions and literal unions over enums, exhaustive switches).
- **Zustand** — UI/lightweight app state only (theme, filters, navigation, dialogs, selected account/month). One store per responsibility; `useAppStore()`-style god stores are forbidden. Always expose selectors; never subscribe to a whole store.
- **Dexie / IndexedDB** — the single source of truth for all persistent business entities (transactions, accounts, budgets, categories, settings). Offline-first; local DB is primary truth.
- **React Query** — reserved for **future** cloud sync / server state only. Do not use it for local state, forms, or local DB.

Every mutation follows this pipeline (business rules never run inside components):

```
User → UI Event → Validation → Service → Repository → Dexie → Store Update → Selectors → UI Render
```

Key data rules: UI must never touch Dexie directly (always go through a repository); repositories do CRUD/filtering/search only (no validation, calculation, or formatting); services coordinate workflows; selectors compute all derived values (derived state is never stored); validation happens before persistence; multi-write operations use atomic Dexie transactions; every schema change needs a migration + version bump + migration test. Entities hold domain data only — never UI flags like `isExpanded`/`selected`/`editing`.

## Non-Negotiable Rules (`docs/00_SYSTEM_CONTRACT` §5)

Never sacrifice architecture for speed · never knowingly add tech debt · never duplicate business or UI logic · never put business logic in UI components · no God Components or God Stores · no "temporary" code in production · no TODOs without a tracked issue/roadmap item · every feature must improve the architecture, not just fit into it.

## Working Conventions

- **Process**: every change is a single atomic "Work Unit" run through the mandatory pipeline in `docs/08_DEVELOPMENT_PLAYBOOK.md` §5 (Understand → Analyze → Design → Plan → Implement → Validate → Refactor → Test → Document → Commit → Review → Merge). Prefer small Work Units; split anything large. One active Work Unit per domain at a time.
- **Components**: 100–200 lines target; split if larger. Internal order: Imports → Types → Constants → Hooks → Derived Values → Callbacks → Effects → Render. No helper functions defined inside render.
- **Files**: one responsibility per file; one exported component/hook/service per file. Prefer many small files.
- **Naming**: `TransactionCard` (components), `useTransactionFilters` (hooks), `Transaction` (types), `TransactionRepository` (interfaces), `MAX_TRANSACTIONS` (constants), `isLoading`/`hasError`/`canEdit` (booleans).
- **Design**: all visual values come from design tokens (`styles/tokens/`); never hardcode colors, font sizes, or spacing (base unit 4px). Accessibility is mandatory. See `docs/04_DESIGN_SYSTEM.md`.
- **Errors**: throw typed errors (`DatabaseError`, `ValidationError`, `DuplicateError`, `MigrationError`), never generic strings.

## Git Workflow (`docs/07_GIT_WORKFLOW.md`)

- Simplified GitHub Flow off `main`. Branch names: `<type>/<description>` where type ∈ `feature|fix|refactor|docs|test|chore|hotfix` (e.g. `feature/transaction-domain`). Short-lived, one objective per branch.
  - Note: the active development branch for the current task is `claude/init-zyvvmd` (per task instructions); push there.
- **Conventional Commits**: `type(scope): description` (e.g. `feat(transactions): add recurring transaction support`). Each commit should compile and pass typecheck/lint/tests; one logical change per commit; no checkpoint commits.
- Sync via `git fetch origin && git rebase origin/main` before a PR. PRs use **Squash and Merge** only. Keep PRs < 300–500 changed lines.

## Quality Gates

Once tooling exists, every change must pass (target: zero errors): build → ESLint → TypeScript strict → unit tests → integration tests → accessibility → performance review. Testing pyramid ~70% unit / 20% integration / 10% E2E; test behavior, not implementation. Business logic, services, selectors, and validation require unit tests; every bug fix requires a regression test. Each domain must ship a `README.md` documenting responsibilities, public API, dependencies, business rules, and roadmap. Significant decisions are recorded as ADRs.

> **Guiding question for every change** (`docs/00_SYSTEM_CONTRACT` §19): *Will this make the project easier to evolve five years from now?* If no, reconsider.
