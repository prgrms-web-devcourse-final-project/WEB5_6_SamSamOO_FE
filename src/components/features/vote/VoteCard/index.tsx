'use client';

import * as React from 'react';
import HeaderBody from './HeaderBody';
import Graph from './Graph';
import Options from './Options';

interface VoteCardRootProps extends React.HTMLAttributes<HTMLDivElement> {
  status: 'ongoing' | 'closed';
  children: React.ReactNode;
}

/**
 * VoteCard (Root)
 * - 전체 카드 레이아웃 컨테이너
 * - status에 따라 하위 슬롯(Graph 등)이 조건부 렌더링됨
 * - ref 전달을 위해 forwardRef 적용
 */
const VoteCardRoot = React.forwardRef<HTMLDivElement, VoteCardRootProps>(
  ({ children, status, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-status={status}
        {...props}
        className="
          w-[800px] rounded-4xl p-6 flex flex-col gap-6
          shadow-[0_4px_20px_rgba(0,0,0,0.25)]
          hover:shadow-[0_0_40px_rgba(175,207,255,1)]
          dark:bg-background-black3
          dark:shadow-[0_0_14px_rgba(77,77,77,1)]
          dark:hover:shadow-[0_0_35px_rgba(77,77,77,1)]
          transition-shadow duration-300
        "
      >
        {children}
      </div>
    );
  },
);

VoteCardRoot.displayName = 'VoteCardRoot';

export const VoteCard = Object.assign(VoteCardRoot, {
  HeaderBody,
  Graph,
  Options,
});

export default VoteCard;
