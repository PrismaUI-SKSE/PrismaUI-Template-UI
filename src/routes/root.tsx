import { Outlet } from 'react-router';

import { DevTools } from '@/components/dev-tools';
import { HUD } from '@/components/hud';
import { useAppStore } from '@/stores';

export const Root = () => {
  const { visibility } = useAppStore();

  return (
    <>
      {visibility.hud ? <HUD /> : null}

      {/* For Dev Mode only (Browser only) */}
      {import.meta.env.DEV ? <DevTools /> : null}

      <Outlet />
    </>
  );
};
