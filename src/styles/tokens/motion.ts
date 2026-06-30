/**
 * Motion tokens. See docs/04_DESIGN_SYSTEM.md §4 (Animation) & §17.
 * No arbitrary durations — animations communicate state, never decorate.
 */

export const duration = {
  fast: '120ms',
  normal: '200ms',
  slow: '320ms',
} as const;

export const easing = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasized: 'cubic-bezier(0.3, 0, 0, 1)',
  decelerate: 'cubic-bezier(0, 0, 0, 1)',
} as const;

export type Duration = typeof duration;
export type Easing = typeof easing;
export type DurationToken = keyof Duration;
