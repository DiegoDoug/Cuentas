# Cuentas

Offline-first personal finance application — **Version 2**.

This repository is **specification-first**. The authoritative source of truth is
the [`docs/`](./docs) directory. Code is always wrong when it conflicts with the
contracts. See [`CLAUDE.md`](./CLAUDE.md) for the operational rules and the
authority hierarchy.

> Status: **Stage 0 — Scaffold.** Structure, tooling and empty modules only. No
> business features are implemented yet.

## Stack

- **React** (functional components only) + **TypeScript** (strict, no `any`)
- **Vite** — build & dev server
- **Vitest** + Testing Library — unit/component testing
- **ESLint** (typescript-eslint, strict) + **Prettier**
- Reserved, installed but unused at Stage 0: **Zustand** (UI state),
  **Dexie** (persistence, infrastructure only), **@tanstack/react-query**
  (future remote sync only)

## Architecture

Strict layered architecture; dependencies flow **downward only**:

```
Presentation → Application → Domain → Infrastructure → Persistence
```

The codebase is organized by business domain under `src/domains/<domain>`. See
[`docs/02_ARCHITECTURE.md`](./docs/02_ARCHITECTURE.md) for the full blueprint.

### Path aliases

`@app` · `@components` · `@domains` · `@shared` · `@infrastructure` · `@styles` · `@lib`

## Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the Vite dev server                 |
| `npm run build`     | Type-check and produce a production build  |
| `npm run typecheck` | Run the TypeScript compiler only          |
| `npm run lint`      | Run ESLint                                 |
| `npm run format`    | Format with Prettier                      |
| `npm test`          | Run the Vitest suite                      |

## Enforced constraints

- No business logic outside `src/domains`.
- The UI never accesses Dexie directly — only `src/infrastructure` may import Dexie (ESLint-enforced).
- `shared/` must not import from `domains/` (ESLint-enforced).
- No deep relative imports — use path aliases (ESLint-enforced).
- No `any`, no unused variables (ESLint + TypeScript strict).
