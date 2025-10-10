'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CreateVoteForm from '../../forms/CreateVoteForm';

interface Props {
  onClose: () => void;
  onCreated?: () => void;
}

export default function CreateVote({ onClose, onCreated }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMouseDownInside, setIsMouseDownInside] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current?.contains(e.target as Node)) setIsMouseDownInside(true);
    else setIsMouseDownInside(false);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const isOutside = modalRef.current && !modalRef.current.contains(e.target as Node);
    if (isOutside && !isMouseDownInside) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="
          w-[800px] rounded-4xl p-6
          bg-background-white dark:bg-background-black2
          text-primary-black dark:text-primary-white
          shadow-[0_4px_20px_rgba(0,0,0,0.25)]
          flex flex-col gap-6
        "
      >
        <CreateVoteForm
          onClose={() => {
            onClose();
          }}
          onCreated={() => {
            if (onCreated) onCreated();
          }}
        />
      </motion.div>
    </div>
  );
}
