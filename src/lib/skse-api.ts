import { useDevToolsStore } from '@/stores';

const listeners: { eventName: string; callback: (...args: any[]) => any }[] = [];

export const SKSE_API = {
  init: () => {
    window.SKSE_API = {
      call: (eventName: string, ...args: any[]) => {
        const filtered = listeners.filter((listener) => listener.eventName === eventName);

        for (const listener of filtered) {
          listener.callback(...args);
        }

        useDevToolsStore.getState().addToHistory({
          type: 'invoke',
          name: eventName,
          data: args.toString(),
          listeners: filtered.length,
          creationDate: Date.now(),
        });
      },
    };
  },
  subscribe: (eventName: string, callback: (...args: any[]) => any) => {
    if (!window.SKSE_API) {
      throw new Error("Global SKSE_API doesn't exist!");
    }

    listeners.push({ eventName, callback });
  },
  unsubscribe: (eventName: string, callback: (...args: any[]) => any) => {
    if (!window.SKSE_API) {
      throw new Error("Global SKSE_API doesn't exist!");
    }

    const index = listeners.indexOf({ eventName, callback });

    listeners.splice(index, 1);
  },
  sendToSKSE: (fnName: string, data?: string) => {
    try {
      // @ts-ignore
      window[fnName](data);
    } catch {
      /* empty */
    }

    useDevToolsStore.getState().addToHistory({
      type: 'send_to_skse',
      name: fnName,
      data,
      creationDate: Date.now(),
    });
  },
};
