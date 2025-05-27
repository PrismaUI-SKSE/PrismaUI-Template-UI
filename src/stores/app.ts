import { create } from 'zustand';

export type AppStore = {
  visibility: {
    hud: boolean;
    devtools: boolean;
  };
  setVisibility: (component: keyof AppStore['visibility'], visibility: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  visibility: {
    hud: true,
    devtools: false,
  },
  setVisibility: (component, visibility) =>
    set((state) => ({ visibility: { ...state.visibility, [component]: visibility } })),
}));
