import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

import browserBackground from '@/assets/images/browser-background.png';
import { DevTools } from '@/components/dev-tools';
import { HUD } from '@/components/hud';
import { Preview } from '@/components/preview';
import { useAppStore } from '@/stores/app';
import { useDevToolsStore } from '@/stores/dev-tools';

export const App = () => {
  const { visibility } = useAppStore();

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

  return (
    <>
      {import.meta.env.DEV ? <Preview /> : null}

      <AnimatePresence>
        {visibility.hud ? <HUD /> : null}
        {visibility.devtools ? <DevTools /> : null}
      </AnimatePresence>
    </>
  );
};
