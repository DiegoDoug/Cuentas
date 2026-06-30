# Accounts domain

The first financial domain. An **account** is a place the user holds money — a
bank account, a wallet, a credit line. Accounts are the anchor that later
domains reference: transactions debit/credit an account, and balances are
derived from them.

## Responsibilities

- Own the `Account` entity and its persistence (Dexie table `accounts`).
- Validate account input before it reaches the database.
- Enforce the unique-name business rule.
- Expose derived views (totals per currency, grouping by type) via pure
  selectors.

This domain depends on nothing else under `domains/` and must not be imported by
another domain (domains are isolated, `docs/02_ARCHITECTURE.md §6`).

## Public API

Consumed by the app/presentation layer through `domains/accounts`:

| Export                                   | Purpose                                  |
| ---------------------------------------- | ---------------------------------------- |
| `AccountsPage`                           | The accounts screen (route `/accounts`). |
| `useAccounts()`                          | Read + mutate accounts from the UI.      |
| `Account`, `AccountType`, input types    | Domain types.                            |
| `ACCOUNT_TYPES`, `ACCOUNT_TYPE_LABELS`   | Type enumeration and display labels.     |

## Internal structure

```
accounts/
  components/    AccountsPage · AccountForm · AccountCard · AccountsSummary
  hooks/         useAccounts (UI ↔ service bridge)
  services/      AccountService (validate → enforce rules → persist)
  repositories/  AccountRepository (extends the shared DexieRepository)
  selectors/     pure derived views
  validation/    field-keyed validation (shared by form + service)
  store/         account-ui.store (UI-only: which form is open)
  types/         Account entity + input types
```

## Data flow

The mandated pipeline (`docs/03_DATA_LAYER.md §4`):

```
AccountForm → useAccounts → AccountService → AccountRepository → Dexie
                                   ↑                                 │
                              validation                        (re-read)
                                                                     ↓
                          selectors compute derived totals → components render
```

The UI never touches Dexie directly, holds no business logic, and computes no
derived state itself.

## Business rules

- **Name**: required, trimmed, ≤ 60 characters, unique among active accounts
  (case-insensitive).
- **Type**: one of `checking · savings · cash · credit · investment`.
- **Currency**: a 3-letter ISO 4217 code (e.g. `USD`).
- **Opening balance**: an integer number of **minor units** (e.g. cents); may be
  negative (credit accounts). Entered in major units in the form and converted
  via `shared/utils/money`.
- **Delete**: soft-delete only — the row is retained for future sync.

## Money representation

Amounts are stored as integer minor units to keep arithmetic exact
(`docs/03_DATA_LAYER.md §18`). Conversion and localized formatting live in
`shared/utils/money` (`toMinorUnits`, `toMajorUnits`, `formatMoney`).

## Roadmap

- A running, transaction-aware balance once the transactions domain exists —
  `selectBalanceByCurrency` currently reflects opening balances only.
- Account archiving and reordering.
- Per-account currency formatting preferences.
