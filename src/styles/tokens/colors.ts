/**
 * Primitive color palette (raw values).
 *
 * These are the lowest-level color tokens. Components and features must never
 * reference these directly — they consume *semantic* theme tokens
 * (see `src/styles/themes`). See docs/04_DESIGN_SYSTEM.md §4.
 */

export const palette = {
  // Brand
  primary: {
    50: '#eef4ff',
    100: '#d9e6ff',
    200: '#bcd3ff',
    300: '#8eb6ff',
    400: '#598dff',
    500: '#3366ff',
    600: '#1f47f5',
    700: '#1836e1',
    800: '#1a2fb6',
    900: '#1b2e8f',
  },
  secondary: {
    50: '#f3f1ff',
    100: '#e9e4ff',
    200: '#d5ccff',
    300: '#b6a5ff',
    400: '#9170ff',
    500: '#6f42ff',
    600: '#5f29f7',
    700: '#511ce3',
    800: '#4419bf',
    900: '#39189c',
  },
  // Neutrals
  neutral: {
    0: '#ffffff',
    50: '#f7f8fa',
    100: '#eef0f4',
    200: '#dfe3ea',
    300: '#c6ccd8',
    400: '#9aa3b4',
    500: '#6b7488',
    600: '#4c5468',
    700: '#363d4e',
    800: '#222838',
    900: '#141823',
    950: '#0b0e16',
  },
  // Semantic hues
  success: {
    50: '#ecfdf3',
    100: '#d1fadf',
    500: '#12b76a',
    600: '#039855',
    700: '#027a48',
  },
  warning: {
    50: '#fffaeb',
    100: '#fef0c7',
    500: '#f79009',
    600: '#dc6803',
    700: '#b54708',
  },
  danger: {
    50: '#fef3f2',
    100: '#fee4e2',
    500: '#f04438',
    600: '#d92d20',
    700: '#b42318',
  },
  info: {
    50: '#eff8ff',
    100: '#d1e9ff',
    500: '#2e90fa',
    600: '#1570ef',
    700: '#175cd3',
  },
} as const;

export type Palette = typeof palette;
