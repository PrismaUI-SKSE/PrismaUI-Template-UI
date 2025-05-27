import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes';
import { useDevToolsStore } from '@/stores/dev-tools';

export const App = () => {
  useEffect(() => {
    const onKeyDown = () => {};

    if (import.meta.env.DEV) {
      document.body.classList.add('bg-background', 'bg-no-repeat', 'bg-cover', 'bg-center');

      window.addEventListener('keydown', onKeyDown);
    }

    const onError = (e: ErrorEvent) => {
      useDevToolsStore.getState().addToHistory({
        type: 'error',
        name: e.error.toString(),
        data: e.error.stack,
        creationDate: Date.now(),
      });
    };

    window.addEventListener('error', onError);

    return () => {
      window.removeEventListener('error', onError);

      if (import.meta.env.DEV) {
        window.removeEventListener('keydown', onKeyDown);
      }
    };
  }, []);

  return <RouterProvider router={router} />;
};
