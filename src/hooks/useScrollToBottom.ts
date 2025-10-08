import { useEffect, useState } from 'react';

interface UseScrollToBottomProps {
  autoScollRef: React.RefObject<HTMLDivElement | null>;
  threshold?: number; // 하단으로 간주할 임계값 (px)
}

export function useScrollToBottom({ autoScollRef, threshold = 100 }: UseScrollToBottomProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const scrollElement = autoScollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      setShowButton(distanceFromBottom > threshold);
    };

    scrollElement.addEventListener('scroll', handleScroll);

    // 초기 체크
    handleScroll();

    return () => scrollElement.removeEventListener('scroll', handleScroll);
  }, [autoScollRef, threshold]);

  const scrollToBottom = () => {
    if (autoScollRef.current) {
      autoScollRef.current.scrollTo({
        top: autoScollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return { showButton, scrollToBottom };
}
