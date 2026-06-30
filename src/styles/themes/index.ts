import { lightTheme } from './light';
import { darkTheme } from './dark';
import type { Theme, ThemeName } from './types';

export type { Theme, ThemeColors, ThemeName } from './types';
export { lightTheme } from './light';
export { darkTheme } from './dark';

/** Registry of all available themes, keyed by name. */
export const themes: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export const DEFAULT_THEME: ThemeName = 'light';

const toKebabCase = (value: string): string =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * Convert a theme's semantic colors into CSS custom properties, e.g.
 * `textPrimary` → `--color-text-primary`. The provider applies these to the
 * document root so components can reference `var(--color-*)` and stay
 * theme-agnostic (docs/04_DESIGN_SYSTEM.md §5).
 */
export const themeToCssVariables = (theme: Theme): Record<string, string> => {
  const variables: Record<string, string> = {};
  const colors: Record<string, string> = theme.colors;
  for (const [key, value] of Object.entries(colors)) {
    variables[`--color-${toKebabCase(key)}`] = value;
  }
  return variables;
};
