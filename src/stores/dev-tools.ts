import { create } from 'zustand';

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
