'use client';

import React from 'react';
import tw from '@/utils/tw';

/**
 * Legend
 * - Tailwind 클래스 기반 색상 적용 버전
 * - 예: <Legend color="bg-blue-500" text="긍정 의견" />
 */
export interface LegendProps {
  color: string;
  text: string;
  className?: string;
}

export function Legend({ color, text, className }: LegendProps) {
  return (
    <div className={tw('flex items-center gap-3', className)}>
      <div className={tw('w-5 h-5 rounded-full', color)}></div>
      <span className="text-md text-primary-black">{text}</span>
    </div>
  );
}
