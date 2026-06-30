# Cuentas

Offline-first personal finance application (Version 2). A modular, domain-driven
React + TypeScript app where business logic is independent of the UI and local
data is the source of truth.

> This repository is **specification-first**. The authoritative contracts live
> in [`docs/`](./docs) and always take precedence over code
> (see [`CLAUDE.md`](./CLAUDE.md) and `docs/00_SYSTEM_CONTRACT.md`).

## Status

**Stage 1 — Foundation.** This stage establishes the architecture, tooling, and
quality gates that domains build on. No financial domains ship yet.

Delivered:

- Vite + React 19 + TypeScript (strict) build with path alias `@/ → src/`.
- Mandated layered folder structure (`docs/02_ARCHITECTURE.md §4`).
- Design tokens + light/dark themes, bridged to CSS variables
  (`docs/04_DESIGN_SYSTEM.md`).
- Sync-ready entity contract, typed errors, and a generic Dexie repository base
  (`docs/03_DATA_LAYER.md`).
- Theme store (Zustand, UI state only) and the `Button` UI primitive.
- Quality gates: ESLint (strict, no `any`), Prettier, Vitest, and CI.

## Tech stack

| Concern         | Choice                                                    |
| --------------- | --------------------------------------------------------- |
| Build           | Vite                                                      |
| UI              | React 19 (functional components only)                     |
| Language        | TypeScript (strict, no `any`)                             |
| UI state        | Zustand (UI state only)                                   |
| Persistence     | Dexie / IndexedDB (single source of truth)                |
| Server state    | React Query — reserved for future cloud sync only         |
| Testing         | Vitest + Testing Library                                  |

## Getting started

```bash
npm install
npm run dev        # start the dev server
```

## Scripts

| Script                 | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server.                               |
| `npm run build`        | Type-check and build for production.                     |
| `npm run preview`      | Preview the production build.                            |
| `npm run typecheck`    | TypeScript strict check.                                 |
| `npm run lint`         | ESLint.                                                  |
| `npm run format`       | Format with Prettier (`format:check` to verify).        |
| `npm run test`         | Run the test suite (`test:watch`, `test:coverage`).     |
| `npm run verify`       | Run all quality gates in sequence.                       |

## Architecture

Dependencies flow strictly downward and domains never import one another:

```
Presentation → Application → Domain → Infrastructure → Persistence
```

```
src/
  app/              # App root, providers, router
  components/       # ui · layout · feedback · charts (presentation, no business logic)
  domains/          # isolated business capabilities (added per stage)
  shared/           # generic, domain-agnostic building blocks
  infrastructure/   # database · repositories · sync · storage
  styles/           # tokens · themes · typography
  lib/  tests/  workers/
```

See [`docs/`](./docs) for the full contracts and
[`docs/ADR/0001-stage-1-foundation.md`](./docs/ADR/0001-stage-1-foundation.md)
for the decisions behind this stage.
