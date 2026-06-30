import Dexie, { type Table } from 'dexie';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { DuplicateError, NotFoundError, ValidationError } from '@/shared/errors';

import { AccountRepository } from '../repositories/account.repository';
import type { Account, CreateAccountInput } from '../types';
import { AccountService } from './account.service';

class TestDatabase extends Dexie {
  readonly accounts!: Table<Account, string>;

  constructor(name: string) {
    super(name);
    this.version(2).stores({ accounts: '&id, name, type, deletedAt' });
  }
}

const baseInput: CreateAccountInput = {
  name: 'Checking',
  type: 'checking',
  currency: 'USD',
  initialBalance: 10000,
};

let database: TestDatabase;
let service: AccountService;

beforeEach(() => {
  database = new TestDatabase(`test-${crypto.randomUUID()}`);
  service = new AccountService(new AccountRepository(database.accounts, 'test-device'));
});

afterEach(async () => {
  await database.delete();
  database.close();
});

describe('AccountService', () => {
  it('creates an account, trimming the name', async () => {
    const account = await service.create({ ...baseInput, name: '  Checking  ' });
    expect(account.name).toBe('Checking');
    expect(await service.list()).toHaveLength(1);
  });

  it('rejects invalid input with a ValidationError before persisting', async () => {
    await expect(service.create({ ...baseInput, currency: 'bad' })).rejects.toBeInstanceOf(
      ValidationError,
    );
    expect(await service.list()).toHaveLength(0);
  });

  it('rejects a duplicate name (case-insensitive)', async () => {
    await service.create(baseInput);
    await expect(service.create({ ...baseInput, name: 'checking' })).rejects.toBeInstanceOf(
      DuplicateError,
    );
  });

  it('updates domain fields', async () => {
    const created = await service.create(baseInput);
    const updated = await service.update(created.id, { initialBalance: 500, type: 'savings' });
    expect(updated.initialBalance).toBe(500);
    expect(updated.type).toBe('savings');
    expect(updated.name).toBe('Checking');
  });

  it('allows keeping the same name on update but blocks colliding with another account', async () => {
    const first = await service.create(baseInput);
    await service.create({ ...baseInput, name: 'Savings' });

    await expect(service.update(first.id, { name: 'Checking' })).resolves.toMatchObject({
      name: 'Checking',
    });
    await expect(service.update(first.id, { name: 'Savings' })).rejects.toBeInstanceOf(
      DuplicateError,
    );
  });

  it('soft-deletes an account', async () => {
    const created = await service.create(baseInput);
    await service.remove(created.id);
    expect(await service.get(created.id)).toBeUndefined();
    expect(await service.list()).toHaveLength(0);
  });

  it('throws NotFoundError when removing a missing account', async () => {
    await expect(service.remove('missing')).rejects.toBeInstanceOf(NotFoundError);
  });
});
