import type { JSX } from 'react';

/**
 * Routing-ready placeholder.
 *
 * Stage 0 establishes the structure only. A router library and the real route
 * table (dashboard, accounts, transactions, budgets, settings, …) will be
 * wired here once those domains begin implementation. No domain is imported yet
 * to keep the presentation layer free of feature coupling.
 */
export function AppRouter(): JSX.Element {
  return (
    <section aria-label="Application content">
      <p>Cuentas v2 scaffold is ready.</p>
    </section>
  );
}
