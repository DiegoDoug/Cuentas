/**
 * Semantic theme contract.
 *
 * Components depend ONLY on these semantic tokens — never on the raw palette or
 * literal colors (docs/04_DESIGN_SYSTEM.md §5). A theme maps primitive tokens
 * onto meaning (background, surface, text, intent colors…), which lets the same
 * components render under light, dark, and future high-contrast themes.
 */

export type ThemeName = 'light' | 'dark';

export type ThemeColors = {
  readonly background: string;
  readonly surface: string;
  readonly surfaceMuted: string;
  readonly border: string;
  readonly borderStrong: string;

  readonly textPrimary: string;
  readonly textSecondary: string;
  readonly textInverse: string;

  readonly primary: string;
  readonly primaryHover: string;
  readonly primaryActive: string;
  readonly onPrimary: string;

  readonly success: string;
  readonly warning: string;
  readonly danger: string;
  readonly info: string;

  readonly focusRing: string;
};

export interface Theme {
  readonly name: ThemeName;
  readonly colors: ThemeColors;
}
