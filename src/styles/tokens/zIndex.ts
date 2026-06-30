/** Stacking order tokens. See docs/04_DESIGN_SYSTEM.md §4 (Z-Index). */

export const zIndex = {
  base: 0,
  dropdown: 1000,
  popover: 1100,
  modal: 1200,
  toast: 1300,
  tooltip: 1400,
} as const;

export type ZIndex = typeof zIndex;
export type ZIndexToken = keyof ZIndex;
