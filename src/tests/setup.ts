/**
 * Global Vitest setup.
 *
 * - Registers jest-dom matchers for component tests.
 * - Installs an in-memory IndexedDB so Dexie repositories can be exercised
 *   in unit/integration tests without a real browser (docs/03_DATA_LAYER.md §19).
 */
import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';
