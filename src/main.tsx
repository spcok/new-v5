import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { PowerSyncContext } from '@powersync/react';

import './index.css';
import { useAuthStore } from './features/auth/authStore';
import { powersync } from './features/db/powersync';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // injected by the provider component
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function AppRouter() {
  const auth = useAuthStore();
  return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PowerSyncContext.Provider value={powersync}>
      <AppRouter />
    </PowerSyncContext.Provider>
  </StrictMode>,
);

