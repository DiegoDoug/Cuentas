/** Border radius tokens. See docs/04_DESIGN_SYSTEM.md §4 (Border Radius). */

export const radius = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export type Radius = typeof radius;
export type RadiusToken = keyof Radius;
