import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import browserBackground from '@/assets/images/browser-background.png';
import { router } from '@/routes';
import { useDevToolsStore } from '@/stores/dev-tools';

import { useAppStore } from './stores/app';

export const App = () => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F4') {
        const appStore = useAppStore.getState();

        appStore.setVisibility('devtools', !appStore.visibility.devtools);
      }
    };

    if (import.meta.env.DEV) {
      document.body.classList.add('bg-no-repeat', 'bg-cover', 'bg-center');
      document.body.style.backgroundImage = `url("${browserBackground}")`;

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
