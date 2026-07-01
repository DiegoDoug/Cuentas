# Domains

Each subdirectory here is an **isolated unit of business logic** owning a single
business capability (accounts, transactions, budgets, categories, analytics,
dashboard, settings — see `docs/02_ARCHITECTURE.md §6`).

## Rules

- Domains MUST NOT import from each other directly. Shared logic is extracted
  into `src/shared/`.
- `src/shared/` MUST NOT import from a domain.
- A domain never manipulates another domain's persistence.
- Dependencies flow downward only: Presentation → Application → Domain →
  Infrastructure → Persistence.

## Standard domain layout

```
domains/<domain>/
  components/      # Presentation (UI only, no business logic)
  hooks/           # Behavior encapsulation, expose state/actions/derived values
  services/        # Domain workflows (framework-independent)
  repositories/    # Persistence access (extend infrastructure base repository)
  models/          # Entities & value objects
  types/           # Domain types
  validation/      # Validators (run before persistence)
  selectors/       # Pure derived-state computations
  store/           # Zustand UI state for the domain (if needed)
  README.md        # Responsibilities, public API, dependencies, roadmap
```

## Implemented domains

- **accounts** (Stage 2) — financial accounts; the first and foundational domain
  (see [`accounts/README.md`](./accounts/README.md)). Transactions, budgets, and
  analytics will reference it in later stages.
