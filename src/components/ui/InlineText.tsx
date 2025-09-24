'use client';

import { useRef } from 'react';
import InlineBlock from './InlineBlock';

import useTextSelection from '@/hooks/useTextSection';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function InlineText({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { selectedText, handleDoubleClick, handlePointerUp, handlePointerDown } =
    useTextSelection(containerRef);

  return (
    <div className="relative">
      {selectedText && <InlineBlock ref={containerRef} selectedText={selectedText} />}
      <p
        onDoubleClick={(e) => {
          handleDoubleClick(e);
        }}
        onPointerUp={(e) => {
          handlePointerUp(e);
        }}
        onPointerDown={() => {
          handlePointerDown();
        }}
        className={className}
      >
        {children}
      </p>
    </div>
  );
}
export default InlineText;
