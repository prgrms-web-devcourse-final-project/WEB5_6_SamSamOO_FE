import { Message } from '@/types/chat';
import { useEffect, useRef } from 'react';

export function useAutoScroll(dependencies: [Message[], boolean]) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // DOM 업데이트 후 스크롤되도록 약간의 지연 추가
    const scrollToBottom = () => {
      if (scrollRef.current) {
        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth', // 부드러운 스크롤
          });
        });
      }
    };

    scrollToBottom();
  }, dependencies);

  return scrollRef;
}
