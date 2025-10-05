'use client';

import { useState } from 'react';
import CreateVote from '@/components/features/vote/CreateVote';

export default function CtaVote() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="
          mb-16
          rounded-full
          bg-brand-primary dark:bg-brand-accent
          py-2 px-8
          text-lg font-bold text-primary-white
          shadow-[0_4px_12px_rgba(0,0,0,0.15)]
          dark:shadow-[0_4px_12px_rgba(255,255,255,0.15)]
          transition-all
          hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]
          dark:hover:shadow-[0_6px_16px_rgba(255,255,255,0.25)]
          hover:brightness-110 hover:-translate-y-[3px]
          active:translate-y-0
        "
      >
        배심원단에게 물어보기✨
      </button>

      {isOpen && <CreateVote onClose={() => setIsOpen(false)} />}
    </>
  );
}
