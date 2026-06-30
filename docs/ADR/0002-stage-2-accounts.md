# ADR 0002 — Stage 2: Accounts Domain

- Status: Accepted
- Date: 2026-06-30

## Context

Stage 1 (ADR 0001) delivered the foundation — tooling, the layered structure,
design tokens, the Dexie/repository baseline, and quality gates — but shipped no
financial domains. Stage 2 builds the first one. Per the architecture and data
layer contracts, **Accounts** is the natural first domain: it is foundational
(transactions, budgets, and analytics all reference accounts), yet it depends on
nothing else, so it can be built in isolation and establishes the end-to-end
domain pattern every later stage repeats.

## Problem

The project needed proof that the foundation supports a complete vertical slice —
entity → validation → repository → service → selectors → state → hook →
components → page — without architectural rework, while honouring "one objective
per branch" (`docs/07_GIT_WORKFLOW.md §6`).

## Decision

Ship the **Accounts** domain as a full vertical slice:

1. **Persistence** — schema **v2** appends the `accounts` table additively
   (`&id, name, type, deletedAt`); v1 is untouched (`docs/03_DATA_LAYER.md §8`).
   The domain `AccountRepository` extends the Stage 1 `DexieRepository` and
   obtains its typed table via Dexie's generic `db.table<Account>()` accessor, so
   the `Account` type never leaks into the infrastructure layer (dependencies
   only flow downward).
2. **Domain** — an `Account` entity (domain data only), field-keyed validation
   shared by the form and the service, an `AccountService` that owns the
   unique-name rule and the validate→persist workflow, and pure selectors for
   derived totals.
3. **State** — a single-responsibility Zustand store holds UI-only form state
   (which form is open); accounts themselves live solely in Dexie and are never
   duplicated in a store (`docs/03_DATA_LAYER.md §6`).
4. **Presentation** — `Input` and `Select` design-system primitives (the minimum
   the form needs), plus `AccountsPage`, `AccountForm`, `AccountCard`, and
   `AccountsSummary`, wired to the route `/accounts`.
5. **Money** — amounts are integer minor units; conversion/formatting helpers
   added to `shared/utils` (generic, domain-agnostic).
6. **Tests** — validation, repository, service, selectors, money, the two
   primitives, and the form (67 tests total, all gates green).

## Alternatives considered

- **Type the `accounts` table on `CuentasDatabase`** — rejected: it would make
  infrastructure import the domain `Account` type, an upward dependency. Using
  `db.table<Account>()` from the domain repository keeps the layering intact.
- **A Zustand store holding the account list** — rejected: it would duplicate the
  Dexie source of truth (`docs/03_DATA_LAYER.md §6`). The hook keeps a local,
  re-read copy for rendering instead.
- **Re-validate inside the form** — rejected: validation must live in the domain
  (`docs/02_ARCHITECTURE.md §14`). The form consumes the same `validateAccount`
  the service enforces, so rules are defined once.
- **Defer UI to a later stage (domain logic only)** — rejected: "development is
  measured by working functionality" (`docs/06_EXECUTION.md §2`); a runnable
  screen proves the architecture end-to-end.

## Consequences

- The domain pattern is now concrete and copyable for transactions, budgets, etc.
- A real running balance awaits the transactions domain; `selectBalanceByCurrency`
  reflects opening balances only until then (documented in the domain README).
- Test setup now performs explicit Testing Library cleanup (`globals: false`
  doesn't auto-register it), preventing cross-test DOM leakage.
- All quality gates (typecheck, lint, format, tests, build) pass.
