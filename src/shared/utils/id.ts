/**
 * Identifier generation. Entity ids are UUID v4 so they are globally unique
 * and safe to generate offline on any device (docs/03_DATA_LAYER.md §14).
 */

/** Generate a new UUID v4 string. */
export const generateId = (): string => crypto.randomUUID();
