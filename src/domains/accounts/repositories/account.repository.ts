import { ACCOUNTS_TABLE, db, getOrCreateDeviceId } from '@/infrastructure/database';
import { DexieRepository } from '@/infrastructure/repositories';

import type { Account } from '../types';

/**
 * Persistence for the accounts domain.
 *
 * Extends the generic {@link DexieRepository} for lifecycle handling and adds
 * the domain-specific lookups the service needs. Repositories only read/write —
 * they never validate or calculate (docs/03_DATA_LAYER.md §10).
 */
export class AccountRepository extends DexieRepository<Account> {
  /**
   * Find an active account whose name matches `name` case-insensitively, if any.
   * Used to enforce the unique-name rule in the service.
   */
  async findByName(name: string): Promise<Account | undefined> {
    const target = name.trim().toLowerCase();
    const matches = await this.run(() =>
      this.table
        .filter((account) => account.deletedAt === null && account.name.toLowerCase() === target)
        .toArray(),
    );
    return matches[0];
  }
}

let repositoryPromise: Promise<AccountRepository> | undefined;

/**
 * Resolve the shared {@link AccountRepository}, lazily binding it to this
 * installation's device id on first use. The promise is cached so the device id
 * is read only once.
 */
export const getAccountRepository = (): Promise<AccountRepository> => {
  repositoryPromise ??= (async (): Promise<AccountRepository> => {
    const deviceId = await getOrCreateDeviceId(db);
    return new AccountRepository(db.table<Account, string>(ACCOUNTS_TABLE), deviceId);
  })();
  return repositoryPromise;
};
