'use client';

import React from 'react';
import tw from '@/utils/tw';

export interface LegendProps {
  color: string;
  text: string;
  className?: string;
}

export function Legend({ color, text, className }: LegendProps) {
  return (
    <div className={tw('flex items-center gap-2 sm:gap-3', className)}>
      <div className={tw('w-4 h-4 sm:w-5 sm:h-5 rounded-full', color)}></div>
      <span className="text-sm sm:text-md text-primary-black dark:text-primary-white">{text}</span>
    </div>
  );
}
