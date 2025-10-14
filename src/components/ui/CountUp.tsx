'use client';

import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  separator?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  separator = true,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const countRef = useCountUp({ end, start, duration, decimals, separator });

  // ✅ 초기값 포맷팅
  const formattedStart = separator
    ? start.toLocaleString('ko-KR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : start.toFixed(decimals);

  return (
    <span className={className}>
      {prefix}
      <span ref={countRef}>{formattedStart}</span>
      {suffix}
    </span>
  );
}
