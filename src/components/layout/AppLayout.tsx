import type { JSX, ReactNode } from 'react';

interface AppLayoutProps {
  readonly children: ReactNode;
}

/**
 * Empty application layout shell.
 *
 * Pure presentation: provides the top-level structural regions (header / main)
 * into which feature content is composed. Contains no business logic, no domain
 * imports and no state. Navigation chrome will be added as the design system
 * primitives land.
 */
export function AppLayout({ children }: AppLayoutProps): JSX.Element {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <span className="app-shell__brand">Cuentas</span>
      </header>
      <main className="app-shell__main">{children}</main>
    </div>
  );
}
