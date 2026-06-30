import type { BaseEntity, EntityDraft, EntityPatch } from '@/shared/types';

/**
 * Generic persistence contract every domain repository fulfils.
 *
 * Repositories handle CRUD, filtering, and lifecycle metadata only — they do
 * NOT validate, calculate, or format (docs/03_DATA_LAYER.md §10). Soft-deleted
 * rows are excluded from reads.
 */
export interface Repository<T extends BaseEntity> {
  /** Persist a new entity, assigning lifecycle metadata. */
  create(draft: EntityDraft<T>): Promise<T>;
  /** Fetch one active entity by id, or `undefined` if missing/soft-deleted. */
  getById(id: string): Promise<T | undefined>;
  /** Fetch all active (non-soft-deleted) entities. */
  getAll(): Promise<T[]>;
  /** Apply a partial update to domain fields and bump version metadata. */
  update(id: string, patch: EntityPatch<T>): Promise<T>;
  /** Mark an entity deleted while retaining the row for sync. */
  softDelete(id: string): Promise<void>;
  /** Permanently remove an entity. */
  hardDelete(id: string): Promise<void>;
  /** Count active entities. */
  count(): Promise<number>;
}
