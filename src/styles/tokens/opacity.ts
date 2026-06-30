/** Opacity tokens for interaction states. See docs/04_DESIGN_SYSTEM.md §4 (Opacity). */

export const opacity = {
  disabled: 0.45,
  hover: 0.08,
  pressed: 0.16,
  overlay: 0.6,
} as const;

export type Opacity = typeof opacity;
export type OpacityToken = keyof Opacity;
