'use client';

import React, { useState } from 'react';
import tw from '@/utils/tw';

/**
 * 📊 DivergingBarChart
 * - 위: positive, 아래: negative 값을 시각화하는 양극단 막대 그래프
 * - hover 시 퍼센트 표시 가능
 */
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
  barWidth?: string; // 👈 막대 기둥의 너비 조절 (예: 'w-14', 'w-20', 'w-32')
  barSpacing?: string; // 👈 막대 사이의 간격 조절 (예: 'mx-1', 'mx-2', 'mx-4')
  borderRadius?: string; // 👈 보더 라디어스 조절 (예: 'rounded-xl', 'rounded-2xl', 'rounded-full')
  chartHeight?: string;
  maxBarHeight?: number;
  showPercentOnHover?: boolean;
  className?: string;
}

export function DivergingBarChart({
  data,
  colors = { positive: 'bg-brand-primary', negative: 'bg-[#AFCFFF]' },
  hoverColors = { positive: 'hover:bg-brand-primary/60', negative: 'hover:bg-[#84B5FF]' },
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

  // borderRadius를 top/bottom용으로 변환
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
                    'transition-all duration-500 relative cursor-pointer',
                  )}
                  style={{ height: `${posHeight}px` }}
                  onMouseEnter={() => setHoveredBar({ index, type: 'positive' })}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* 호버 시 막대 위에 툴팁 표시 */}
                  {showPercentOnHover &&
                    hoveredBar?.index === index &&
                    hoveredBar?.type === 'positive' && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {item.positive}%
                      </div>
                    )}
                </div>
              </div>

              {/* 라벨 */}
              <div className="py-2">
                <span className="text-sm font-bold text-gray-700">{item.label}</span>
              </div>

              {/* Negative (아래쪽 막대) */}
              <div className="flex flex-col items-center" style={{ height: `${halfHeight}px` }}>
                <div
                  className={tw(
                    barWidth,
                    colors.negative,
                    hoverColors.negative,
                    getBottomRadius(),
                    'transition-all duration-500 relative cursor-pointer',
                  )}
                  style={{ height: `${negHeight}px` }}
                  onMouseEnter={() => setHoveredBar({ index, type: 'negative' })}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* 호버 시 막대 아래에 툴팁 표시 */}
                  {showPercentOnHover &&
                    hoveredBar?.index === index &&
                    hoveredBar?.type === 'negative' && (
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
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
