'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

//todo - 기능 개발 시 디바운스 적용
export default function PromptInput() {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const MAX_HEIGHT = 300;

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

  // value 변경 시(입력 시) 높이 조절
  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <form
      className="w-[100%] flex border-[0.5px] h-auto border-primary-gray1 rounded-3xl shadow-[5px_5px_0_1px_rgba(0,0,0,0.10)]"
      onSubmit={(e) => {
        e.preventDefault();
      }}
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
        <Link href={`chat/${1}`}>
          <button type="submit" className="border-1 border-primary-gray1 rounded-[50%]">
            <img
              src="/icons/arrowUpwardLight.svg"
              className="dark:hidden"
              alt="프롬프트 엔터 아이콘"
            />
            <img
              src="/icons/arrowUpwardDark.svg"
              className="hidden dark:block"
              alt="프롬프트 엔터 다크모드 아이콘"
            />
          </button>
        </Link>
      </div>
    </form>
  );
}
