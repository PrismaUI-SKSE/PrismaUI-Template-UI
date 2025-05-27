import { format } from 'date-fns';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

import { SKSE_API } from '@/lib/skse-api';
import { useDevToolsStore } from '@/stores/dev-tools';
import { cn } from '@/utils/styles';

export const DevTools = () => {
  const { history, clearHistory } = useDevToolsStore();
  const [invokeData, setInvokeData] = useState({ name: '', data: '' });
  const [skseData, setSKSEData] = useState({ name: '', data: '' });
  const historyAreaRef = useRef<HTMLDivElement | null>(null);

  const invoke = () => {
    const { name, data: args } = invokeData;

    if (!name) return;

    if (args) {
      eval(`window.SKSE_API.call('${name}', ${args});`);
    } else {
      eval(`window.SKSE_API.call('${name}');`);
    }
  };

  const sendToSKSE = () => {
    const { name, data } = skseData;

    if (!name) return;

    SKSE_API.sendToSKSE(name, data);
  };

  const clear = () => {
    clearHistory();
  };

  useEffect(() => {
    if (historyAreaRef && historyAreaRef.current) {
      const { current } = historyAreaRef;

      current.scrollTop = current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="fixed right-0 top-0 h-screen z-[999]">
      <motion.div
        animate={{ transform: 'translateX(0)' }}
        className="relative bg-black/90 flex flex-col p-2 pt-0 text-xs h-full"
        exit={{ transform: 'translateX(100%)' }}
        initial={{ transform: 'translateX(100%)' }}
      >
        <div className="text-white flex justify-between py-1 text-md font-bold">
          <span>PrismaUI DevTools by Stark</span>
        </div>
        <div className="flex flex-col w-[500px] h-full gap-y-2">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-x-2 h-5">
              <input
                className="size-full bg-transparent border px-1 outline-none text-white"
                placeholder="Event Name"
                type="text"
                onChange={(e) => setInvokeData((prev) => ({ ...prev, name: e.target.value }))}
                value={invokeData.name}
              />
              <input
                className="size-full bg-transparent border px-1 outline-none text-white"
                placeholder="Arguments"
                type="text"
                onChange={(e) => setInvokeData((prev) => ({ ...prev, data: e.target.value }))}
                value={invokeData.data}
              />
              <button
                onClick={invoke}
                className="bg-slate-300 px-2 h-5 flex-[1_0_auto] w-[140px] hover:bg-slate-400 active:scale-95"
              >
                Invoke
              </button>
            </div>
            <div className="flex gap-x-2 h-5">
              <input
                className="size-full bg-transparent border px-1 outline-none text-white"
                placeholder="Method Name"
                type="text"
                onChange={(e) => setSKSEData((prev) => ({ ...prev, name: e.target.value }))}
                value={skseData.name}
              />
              <input
                className="size-full bg-transparent border px-1 outline-none text-white"
                placeholder="String Data"
                type="text"
                onChange={(e) => setSKSEData((prev) => ({ ...prev, data: e.target.value }))}
                value={skseData.data}
              />
              <button
                onClick={sendToSKSE}
                className="bg-slate-300 px-2 h-5 flex-[1_0_auto] w-[140px] hover:bg-slate-400 active:scale-95"
              >
                Send to SKSE
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium">Total Events: {history.length}</span>
              <button
                onClick={clear}
                className="bg-slate-300 px-2 h-5 w-[140px] hover:bg-slate-400 active:scale-95"
              >
                Clear events
              </button>
            </div>
          </div>
          <div className="w-full h-full border border-slate-600 text-white relative">
            <div
              ref={historyAreaRef}
              className="absolute scroll-smooth left-0 top-0 size-full p-1 overflow-y-auto overflow-x-hidden gap-y-[2px] flex flex-col"
            >
              {history.map((event, index) => (
                <motion.div
                  initial={{ backgroundColor: 'rgb(255 255 255 / 0.25)' }}
                  animate={{ backgroundColor: 'rgb(0 0 0 / 0.5)' }}
                  className="flex flex-wrap gap-1 p-1  hover:!bg-slate-800"
                  key={index}
                >
                  <span>{format(event.creationDate, 'HH:mm:ss')}</span>
                  <span
                    className={cn(
                      'px-1 font-semibold text-black uppercase',
                      event.type === 'invoke' && 'bg-amber-400',
                      event.type === 'send_to_skse' && 'bg-sky-600 text-white',
                      event.type === 'error' && 'bg-red-800 text-white'
                    )}
                  >
                    {event.type}
                    {event.type === 'invoke' ? ` [${event.listeners}]` : null}
                  </span>
                  <span
                    className={cn(
                      'bg-purple-600 px-1 font-semibold',
                      event.type === 'error' && 'bg-red-800 text-white'
                    )}
                  >
                    {event.name}
                  </span>
                  {event.data ? (
                    <span
                      className={cn(
                        'bg-green-600 px-1 font-semibold',
                        event.type === 'error' && 'bg-red-800 text-white'
                      )}
                    >
                      {event.data}
                    </span>
                  ) : null}
                </motion.div>
              ))}
              {history.length === 0 ? (
                <span className="absolute-center text-center text-gray-400">No data</span>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
