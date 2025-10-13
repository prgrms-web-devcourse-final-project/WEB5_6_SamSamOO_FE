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
    <div className={tw('flex items-center gap-3', className)}>
      <div className={tw('w-5 h-5 rounded-full', color)}></div>
      <span className="text-md text-primary-black dark:text-primary-white">{text}</span>
    </div>
  );
}
