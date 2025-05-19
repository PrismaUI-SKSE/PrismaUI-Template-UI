import { create } from 'zustand';

/* --------- App Store --------- */
export type AppStore = {
  visibility: {
    hud: boolean;
    devtools: boolean;
  };
  setVisibility: (component: keyof AppStore['visibility'], visibility: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  visibility: {
    hud: false,
    devtools: false,
  },
  setVisibility: (component, visibility) =>
    set((state) => ({ visibility: { ...state.visibility, [component]: visibility } })),
}));

/* --------- DevTools Store --------- */
export type DevToolsEvent =
  | {
      type: 'invoke';
      listeners: number;
      name: string;
      data?: string;
      creationDate: number;
    }
  | {
      type: 'send_to_skse';
      name: string;
      data?: string;
      creationDate: number;
    }
  | {
      type: 'error';
      name: string;
      data: string;
      creationDate: number;
    };

export type DevToolsStore = {
  history: DevToolsEvent[];
  addToHistory: (data: DevToolsEvent) => void;
  clearHistory: () => void;
};

export const useDevToolsStore = create<DevToolsStore>((set) => ({
  history: [],
  addToHistory: (event) => set((state) => ({ history: [...state.history, event] })),
  clearHistory: () => set(() => ({ history: [] })),
}));
