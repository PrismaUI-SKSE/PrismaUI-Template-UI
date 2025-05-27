import { SKSE_API } from '@/lib/skse-api';
import { AppStore, useAppStore } from '@/stores/app';

export const initSubscribers = () => {
  SKSE_API.subscribe('set_menu_visibility', (key: keyof AppStore['visibility'], value: boolean) => {
    useAppStore.getState().setVisibility(key, value);
  });
};
