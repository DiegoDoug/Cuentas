import Dexie, { type Table } from 'dexie';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { DuplicateError, NotFoundError } from '@/shared/errors';
import type { BaseEntity } from '@/shared/types';

import { DexieRepository } from './dexie.repository';

interface SampleEntity extends BaseEntity {
  name: string;
  amount: number;
}

class TestDatabase extends Dexie {
  readonly samples!: Table<SampleEntity, string>;

  constructor(name: string) {
    super(name);
    this.version(1).stores({ samples: '&id, deletedAt' });
  }
}

class SampleRepository extends DexieRepository<SampleEntity> {
  /** Test-only: force a raw insert so error translation can be exercised. */
  insertRaw(entity: SampleEntity): Promise<string> {
    return this.run(() => this.table.add(entity));
  }
}

const DEVICE_ID = 'test-device';

let database: TestDatabase;
let repository: SampleRepository;

beforeEach(() => {
  database = new TestDatabase(`test-${crypto.randomUUID()}`);
  repository = new SampleRepository(database.samples, DEVICE_ID);
});

afterEach(async () => {
  await database.delete();
  database.close();
});

describe('DexieRepository', () => {
  it('creates an entity with full lifecycle metadata', async () => {
    const entity = await repository.create({ name: 'Coffee', amount: 4 });

    expect(entity.id).toBeTruthy();
    expect(entity.name).toBe('Coffee');
    expect(entity.amount).toBe(4);
    expect(entity.createdAt).toBe(entity.updatedAt);
    expect(entity.deletedAt).toBeNull();
    expect(entity.version).toBe(1);
    expect(entity.syncStatus).toBe('pending');
    expect(entity.deviceId).toBe(DEVICE_ID);
  });

  it('reads an active entity by id', async () => {
    const created = await repository.create({ name: 'Rent', amount: 1200 });
    const found = await repository.getById(created.id);
    expect(found?.id).toBe(created.id);
  });

  it('returns undefined for a missing id', async () => {
    expect(await repository.getById('nope')).toBeUndefined();
  });

  it('lists only active entities', async () => {
    await repository.create({ name: 'A', amount: 1 });
    const b = await repository.create({ name: 'B', amount: 2 });
    await repository.softDelete(b.id);

    const all = await repository.getAll();
    expect(all).toHaveLength(1);
    expect(all[0]?.name).toBe('A');
    expect(await repository.count()).toBe(1);
  });

  it('updates domain fields and bumps version metadata', async () => {
    const created = await repository.create({ name: 'Gym', amount: 30 });
    const updated = await repository.update(created.id, { amount: 35 });

    expect(updated.amount).toBe(35);
    expect(updated.name).toBe('Gym');
    expect(updated.version).toBe(2);
    expect(updated.updatedAt).toBeGreaterThanOrEqual(created.updatedAt);
    expect(updated.syncStatus).toBe('pending');
  });

  it('soft-deletes while retaining the row for sync', async () => {
    const created = await repository.create({ name: 'Temp', amount: 5 });
    await repository.softDelete(created.id);

    expect(await repository.getById(created.id)).toBeUndefined();
    const raw = await database.samples.get(created.id);
    expect(raw?.deletedAt).not.toBeNull();
    expect(raw?.version).toBe(2);
  });

  it('hard-deletes the row entirely', async () => {
    const created = await repository.create({ name: 'Gone', amount: 9 });
    await repository.hardDelete(created.id);
    expect(await database.samples.get(created.id)).toBeUndefined();
  });

  it('throws NotFoundError when updating a missing entity', async () => {
    await expect(repository.update('missing', { amount: 1 })).rejects.toBeInstanceOf(NotFoundError);
  });

  it('throws NotFoundError when soft-deleting a missing entity', async () => {
    await expect(repository.softDelete('missing')).rejects.toBeInstanceOf(NotFoundError);
  });

  it('translates Dexie constraint violations into DuplicateError', async () => {
    const entity = await repository.create({ name: 'Dup', amount: 1 });
    await expect(repository.insertRaw(entity)).rejects.toBeInstanceOf(DuplicateError);
  });
});
