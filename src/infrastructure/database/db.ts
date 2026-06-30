import Dexie, { type Table } from 'dexie';

import { DATABASE_NAME, type MetaRecord, schemaVersions } from './schema';

/**
 * The Cuentas IndexedDB database (via Dexie).
 *
 * This is the single source of truth for persistent business data
 * (docs/03_DATA_LAYER.md §3). The UI never touches it directly — access flows
 * through repositories only (docs/02_ARCHITECTURE.md §13).
 */
export class CuentasDatabase extends Dexie {
  readonly meta!: Table<MetaRecord, string>;

  constructor(name: string = DATABASE_NAME) {
    super(name);
    for (const { version, stores } of schemaVersions) {
      this.version(version).stores(stores);
    }
  }
}

/** Shared application-wide database instance. */
export const db = new CuentasDatabase();
