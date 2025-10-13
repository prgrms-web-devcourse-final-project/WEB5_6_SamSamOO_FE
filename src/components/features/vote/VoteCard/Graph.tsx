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

  return <div className="flex flex-col items-center">{children}</div>;
}
