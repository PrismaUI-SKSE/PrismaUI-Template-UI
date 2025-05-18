import { Modal, useModal } from '@/components/modal';
import { useAppStore } from '@/stores';

export const DevTools = () => {
  const { setVisibility, visibility } = useAppStore();
  const { isOpen, close, open: openModal } = useModal();

  return (
    <div className="fixed right-1 top-1 bg-slate-700 flex flex-col gap-y-2 p-3 rounded">
      <span className="text-center text-white">DevTools</span>
      <button
        className="bg-slate-300 px-2 h-5 rounded text-xs hover:bg-slate-400 active:scale-95"
        onClick={() => setVisibility('hud', !visibility.hud)}
      >
        {visibility.hud ? 'Hide' : 'Show'} HUD
      </button>
      <button
        className="bg-slate-300 px-2 h-5 rounded text-xs hover:bg-slate-400 active:scale-95"
        onClick={openModal}
      >
        Trigger Modal
      </button>

      <Modal
        classNames={{ wrapper: 'flex flex-col gap-y-6' }}
        enableOverlayClose
        isOpen={isOpen}
        onClose={close}
      >
        Test animate modal from {'<Modal />'} component
        <div className="flex-center w-full">
          <button className="border px-6 h-8 inline-block" onClick={close}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
