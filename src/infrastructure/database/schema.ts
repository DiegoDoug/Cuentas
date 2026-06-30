/**
 * Dexie schema definition.
 *
 * The schema is expressed as an ordered list of versioned migrations. Every
 * future schema change appends a new {@link SchemaVersion} (version bump +
 * store delta) — existing entries are never edited (docs/03_DATA_LAYER.md §8).
 *
 * Stage 1 ships only an infrastructure `meta` key/value table (used for the
 * device id and stored schema metadata). Domain tables (transactions,
 * accounts, …) are introduced by their respective domain stages.
 */

export interface SchemaVersion {
  readonly version: number;
  /** Dexie store definitions: table name → indexed properties. */
  readonly stores: Readonly<Record<string, string>>;
}

export const DATABASE_NAME = 'cuentas';

export const schemaVersions: readonly SchemaVersion[] = [
  {
    version: 1,
    stores: {
      // Key/value metadata, e.g. deviceId, schemaVersion. `&key` = unique primary key.
      meta: '&key',
    },
  },
];

/** Highest declared schema version. */
export const CURRENT_SCHEMA_VERSION: number = schemaVersions.reduce(
  (max, entry) => Math.max(max, entry.version),
  0,
);

/** Shape of a row in the `meta` table. */
export interface MetaRecord {
  readonly key: string;
  readonly value: string;
}
