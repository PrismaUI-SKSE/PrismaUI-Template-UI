import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import { ClassNames } from '@/types';
import { cn } from '@/utils/styles';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  enableOverlayClose?: boolean;
  classNames?: ClassNames<'overlay' | 'wrapper'>;
  onClose: () => void;
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return { isOpen, open, close };
};

export const Modal = ({ isOpen, children, ...other }: ModalProps) => (
  <AnimatePresence>
    {isOpen ? <ModalContent {...{ ...other }}>{children}</ModalContent> : null}
  </AnimatePresence>
);

const ModalContent = ({
  children,
  enableOverlayClose,
  classNames,
  onClose,
}: Omit<ModalProps, 'isOpen'>) => {
  const close = () => {
    onClose();
  };

  return createPortal(
    <motion.div
      animate={{ opacity: 1 }}
      className={cn('fixed w-screen h-screen top-0 left-0 bg-black/75', classNames?.overlay)}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={enableOverlayClose ? close : undefined}
    >
      <motion.div
        animate={{ transform: 'translate(-50%, -50%) translateY(0)' }}
        className={cn(
          'absolute-center bg-black/75 p-5 text-white max-w-[600px]',
          classNames?.wrapper
        )}
        exit={{ transform: 'translate(-50%, -50%) translateY(200px)' }}
        initial={{ transform: 'translate(-50%, -50%) translateY(200px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>,
    document.body
  );
};
