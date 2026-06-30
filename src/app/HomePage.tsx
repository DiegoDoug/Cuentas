import { type ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import { useTheme, useToggleTheme } from '@/shared/store/theme.store';

/**
 * Initial application screen. A minimal welcome view that exercises the Stage 1
 * foundation end-to-end: design tokens, theming, and the Button primitive.
 * Domain pages replace/extend this in later stages.
 */
export function HomePage(): ReactNode {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-6)',
        padding: 'var(--space-8)',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)' }}>
        Cuentas
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: '42ch' }}>
        Offline-first personal finance. The architecture, design system, and persistence foundation
        are in place — financial domains come next.
      </p>
      <Button onClick={toggleTheme}>Switch to {nextTheme} theme</Button>
    </main>
  );
}
