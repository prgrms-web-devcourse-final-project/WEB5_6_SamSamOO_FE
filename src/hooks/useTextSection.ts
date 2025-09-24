import { useEffect, useState } from 'react';

interface TextSelection {
  selectedText: string;
  positionX: number;
  positionY: number;
}

export default function useTextSelection(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [selectedText, setSelectedText] = useState<TextSelection | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSelectedText(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [containerRef]);

  const handleDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    const selection = getSelection();
    if (!selection) return;

    const { selectText, rect } = selection;
    setSelectedText({
      selectedText: selectText,
      positionX: rect.x === 0 ? e.clientX : rect.x,
      positionY: rect.y - rect.height,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLParagraphElement>) => {
    const selection = getSelection();
    if (!selection) return;

    const { selectText, rect } = selection;
    setSelectedText({
      selectedText: selectText,
      positionX: rect.x === 0 ? e.clientX : rect.x,
      positionY: rect.x === 0 ? rect.y : rect.y - rect.height,
    });
  };

  const handlePointerDown = () => {
    window.getSelection()?.removeAllRanges();
    setSelectedText(null);
  };

  const getSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return null;
    if (selection.anchorOffset === selection.focusOffset) return null;

    const selectText = selection.toString().trim();
    if (selectText.length === 0 || selectText === '') return null;

    const rect = selection.getRangeAt(0).getBoundingClientRect();
    console.log(rect);
    return { selectText, rect };
  };

  return { selectedText, handleDoubleClick, handlePointerUp, handlePointerDown };
}
