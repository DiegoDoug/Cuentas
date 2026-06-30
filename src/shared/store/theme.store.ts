import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_THEME, type ThemeName } from '@/styles/themes';

/**
 * Theme store.
 *
 * Theme is UI state, so Zustand owns it (docs/03_DATA_LAYER.md §3/§6) — never
 * Dexie. The choice is persisted to localStorage as a user *preference*, which
 * is explicitly allowed (it is not a business entity). This is a single-
 * responsibility store; God stores are forbidden.
 */

interface ThemeState {
  readonly theme: ThemeName;
}

interface ThemeActions {
  readonly setTheme: (theme: ThemeName) => void;
  readonly toggleTheme: () => void;
}

type ThemeStore = ThemeState & ThemeActions;

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: DEFAULT_THEME,
      setTheme: (theme) => {
        set({ theme });
      },
      toggleTheme: () => {
        set({ theme: get().theme === 'light' ? 'dark' : 'light' });
      },
    }),
    { name: 'cuentas:theme' },
  ),
);

// Selectors — always subscribe to the narrowest slice (docs/03_DATA_LAYER.md §6).
export const useTheme = (): ThemeName => useThemeStore((state) => state.theme);
export const useSetTheme = (): ThemeActions['setTheme'] => useThemeStore((state) => state.setTheme);
export const useToggleTheme = (): ThemeActions['toggleTheme'] =>
  useThemeStore((state) => state.toggleTheme);
