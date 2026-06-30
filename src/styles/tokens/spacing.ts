/**
 * Spacing tokens. Base unit: 4px. See docs/04_DESIGN_SYSTEM.md §4 (Spacing).
 * All layout spacing must reference these tokens — never hardcoded values.
 */

export const SPACING_BASE_PX = 4;

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
} as const;

export type Spacing = typeof spacing;
export type SpacingToken = keyof Spacing;
