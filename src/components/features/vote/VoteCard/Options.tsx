'use client';

import * as React from 'react';

interface OptionsProps {
  children: React.ReactNode;
}

/**
 * VoteCard.Options
 * - 투표 항목(ProgressBar 등)을 감싸는 컨테이너
 */
export default function Options({ children }: OptionsProps) {
  return <div className="flex flex-col items-center gap-5">{children}</div>;
}
