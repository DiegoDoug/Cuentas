import Dexie, { type Table } from 'dexie';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { Account } from '../types';
import { AccountRepository } from './account.repository';

class TestDatabase extends Dexie {
  readonly accounts!: Table<Account, string>;

  constructor(name: string) {
    super(name);
    this.version(2).stores({ accounts: '&id, name, type, deletedAt' });
  }
}

let database: TestDatabase;
let repository: AccountRepository;

beforeEach(() => {
  database = new TestDatabase(`test-${crypto.randomUUID()}`);
  repository = new AccountRepository(database.accounts, 'test-device');
});

afterEach(async () => {
  await database.delete();
  database.close();
});

describe('AccountRepository', () => {
  it('persists domain fields with lifecycle metadata', async () => {
    const account = await repository.create({
      name: 'Checking',
      type: 'checking',
      currency: 'USD',
      initialBalance: 12345,
    });

    expect(account.id).toBeTruthy();
    expect(account.name).toBe('Checking');
    expect(account.type).toBe('checking');
    expect(account.currency).toBe('USD');
    expect(account.initialBalance).toBe(12345);
    expect(account.deletedAt).toBeNull();
    expect(account.deviceId).toBe('test-device');
  });

  it('finds an active account by name, case-insensitively', async () => {
    await repository.create({
      name: 'Savings',
      type: 'savings',
      currency: 'USD',
      initialBalance: 0,
    });
    const found = await repository.findByName('  savings  ');
    expect(found?.name).toBe('Savings');
  });

  it('does not match a soft-deleted account by name', async () => {
    const account = await repository.create({
      name: 'Old',
      type: 'cash',
      currency: 'USD',
      initialBalance: 0,
    });
    await repository.softDelete(account.id);
    expect(await repository.findByName('Old')).toBeUndefined();
  });

  it('returns undefined when no account matches', async () => {
    expect(await repository.findByName('nope')).toBeUndefined();
  });
});
