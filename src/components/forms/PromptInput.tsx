'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ArrowUpward from '@/assets/icons/arrowUpward.svg';
import { useChatStore } from '@/store/useChatStore';
import { useShallow } from 'zustand/shallow';
import useTextAreaHeight from '@/hooks/useTextareaHeight';

export default function PromptInput() {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { roomId, message, sendNewMessage, sendExistMessage } = useChatStore(
    useShallow((state) => ({
      roomId: state.roomId,
      message: state.messages,
      sendNewMessage: state.sendNewMessage,
      sendExistMessage: state.sendExistMessage,
    })),
  );
  useTextAreaHeight(value, textAreaRef);

  useEffect(() => {
    if (pathname === '/advice') {
      if (roomId && message.length > 1) {
        router.push(`/chat/${roomId}`);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    const input = value;
    setValue('');
    if (pathname === '/advice') {
      sendNewMessage(input, router);
      router.push(`/chat/first`);
    } else {
      sendExistMessage(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSubmit(e);
    }
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
        onKeyDown={handleKeyDown}
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
