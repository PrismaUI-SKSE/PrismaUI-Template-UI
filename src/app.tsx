import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/routes';

import { useDevToolsStore } from './stores';

export const App = () => {
  useEffect(() => {
    setTimeout(() => {
      const texturePreloader = document.querySelector('#texture-preloader') as HTMLElement;

      texturePreloader.style.display = 'none';
    }, 100);

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
    };
  }, []);

  return <RouterProvider router={router} />;
};
