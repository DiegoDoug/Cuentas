import { type ReactNode } from 'react';

import { ThemeProvider } from './ThemeProvider';

interface AppProvidersProps {
  readonly children: ReactNode;
}

/**
 * Composition root for cross-cutting providers. Future providers (React Query
 * for cloud sync, error boundaries, i18n) are added here so the rest of the app
 * stays unaware of wiring (docs/02_ARCHITECTURE.md §3).
 */
export function AppProviders({ children }: AppProvidersProps): ReactNode {
  return <ThemeProvider>{children}</ThemeProvider>;
}
