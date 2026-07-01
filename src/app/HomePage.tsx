import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { useTheme, useToggleTheme } from '@/shared/store/theme.store';

/**
 * Initial application screen. A minimal welcome view that exercises the
 * foundation end-to-end (design tokens, theming, the Button primitive) and
 * links into the first financial domain, Accounts.
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
        are in place — and the first financial domain, Accounts, is live.
      </p>
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Link to="/accounts">
          <Button>Manage accounts</Button>
        </Link>
        <Button variant="outline" onClick={toggleTheme}>
          Switch to {nextTheme} theme
        </Button>
      </div>
    </main>
  );
}
