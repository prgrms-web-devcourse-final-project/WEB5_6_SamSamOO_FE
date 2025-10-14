'use client';

import * as React from 'react';
import HeaderBody from './HeaderBody';
import Graph from './Graph';
import Options from './Options';

/**
 * VoteCard.Root
 * - 반응형 카드 컨테이너
 * - 모바일 전체 폭, 데스크탑 최대 800px
 * - 내부 섹션(HeaderBody / Options / Graph)은 동일 폭으로 정렬됨
 */
const VoteCardRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { status: 'ongoing' | 'closed' }
>(({ children, status, className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-status={status}
      {...props}
      className={`
        w-full max-w-[800px]
        rounded-3xl sm:rounded-4xl
        p-3 sm:p-6
        flex flex-col gap-5 sm:gap-6
        shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        hover:shadow-[0_0_35px_rgba(175,207,255,0.8)]
        bg-background-white dark:bg-background-black3
        dark:shadow-[0_0_14px_rgba(77,77,77,1)]
        dark:hover:shadow-[0_0_35px_rgba(77,77,77,1)]
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
});

VoteCardRoot.displayName = 'VoteCardRoot';

export const VoteCard = Object.assign(VoteCardRoot, {
  HeaderBody,
  Graph,
  Options,
});

export default VoteCard;
