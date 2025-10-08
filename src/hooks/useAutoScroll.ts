import { Message } from '@/types/chat';
import { useEffect, useRef } from 'react';

export function useAutoScroll(dependencies: [Message[], boolean]) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        requestAnimationFrame(() => {
          scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth',
          });
        });
      }
    };

    scrollToBottom();
  }, dependencies);

  return scrollRef;
}
