# Migrations

Schema evolution is driven by the ordered `schemaVersions` array in
`../schema.ts`. Each schema change is **additive**: append a new `SchemaVersion`
entry with the next version number and the store delta. Never edit a published
version entry — that would corrupt existing users' databases
(docs/03_DATA_LAYER.md §8).

When a version requires data transformation (not just index changes), attach a
Dexie `.upgrade()` step. Per the data layer contract, every schema change
requires:

- a new version entry (version bump)
- a migration (`.upgrade()` when data must be transformed)
- a migration test

Declared versions:

- **v1** — infrastructure `meta` table (Stage 1).
- **v2** — `accounts` table (Stage 2). Index-only addition, so no `.upgrade()`
  step is needed; the store is verified by the accounts repository/service
  tests against a fresh versioned database.

Later domain stages append their tables here.
