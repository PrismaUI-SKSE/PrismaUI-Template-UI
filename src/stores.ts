import { create } from 'zustand';

export type AppStore = {
  visibility: {
    hud: boolean;
  };
  setVisibility: (component: keyof AppStore['visibility'], visibility: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  visibility: {
    hud: false,
  },
  setVisibility: (component, visibility) =>
    set((state) => ({ visibility: { ...state.visibility, [component]: visibility } })),
}));
