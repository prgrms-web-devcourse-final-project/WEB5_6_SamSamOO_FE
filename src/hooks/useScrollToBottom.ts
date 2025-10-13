import { useEffect, useState, useCallback } from 'react';

interface UseScrollToBottomProps {
  autoScrollRef: React.RefObject<HTMLDivElement | null>;
  threshold?: number;
  enabled?: boolean; // 활성화 여부 추가
}

export function useScrollToBottom({
  autoScrollRef,
  threshold = 100,
  enabled = true, // 기본값 true
}: UseScrollToBottomProps) {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = useCallback(() => {
    if (!enabled) return; // 비활성화 시 동작 안 함

    const scrollElement = autoScrollRef.current;
    if (!scrollElement) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    setShowButton(distanceFromBottom > threshold);
  }, [enabled, threshold, autoScrollRef]);

  useEffect(() => {
    if (!enabled) {
      setShowButton(false);
      return;
    }

    const scrollElement = autoScrollRef.current;

    if (!scrollElement) return;

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    const timeoutId = setTimeout(handleScroll, 100);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
      setShowButton(false);
    };
  }, [enabled, handleScroll, autoScrollRef]);

  const scrollToBottom = useCallback(() => {
    if (!enabled) return;

    const scrollElement = autoScrollRef.current;
    if (!scrollElement) return;

    scrollElement.scrollTo({
      top: scrollElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [enabled, autoScrollRef]);

  return { showButton, scrollToBottom };
}
