import { type ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProviders } from './providers/AppProviders';
import { router } from './router/router';

/** Application root: wires global providers around the router. */
export function App(): ReactNode {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
