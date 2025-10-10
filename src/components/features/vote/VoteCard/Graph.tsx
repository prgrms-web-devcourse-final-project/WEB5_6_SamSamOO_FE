'use client';

import * as React from 'react';

interface GraphProps {
  status: 'ongoing' | 'closed';
  children: React.ReactNode;
}

/**
 * VoteCard.Graph
 * - status가 "closed"일 때만 children(GraphWrapper 등)을 렌더링
 */
export default function Graph({ status, children }: GraphProps) {
  if (status !== 'closed') return null;

  return (
    <div className="border-t border-[#a3a3a3]/40 pt-4 mt-4 flex flex-col items-center gap-6">
      {children}
    </div>
  );
}
