import { generateId } from '@/shared/utils';

import type { CuentasDatabase } from './db';

/** Well-known keys in the `meta` table. */
export const META_KEYS = {
  deviceId: 'deviceId',
} as const;

/**
 * Resolve this installation's stable device id, creating and persisting one on
 * first run. The device id stamps every entity for future multi-device conflict
 * resolution (docs/03_DATA_LAYER.md §14).
 */
export const getOrCreateDeviceId = async (database: CuentasDatabase): Promise<string> => {
  const existing = await database.meta.get(META_KEYS.deviceId);
  if (existing) {
    return existing.value;
  }
  const deviceId = generateId();
  await database.meta.put({ key: META_KEYS.deviceId, value: deviceId });
  return deviceId;
};
