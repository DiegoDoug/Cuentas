import { palette } from '../tokens';
import type { Theme } from './types';

/** Light theme — default. Maps primitive palette → semantic tokens. */
export const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: palette.neutral[50],
    surface: palette.neutral[0],
    surfaceMuted: palette.neutral[100],
    border: palette.neutral[200],
    borderStrong: palette.neutral[300],

    textPrimary: palette.neutral[900],
    textSecondary: palette.neutral[500],
    textInverse: palette.neutral[0],

    primary: palette.primary[500],
    primaryHover: palette.primary[600],
    primaryActive: palette.primary[700],
    onPrimary: palette.neutral[0],

    success: palette.success[600],
    warning: palette.warning[600],
    danger: palette.danger[600],
    info: palette.info[600],

    focusRing: palette.primary[400],
  },
};
