# ADR 0001 — Stage 1: Project Foundation

- Status: Accepted
- Date: 2026-06-30

## Context

The repository was specification-first: authoritative contracts in `docs/` but
no application code. Stage 1 establishes the foundation every later stage (the
financial domains) depends on, in line with the incremental, architecture-driven
process mandated by `docs/06_EXECUTION.md` and `docs/08_DEVELOPMENT_PLAYBOOK.md`.

## Problem

Before any domain can be built, the project needs a stack, a layered structure,
a design-token foundation, a persistence/state baseline, and enforceable quality
gates — assembled exactly as the contracts require so that domains "strengthen
the architecture rather than merely fit into it" (`docs/02_ARCHITECTURE.md §25`).

## Decision

Ship a foundation scaffold only (no domains):

1. **Tooling** — Vite + React 19 + TypeScript strict; ESLint (flat,
   `strictTypeChecked`, `no-explicit-any`); Prettier; Vitest + Testing Library;
   a CI workflow mirroring the quality-gate pipeline (`docs/05_QUALITY.md §16`).
   Path alias `@/ → src/` matches the import-order convention.
2. **Structure** — the full mandated tree from `docs/02_ARCHITECTURE.md §4`,
   with placeholders for directories later stages fill.
3. **Design system** — primitive tokens (color, spacing, typography, radius,
   shadow, opacity, motion, z-index), semantic light/dark themes, and a
   TS-tokens → CSS-variables bridge so the tokens stay the single source of
   truth and components reference `var(--…)` only.
4. **Data layer** — a sync-ready `BaseEntity` contract (`docs/03_DATA_LAYER.md
   §14`), typed errors, the Dexie database + versioned schema, and a generic
   `DexieRepository` base (lifecycle metadata, soft-delete, error translation).
5. **State** — a single-responsibility Zustand theme store (UI state only),
   exposed through narrow selectors.
6. **Presentation** — app root, providers, router skeleton, and the `Button`
   primitive with documentation and tests.

## Alternatives considered

- **Scaffold a domain alongside the foundation** — rejected: it would couple two
  objectives in one branch, breaking "one branch = one objective"
  (`docs/07_GIT_WORKFLOW.md §6`) and inflating review size.
- **Tailwind / CSS-in-JS instead of a token → CSS-variable bridge** — rejected:
  the contract requires tokens as the single source of truth with no hardcoded
  values; the bridge keeps that guarantee with zero extra runtime dependencies.
- **Generated DB tables for future domains** — rejected as speculative
  production code; the schema ships only the infrastructure `meta` table and
  grows additively per stage.

## Consequences

- Domains can be added without architectural rework: extend `DexieRepository`,
  add a `SchemaVersion`, compose UI from primitives, and own state via selectors.
- Quality gates (typecheck, lint, format, tests, build) all pass and run in CI.
- The PR exceeds the soft ~500-line guideline because a foundation is inherently
  broad; it remains a single, cohesive objective.
- React Query is intentionally absent until cloud sync exists
  (`docs/03_DATA_LAYER.md §7`).
