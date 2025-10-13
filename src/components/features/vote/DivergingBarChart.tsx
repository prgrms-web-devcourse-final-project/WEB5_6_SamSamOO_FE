'use client';

import React, { useState } from 'react';
import tw from '@/utils/tw';

export interface DivergingBarChartProps {
  data: {
    label: string;
    positive: number;
    negative: number;
  }[];
  colors?: {
    positive: string;
    negative: string;
  };
  hoverColors?: {
    positive: string;
    negative: string;
  };
  barWidth?: string;
  barSpacing?: string;
  borderRadius?: string;
  chartHeight?: string;
  maxBarHeight?: number;
  showPercentOnHover?: boolean;
  className?: string;
}

export function DivergingBarChart({
  data,
  colors = {
    positive: 'bg-brand-primary dark:bg-brand-accent',
    negative: 'bg-[#AFCFFF] dark:bg-[#DBD3D3]',
  },
  hoverColors = {
    positive: 'hover:bg-brand-primary/60 dark:hover:bg-brand-accent/60',
    negative: 'hover:bg-[#84B5FF] dark:hover:bg-[#E5DFDF]',
  },
  barWidth = 'w-4',
  barSpacing = 'mx-1',
  borderRadius = 'rounded-full',
  chartHeight = '200px',
  maxBarHeight = 70,
  showPercentOnHover = true,
  className,
}: DivergingBarChartProps) {
  const [hoveredBar, setHoveredBar] = useState<{
    index: number;
    type: 'positive' | 'negative';
  } | null>(null);
  const maxValue = Math.max(...data.map((d) => Math.max(d.positive, d.negative)));
  const halfHeight = parseInt(chartHeight) / 2 - 20;

  const getTopRadius = () => {
    if (borderRadius === 'rounded-full') return 'rounded-t-full';
    return borderRadius.replace('rounded', 'rounded-t');
  };

  const getBottomRadius = () => {
    if (borderRadius === 'rounded-full') return 'rounded-b-full';
    return borderRadius.replace('rounded', 'rounded-b');
  };

  return (
    <div className={tw('relative', className)}>
      {/* 차트 본체 */}
      <div className="flex justify-center items-center px-4" style={{ height: chartHeight }}>
        {data.map((item, index) => {
          const posHeight = (item.positive / maxValue) * maxBarHeight;
          const negHeight = (item.negative / maxValue) * maxBarHeight;

          return (
            <div key={index} className={tw('flex flex-col items-center relative', barSpacing)}>
              {/* Positive (위쪽 막대) */}
              <div
                className="flex flex-col items-center justify-end"
                style={{ height: `${halfHeight}px` }}
              >
                <div
                  className={tw(
                    barWidth,
                    colors.positive,
                    hoverColors.positive,
                    getTopRadius(),
                    'relative cursor-pointer',
                  )}
                  style={{ height: `${posHeight}px` }}
                  onMouseEnter={() => setHoveredBar({ index, type: 'positive' })}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* 호버 시 막대 위에 툴팁 표시 */}
                  {showPercentOnHover &&
                    hoveredBar?.index === index &&
                    hoveredBar?.type === 'positive' && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 text-xs px-2 py-1 rounded whitespace-nowrap">
                        {item.positive}%
                      </div>
                    )}
                </div>
              </div>

              {/* 라벨 */}
              <div className="py-2">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
                  {item.label}
                </span>
              </div>

              {/* Negative (아래쪽 막대) */}
              <div className="flex flex-col items-center" style={{ height: `${halfHeight}px` }}>
                <div
                  className={tw(
                    barWidth,
                    colors.negative,
                    hoverColors.negative,
                    getBottomRadius(),
                    'relative cursor-pointer',
                  )}
                  style={{ height: `${negHeight}px` }}
                  onMouseEnter={() => setHoveredBar({ index, type: 'negative' })}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* 호버 시 막대 아래에 툴팁 표시 */}
                  {showPercentOnHover &&
                    hoveredBar?.index === index &&
                    hoveredBar?.type === 'negative' && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 text-xs px-2 py-1 rounded whitespace-nowrap">
                        {item.negative}%
                      </div>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
