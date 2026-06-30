import { palette } from '../tokens';
import type { Theme } from './types';

/** Dark theme. Maps primitive palette → semantic tokens. */
export const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: palette.neutral[950],
    surface: palette.neutral[900],
    surfaceMuted: palette.neutral[800],
    border: palette.neutral[700],
    borderStrong: palette.neutral[600],

    textPrimary: palette.neutral[50],
    textSecondary: palette.neutral[400],
    textInverse: palette.neutral[900],

    primary: palette.primary[400],
    primaryHover: palette.primary[300],
    primaryActive: palette.primary[200],
    onPrimary: palette.neutral[950],

    success: palette.success[500],
    warning: palette.warning[500],
    danger: palette.danger[500],
    info: palette.info[500],

    focusRing: palette.primary[300],
  },
};
