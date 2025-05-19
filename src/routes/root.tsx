import { AnimatePresence } from 'motion/react';
import { Outlet } from 'react-router';

import { DevTools } from '@/components/dev-tools';
import { HUD } from '@/components/hud';
import { useAppStore } from '@/stores';

export const Root = () => {
  const { visibility } = useAppStore();

  return (
    <>
      {visibility.hud ? <HUD /> : null}
      <AnimatePresence>{visibility.devtools ? <DevTools /> : null}</AnimatePresence>

      <Outlet />
    </>
  );
};
