import { AnimatePresence } from 'motion/react';
import { Outlet } from 'react-router';

import { DevTools } from '@/components/dev-tools';
import { HUD } from '@/components/hud';
import { Preview } from '@/components/preview';
import { useAppStore } from '@/stores/app';

export const Root = () => {
  const { visibility } = useAppStore();

  return (
    <>
      {import.meta.env.DEV ? <Preview /> : null}

      {visibility.hud ? <HUD /> : null}

      <AnimatePresence>{visibility.devtools ? <DevTools /> : null}</AnimatePresence>

      <Outlet />
    </>
  );
};
