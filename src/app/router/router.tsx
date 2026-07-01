import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@/app/HomePage';
import { AccountsPage } from '@/domains/accounts';

/**
 * Application router. Routes are registered here; domain stages add their pages
 * (lazy-loaded where appropriate per docs/04_DESIGN_SYSTEM.md §19).
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/accounts',
    element: <AccountsPage />,
  },
]);
