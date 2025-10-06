'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ArrowUpward from '@/assets/icons/arrowUpward.svg';
import { useChatStore } from '@/store/useChatStore';
import { useShallow } from 'zustand/shallow';

//todo - 기능 개발 시 디바운스 적용
export default function PromptInput() {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const { roomId, addMessage } = useChatStore(
    useShallow((state) => ({ roomId: state.roomId, addMessage: state.addMessage })),
  );

  const MAX_HEIGHT = 300;

  useEffect(() => {
    if (roomId) {
      router.push(`/chat/${roomId}`);
    }
  }, [roomId]);

  // value 변경 시(입력 시) 높이 조절
  useEffect(() => {
    adjustHeight();
  }, [value]);

  const adjustHeight = () => {
    const ta = textAreaRef.current;
    if (!ta) return;
    // reset -> measure -> set
    ta.style.height = 'auto';
    const needed = ta.scrollHeight;
    const height = Math.min(needed, MAX_HEIGHT);
    ta.style.height = `${height}px`;
    ta.style.overflowY = needed > MAX_HEIGHT ? 'auto' : 'hidden';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    addMessage({ role: 'user', content: value });
    router.push(`/chat/temp-${Date.now()}`);
    setValue('');
  };

  return (
    <form
      className="w-[100%] flex border-[0.5px] h-auto border-primary-gray1 rounded-3xl shadow-[5px_5px_0_1px_rgba(0,0,0,0.10)]"
      onSubmit={handleSubmit}
    >
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full ml-6 md:text-xl text-sm text-primary-black dark:text-primary-white resize-none bg-transparent outline-none p-3"
        rows={1}
        placeholder="무엇이든 물어보세요."
        style={{ overflowY: 'hidden' }}
      />
      <div className="center-row mr-3">
        <button type="submit" className="border-1 border-primary-gray1 rounded-[50%]">
          <ArrowUpward className="text-[#406EB7] dark:text-brand-accent w-9 h-9" />
        </button>
      </div>
    </form>
  );
}
