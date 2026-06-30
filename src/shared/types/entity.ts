/**
 * Base entity contract shared by every persisted domain entity.
 *
 * Even though Version 2 is offline-first, every entity carries the metadata
 * required for future conflict-resolving synchronization
 * (docs/03_DATA_LAYER.md §14). Timestamps are epoch milliseconds so they index
 * and sort cheaply in Dexie.
 */

export type SyncStatus = 'synced' | 'pending' | 'conflict';

export interface BaseEntity {
  /** Stable unique identifier (UUID v4). */
  readonly id: string;
  /** Creation time (epoch ms). Never changes. */
  readonly createdAt: number;
  /** Last mutation time (epoch ms). */
  updatedAt: number;
  /** Soft-delete marker (epoch ms) or null when active. */
  deletedAt: number | null;
  /** Synchronization state for the future sync engine. */
  syncStatus: SyncStatus;
  /** Optimistic-concurrency version, bumped on each mutation. */
  version: number;
  /** Originating device, for multi-device conflict resolution. */
  deviceId: string;
}

/**
 * Fields a caller supplies when creating an entity — everything except the
 * lifecycle metadata that the persistence layer owns.
 */
export type EntityDraft<T extends BaseEntity> = Omit<T, keyof BaseEntity>;

/**
 * Fields a caller may change on update. `id` and `createdAt` are immutable;
 * the remaining lifecycle metadata is managed by the repository.
 */
export type EntityPatch<T extends BaseEntity> = Partial<EntityDraft<T>>;
