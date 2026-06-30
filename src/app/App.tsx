import type { JSX } from 'react';

import { AppLayout } from '@components/layout/AppLayout';
import { AppRouter } from '@app/router/AppRouter';

/**
 * Application root.
 *
 * Composition only — the App owns no business logic and no domain state.
 * Providers (theme, query client, etc.) will be added under `app/providers`
 * as the corresponding layers are introduced.
 */
export function App(): JSX.Element {
  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
}
