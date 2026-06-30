> Project: **Cuentas**
>
> Version: 2.0
>
> Status: Data Layer Specification
>
> This document defines the complete data architecture of Cuentas Version 2, including state management, local persistence, caching, synchronization readiness, and data flow conventions.
>
> The primary objective is to create a predictable, offline-first, scalable data layer that remains independent from the UI.

---

# 1. Purpose

The Data Layer is responsible for:

- managing application state
- persisting local data
- exposing business entities
- coordinating data flow
- preparing future cloud synchronization
- minimizing unnecessary rendering
- maintaining data integrity

The Data Layer must remain independent of presentation.

---

# 2. Data Layer Overview

```
UI

↓

Application Services

↓

Repositories

↓

Local Database (Dexie)

↓

IndexedDB
```

Future architecture:

```
UI

↓

Repositories

↓

Local Database

↓

Sync Engine

↓

Cloud API
```

The UI never communicates directly with the database.

---

# 3. Source of Truth

Every piece of information must have a single source of truth.

| Data | Source |
|----------|----------------|
| Transactions | Dexie |
| Accounts | Dexie |
| Budgets | Dexie |
| Categories | Dexie |
| Settings | Dexie |
| UI Preferences | Zustand |
| Navigation State | Zustand |
| Theme | Zustand |

Duplicated ownership is forbidden.

---

# 4. Data Flow

Every user action should follow this pipeline.

```
User

↓

UI Event

↓

Validation

↓

Service

↓

Repository

↓

Dexie

↓

Store Update

↓

Selectors

↓

UI Render
```

Business rules never execute inside components.

---

# 5. Domain Ownership

Each domain owns its own data.

Example:

```
transactions

    repository

    service

    selectors

    store

    validation
```

No domain may directly manipulate another domain's persistence.

---

# 6. Zustand Guidelines

## Purpose

Zustand manages UI state and lightweight application state.

It is **not** the database.

---

## Allowed

- UI state
- filters
- selected account
- current month
- dialogs
- sidebar
- theme
- preferences
- navigation

---

## Forbidden

- duplicated transactions
- duplicated budgets
- duplicated categories
- duplicated accounts

Persistent business entities belong inside Dexie.

---

## Store Design

Each store should manage one responsibility.

Example:

```
useThemeStore()

useSettingsStore()

useNavigationStore()

useFilterStore()
```

Never create:

```
useAppStore()
```

God stores are forbidden.

---

## Store Structure

```
State

↓

Actions

↓

Selectors
```

Example:

```ts
type ThemeState = {
    theme: Theme;
}

type ThemeActions = {
    setTheme(theme: Theme): void;
}

type ThemeStore = ThemeState &
ThemeActions;
```

---

## Selectors

Always expose selectors.

Example:

```
const darkMode = useThemeStore(
    state => state.theme
)
```

Never subscribe to the whole store.

---

# 7. React Query Conventions

> React Query will be introduced only when cloud synchronization exists.

Current usage:

Minimal.

Future usage:

Server state only.

---

## React Query Responsibilities

- synchronization
- cloud fetch
- mutations
- cache invalidation
- background refresh

---

## Never Use React Query For

- local UI state
- dialogs
- forms
- local database

Dexie already owns local persistence.

---

## Query Naming

```
useTransactionsQuery()

useAccountsQuery()

useBudgetSummaryQuery()
```

---

## Mutation Naming

```
useCreateTransaction()

useUpdateBudget()

useDeleteAccount()
```

---

## Cache Keys

```
accounts

transactions

budgets

settings

analytics
```

Always use centralized key factories.

---

# 8. Dexie Conventions

Dexie is the primary persistence layer.

---

## Responsibilities

- IndexedDB access
- schema
- migrations
- transactions
- indexing

---

## Folder Structure

```
database/

    schema.ts

    db.ts

    migrations/

    seeds/
```

---

## Repository Pattern

Never expose Dexie directly.

Correct:

```
Component

↓

Repository

↓

Dexie
```

Incorrect:

```
Component

↓

Dexie
```

---

## Example Repository

```
TransactionRepository

AccountRepository

BudgetRepository

SettingsRepository
```

---

## Database Transactions

Multiple writes must use transactions.

Example:

```
Create Account

↓

Create Initial Balance

↓

Update Dashboard

↓

Commit
```

Either everything succeeds or nothing changes.

---

## Migrations

Every schema change requires:

- migration
- version bump
- migration test

---

# 9. Entity Design

Every entity should contain only domain data.

Example:

```
Transaction

Account

Category

Budget

Goal
```

Entities should never contain UI information.

Forbidden:

```
isExpanded

selected

hovered

editing
```

---

# 10. Repository Responsibilities

Repositories:

- CRUD
- filtering
- pagination
- indexing
- searching

Repositories do NOT:

- validate
- calculate
- format

---

# 11. Service Responsibilities

Services coordinate workflows.

Example:

```
Create Transaction

↓

Validate

↓

Save

↓

Recalculate Budget

↓

Refresh Dashboard
```

---

# 12. Selectors

Derived values belong inside selectors.

Examples:

```
Current Balance

Monthly Expenses

Savings Progress

Budget Remaining

Income By Month
```

Selectors should be pure.

---

# 13. Data Validation

Validation occurs before persistence.

Pipeline:

```
User

↓

Validator

↓

Service

↓

Repository

↓

Database
```

Invalid entities must never reach Dexie.

---

# 14. Synchronization Readiness

Although Version 2 is offline-first, every entity should support future synchronization.

Future fields:

```
id

createdAt

updatedAt

deletedAt

syncStatus

version

deviceId
```

This allows conflict resolution later.

---

# 15. Conflict Resolution

Future sync should support:

- local changes
- remote changes
- conflict detection
- merge strategies

Current implementation:

Not required.

Architecture:

Required.

---

# 16. Data Integrity Rules

Every mutation must preserve consistency.

Examples:

Deleting an account must never orphan transactions.

Deleting a category must reassign affected transactions.

Changing currency must update formatting consistently.

---

# 17. Error Handling

Repositories throw typed errors.

Examples:

```
DatabaseError

ValidationError

DuplicateError

MigrationError
```

Never throw generic strings.

---

# 18. Performance Rules

The data layer should:

- minimize writes
- batch updates
- index frequently queried fields
- avoid full scans
- avoid duplicated calculations

---

# 19. Testing Requirements

Repositories require:

- CRUD tests
- migration tests
- transaction tests

Selectors require:

- deterministic tests

Services require:

- workflow tests

Validation requires:

- valid cases
- invalid cases
- edge cases

---

# 20. Data Layer Checklist

Before merging:

- [ ] No UI accesses Dexie directly.
- [ ] Business entities are not duplicated.
- [ ] Every store has one responsibility.
- [ ] Repositories abstract persistence.
- [ ] Services coordinate workflows.
- [ ] Validation occurs before persistence.
- [ ] Selectors compute derived values.
- [ ] Transactions are atomic.
- [ ] Schema changes include migrations.
- [ ] State ownership is clear.

---

# 21. Final Principle

The Data Layer of **Cuentas** must remain deterministic, modular, offline-first, and synchronization-ready.

Every piece of data should have exactly one owner, every mutation should be predictable, and every architectural decision should make future expansion simpler—not harder.