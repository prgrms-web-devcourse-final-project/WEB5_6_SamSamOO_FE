'use client';

import React, { useState } from 'react';
import tw from '@/utils/tw';

interface DonutChartProps {
  data: { positive: number; negative: number };
  label?: string;
  radius?: number;
  strokeWidth?: number;
  colors?: {
    positive: string;
    negative: string;
  };
  className?: string;
}

export function DonutChart({
  data,
  label,
  radius = 60,
  strokeWidth = 30,
  colors = {
    positive: 'stroke-brand-primary dark:stroke-brand-accent',
    negative: 'stroke-[#AFCFFF] dark:stroke-[#DBD3D3]',
  },
  className,
}: DonutChartProps) {
  const { positive = 0, negative = 0 } = data;
  const circumference = 2 * Math.PI * radius;
  const positiveOffset = circumference * (1 - positive / 100);
  const negativeOffset = circumference * (positive / 100);

  const [hoveredSegment, setHoveredSegment] = useState<'positive' | 'negative' | null>(null);

  return (
    <div className={tw('flex flex-col items-center relative', className)}>
      <div className="relative w-48 h-48">
        <svg
          className="w-full h-full transform -rotate-90 transition-transform duration-200"
          viewBox="0 0 200 200"
          style={{
            transform: `rotate(-90deg) ${hoveredSegment ? 'scale(1.05)' : 'scale(1)'}`,
          }}
        >
          {/* Positive 영역 */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={positiveOffset}
            strokeLinecap="butt"
            className={tw('cursor-pointer transition-opacity duration-200', colors.positive)}
            style={{ opacity: hoveredSegment === 'negative' ? 0.3 : 1 }}
            onMouseEnter={() => setHoveredSegment('positive')}
            onMouseLeave={() => setHoveredSegment(null)}
          />

          {/* Negative 영역 */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={-negativeOffset}
            strokeLinecap="butt"
            className={tw('cursor-pointer transition-opacity duration-200', colors.negative)}
            style={{ opacity: hoveredSegment === 'positive' ? 0.3 : 1 }}
            onMouseEnter={() => setHoveredSegment('negative')}
            onMouseLeave={() => setHoveredSegment(null)}
          />
        </svg>

        {/* 중앙 라벨 (항상 고정) */}
        {label && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-gray-800 dark:text-primary-white">{label}</span>
          </div>
        )}

        {/* 호버 시 해당 영역의 퍼센트만 표시 */}
        {hoveredSegment && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 text-sm px-3 py-1.5 rounded-md shadow-lg">
              {hoveredSegment === 'positive' ? `${positive}%` : `${negative}%`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
