import { SKSE_API } from '@/lib/skse-api';
import { useAppStore } from '@/stores/app';

export const initSubscribers = () => {
  // Show/Hide DevTools
  SKSE_API.subscribe('set_devtools_visibility', (visibility: boolean) => {
    useAppStore.getState().setVisibility('devtools', visibility);
  });

  // Show/Hide HUD
  SKSE_API.subscribe('set_hud_visibility', (visibility: boolean) => {
    useAppStore.getState().setVisibility('hud', visibility);
  });
};
