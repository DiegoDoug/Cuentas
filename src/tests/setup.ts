/**
 * Global Vitest setup.
 *
 * - Registers jest-dom matchers for component tests.
 * - Unmounts the React tree after each test. Vitest runs with `globals: false`,
 *   so Testing Library's automatic cleanup is not registered — we do it here so
 *   renders never leak between tests.
 * - Installs an in-memory IndexedDB so Dexie repositories can be exercised
 *   in unit/integration tests without a real browser (docs/03_DATA_LAYER.md §19).
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import 'fake-indexeddb/auto';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
