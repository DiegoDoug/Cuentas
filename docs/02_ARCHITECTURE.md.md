> Project: **Cuentas**
>
> Version: 2.0
>
> Status: Architecture Specification
>
> This document defines the complete architectural blueprint for Cuentas Version 2. It establishes the project structure, architectural principles, coding conventions, domain boundaries, and development standards that every contributor and AI assistant must follow.

---

# 1. Purpose

The objective of this document is to define a scalable, modular, maintainable, and production-ready frontend architecture.

The architecture must support:

- long-term evolution
- feature isolation
- offline-first capabilities
- high testability
- excellent developer experience
- incremental feature development
- future synchronization
- AI-assisted development

The architecture should remain stable even as the application grows significantly.

---

# 2. Architectural Principles

The project follows these principles.

## Single Responsibility

Every module should have one clear purpose.

---

## Separation of Concerns

UI, business logic, persistence, state management, and infrastructure must remain independent.

---

## Composition Over Inheritance

Behavior should be composed through reusable modules instead of inheritance.

---

## Feature Isolation

Features should be developed independently whenever possible.

---

## Explicit Dependencies

Dependencies should always flow downward.

```
UI
↓

Application

↓

Domain

↓

Infrastructure
```

Never the opposite.

---

## Predictable State

State should have a single owner.

Duplicated state is forbidden.

---

## Domain-Centric Design

The project structure is organized around business capabilities rather than technical layers.

---

# 3. High-Level Architecture

```
Presentation Layer

↓

Application Layer

↓

Domain Layer

↓

Infrastructure Layer

↓

Persistence Layer
```

---

## Presentation Layer

Responsible for:

- pages
- layouts
- components
- navigation
- dialogs
- UI interactions

Contains **no business logic**.

---

## Application Layer

Coordinates application workflows.

Responsibilities:

- use cases
- orchestration
- command handlers
- query handlers
- feature coordination

---

## Domain Layer

Contains:

- business rules
- entities
- value objects
- domain services
- validation
- calculations

This is the heart of the application.

---

## Infrastructure Layer

Responsible for:

- repositories
- storage
- adapters
- APIs
- synchronization
- external libraries

---

## Persistence Layer

Responsible for:

- Dexie
- IndexedDB
- migrations
- caching

---

# 4. Folder Structure

```
src/

    app/
        App.tsx
        providers/
        router/

    assets/
        fonts/
        icons/
        images/

    components/
        ui/
        layout/
        feedback/
        charts/

    domains/

        accounts/

            components/
            hooks/
            services/
            repositories/
            models/
            types/
            validation/
            selectors/
            store/

        transactions/

        budgets/

        categories/

        analytics/

        dashboard/

        settings/

    shared/

        hooks/
        utils/
        constants/
        types/
        validation/

    infrastructure/

        database/
        repositories/
        sync/
        storage/

    styles/

        tokens/
        themes/
        typography/

    lib/

    tests/

    workers/
```

---

# 5. Dependency Rules

Allowed:

```
Page

↓

Feature

↓

Shared UI

↓

Infrastructure
```

Allowed:

```
Feature

↓

Shared
```

Forbidden:

```
Shared

↓

Feature
```

Forbidden:

```
Feature A

↓

Feature B

↓

Feature A
```

Circular dependencies are prohibited.

---

# 6. Domain Design (Lightweight DDD)

Each domain owns:

- components
- hooks
- services
- selectors
- repositories
- types
- validation
- state

Example:

```
transactions/

    components/

    hooks/

    services/

    models/

    repositories/

    selectors/

    validation/

    types/

    store/
```

Nothing outside the domain may modify internal business rules directly.

---

# 7. Shared Layer

The shared layer contains only generic resources.

Allowed:

- reusable hooks
- generic utilities
- formatting
- validation helpers
- shared constants
- UI primitives

Forbidden:

- transaction logic
- account logic
- budget logic
- analytics logic

---

# 8. TypeScript Standards

Strict mode is mandatory.

Rules:

- no `any`
- no implicit any
- explicit return types for exported functions
- readonly where possible
- discriminated unions preferred
- exhaustive switch statements
- prefer interfaces for contracts
- use type aliases for compositions
- never ignore compiler errors

Enums should only be used when necessary.

Literal unions are preferred.

---

# 9. React Conventions

Use:

- Functional Components
- Hooks
- Composition
- Declarative rendering

Avoid:

- class components
- unnecessary useEffect
- derived state in state
- prop drilling
- anonymous components
- deeply nested JSX

Components should remain small.

Target:

100–200 lines.

Split if larger.

---

# 10. Component Architecture

Every component should follow:

```
Imports

Types

Constants

Hooks

Derived Values

Callbacks

Effects

Render
```

Never mix helper functions inside render.

---

# 11. Hook Conventions

Hooks should encapsulate behavior.

Hooks should never render UI.

Naming:

```
useTransactions()

useBudgets()

useDashboard()
```

Hooks should expose:

- state
- actions
- derived values

---

# 12. Services

Services contain business workflows.

Examples:

```
CalculateBalanceService

ImportTransactionsService

BudgetAnalysisService
```

Services should remain framework-independent.

---

# 13. Repositories

Repositories abstract persistence.

Never access Dexie directly from UI components.

```
UI

↓

Repository

↓

Database
```

---

# 14. Validation

Validation belongs inside domains.

Never validate inside components.

Example:

```
TransactionValidator

BudgetValidator
```

---

# 15. Error Handling

Errors should be:

- predictable
- typed
- recoverable

Unexpected exceptions should never reach the UI unhandled.

---

# 16. Naming Conventions

Components:

```
TransactionCard
```

Hooks:

```
useTransactionFilters
```

Types:

```
Transaction
```

Interfaces:

```
TransactionRepository
```

Constants:

```
MAX_TRANSACTIONS
```

Booleans:

```
isLoading

hasError

canEdit
```

Functions:

```
calculateBalance()

createBudget()

updateTransaction()
```

---

# 17. Import Order

```
React

↓

Libraries

↓

Shared

↓

Domains

↓

Relative Imports
```

Never use circular imports.

---

# 18. File Organization

One responsibility per file.

One exported component per file.

One exported hook per file.

One service per file.

Prefer many small files over large files.

---

# 19. State Ownership

Every piece of state must have exactly one owner.

Derived state should never be stored.

Instead:

```
State

↓

Selector

↓

UI
```

---

# 20. Performance Principles

Architecture should naturally minimize:

- rerenders
- duplicated state
- unnecessary effects
- expensive calculations

Selectors should compute derived values.

Memoization should be applied only when measurable.

---

# 21. Extensibility

Future additions should require minimal architectural changes.

Potential future modules include:

- Investments
- Loans
- Tax Reports
- Multi-Currency
- Bank Synchronization
- Cloud Backup
- AI Financial Advisor
- Shared Accounts
- Plugins

The architecture must already support these additions.

---

# 22. Documentation Requirements

Every domain should contain:

```
README.md
```

Documenting:

- responsibilities
- public API
- dependencies
- business rules
- future roadmap

---

# 23. Architecture Checklist

Before merging any feature, verify:

- [ ] Responsibilities are clearly separated.
- [ ] Business logic is outside UI.
- [ ] State ownership is clear.
- [ ] Dependencies flow downward.
- [ ] No circular imports exist.
- [ ] No duplicated logic exists.
- [ ] No duplicated state exists.
- [ ] Folder structure is respected.
- [ ] Naming conventions are followed.
- [ ] TypeScript rules are satisfied.
- [ ] Documentation is updated.

---

# 24. Architecture Decision Rule

When multiple implementations are possible:

Choose the one that:

1. reduces coupling
2. increases cohesion
3. minimizes future maintenance
4. improves readability
5. improves testability
6. improves scalability

Never optimize for short-term convenience.

---

# 25. Final Principle

The architecture of **Cuentas** must remain understandable by a new developer within a few hours, extensible over many years, and structured so that AI coding assistants can safely contribute without introducing architectural drift.

Every new feature should strengthen the architecture rather than merely fit into it.