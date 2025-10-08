'use client';

import { useRef } from 'react';
import InlineBlock from './InlineBlock';

import useTextSelection from '@/hooks/useTextSection';
import { parseMarkdown } from '@/utils/convertMarkDown';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function InlineText({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  const { selectedText, handleDoubleClick, handlePointerUp, handlePointerDown } = useTextSelection(
    containerRef,
    textRef,
  );

  const processChildren = (children: React.ReactNode): React.ReactNode => {
    if (typeof children === 'string') {
      return parseMarkdown(children);
    }

    if (Array.isArray(children)) {
      return children.map((child, index) => <span key={index}>{processChildren(child)}</span>);
    }

    return children;
  };
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
        ref={textRef}
        className={className}
      >
        {processChildren(children)}
      </p>
    </div>
  );
}
export default InlineText;
