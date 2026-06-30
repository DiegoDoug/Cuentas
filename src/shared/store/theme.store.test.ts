import { beforeEach, describe, expect, it } from 'vitest';

import { useThemeStore } from './theme.store';

describe('theme store', () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: 'light' });
  });

  it('defaults to the light theme', () => {
    expect(useThemeStore.getState().theme).toBe('light');
  });

  it('sets an explicit theme', () => {
    useThemeStore.getState().setTheme('dark');
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('toggles between light and dark', () => {
    const { toggleTheme } = useThemeStore.getState();

    toggleTheme();
    expect(useThemeStore.getState().theme).toBe('dark');

    toggleTheme();
    expect(useThemeStore.getState().theme).toBe('light');
  });
});
