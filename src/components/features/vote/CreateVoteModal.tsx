'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoteModalStore } from '@/store/voteModalStore';
import CreateVoteForm from '@/components/forms/CreateVoteForm';
import CloseIcon from '@/assets/icons/close.svg';

/** 투표 생성·수정 모달 */
export default function CreateVoteModal() {
  const { isOpen, mode, draft, close } = useVoteModalStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  const handleMouseDown = (e: React.MouseEvent) =>
    setIsMouseDownInside(!!modalRef.current?.contains(e.target as Node));
  const handleMouseUp = (e: React.MouseEvent) => {
    const outside = modalRef.current && !modalRef.current.contains(e.target as Node);
    if (outside && !isMouseDownInside) close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="relative w-full max-w-[800px] rounded-4xl p-5 sm:p-6 bg-background-white dark:bg-background-black2 text-primary-black dark:text-primary-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex flex-col gap-6"
          >
            <CreateVoteForm
              mode={mode}
              initialData={draft}
              postId={draft?.postId}
              onClose={close}
            />

            <div className="absolute top-5 right-5 flex sm:hidden">
              <button
                aria-label="닫기"
                onClick={close}
                className="flex items-center justify-center size-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-brand-primary dark:text-primary-white scale-120" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
