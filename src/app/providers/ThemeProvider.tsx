import { useEffect, type ReactNode } from 'react';

import { useTheme } from '@/shared/store/theme.store';
import { buildStaticTokenVariables } from '@/styles/cssVariables';
import { themes, themeToCssVariables } from '@/styles/themes';

interface ThemeProviderProps {
  readonly children: ReactNode;
}

/**
 * Applies the active theme to the document.
 *
 * Static (non-color) token variables are written once; the semantic color
 * variables are re-applied whenever the user changes theme. Components stay
 * theme-agnostic by referencing `var(--color-*)` (docs/04_DESIGN_SYSTEM.md §5).
 */
export function ThemeProvider({ children }: ThemeProviderProps): ReactNode {
  const themeName = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const staticVariables = buildStaticTokenVariables();
    for (const [name, value] of Object.entries(staticVariables)) {
      root.style.setProperty(name, value);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const colorVariables = themeToCssVariables(themes[themeName]);
    for (const [name, value] of Object.entries(colorVariables)) {
      root.style.setProperty(name, value);
    }
    root.dataset.theme = themeName;
    root.style.colorScheme = themeName;
  }, [themeName]);

  return children;
}
