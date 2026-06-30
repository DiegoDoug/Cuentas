import { type Table } from 'dexie';

import { DatabaseError, DuplicateError, NotFoundError } from '@/shared/errors';
import type { BaseEntity, EntityDraft, EntityPatch } from '@/shared/types';
import { generateId, now } from '@/shared/utils';

import type { Repository } from './repository';

/**
 * Dexie-backed base repository.
 *
 * Domain repositories extend this with a concrete Dexie table and gain
 * consistent lifecycle handling: id/timestamp assignment, optimistic-version
 * bumping, soft-deletes, and sync-status tracking
 * (docs/03_DATA_LAYER.md §10/§14). Raw Dexie errors are translated into the
 * project's typed errors (docs/03_DATA_LAYER.md §17).
 */
export abstract class DexieRepository<T extends BaseEntity> implements Repository<T> {
  constructor(
    protected readonly table: Table<T, string>,
    protected readonly deviceId: string,
  ) {}

  async create(draft: EntityDraft<T>): Promise<T> {
    const timestamp = now();
    const entity = {
      ...draft,
      id: generateId(),
      createdAt: timestamp,
      updatedAt: timestamp,
      deletedAt: null,
      syncStatus: 'pending',
      version: 1,
      deviceId: this.deviceId,
    } as T;

    await this.run(() => this.table.add(entity));
    return entity;
  }

  async getById(id: string): Promise<T | undefined> {
    const entity = await this.run(() => this.table.get(id));
    return entity && entity.deletedAt === null ? entity : undefined;
  }

  async getAll(): Promise<T[]> {
    return this.run(() => this.table.filter((entity) => entity.deletedAt === null).toArray());
  }

  async update(id: string, patch: EntityPatch<T>): Promise<T> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new NotFoundError(`Entity "${id}" not found in "${this.table.name}".`);
    }

    const updated: T = {
      ...existing,
      ...patch,
      updatedAt: now(),
      version: existing.version + 1,
      syncStatus: 'pending',
    };

    await this.run(() => this.table.put(updated));
    return updated;
  }

  async softDelete(id: string): Promise<void> {
    const existing = await this.getById(id);
    if (!existing) {
      throw new NotFoundError(`Entity "${id}" not found in "${this.table.name}".`);
    }

    const deleted: T = {
      ...existing,
      deletedAt: now(),
      updatedAt: now(),
      version: existing.version + 1,
      syncStatus: 'pending',
    };

    await this.run(() => this.table.put(deleted));
  }

  async hardDelete(id: string): Promise<void> {
    await this.run(() => this.table.delete(id));
  }

  async count(): Promise<number> {
    return this.run(() => this.table.filter((entity) => entity.deletedAt === null).count());
  }

  /** Execute a Dexie operation, translating failures into typed errors. */
  protected async run<R>(operation: () => Promise<R>): Promise<R> {
    try {
      return await operation();
    } catch (cause) {
      if (cause instanceof Error && cause.name === 'ConstraintError') {
        throw new DuplicateError(`Duplicate key in "${this.table.name}".`, { cause });
      }
      throw new DatabaseError(`Operation failed on "${this.table.name}".`, { cause });
    }
  }
}
