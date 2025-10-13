import { useEffect } from 'react';

const MAX_HEIGHT = 300;

export default function useTextAreaHeight(
  value: string,
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>,
  maxHeight: number = MAX_HEIGHT,
) {
  useEffect(() => {
    const ta = textAreaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    const needed = ta.scrollHeight;
    const height = Math.min(needed, maxHeight);
    ta.style.height = `${height}px`;
    ta.style.overflowY = needed > maxHeight ? 'auto' : 'hidden';
  }, [value, maxHeight, textAreaRef]);
}
