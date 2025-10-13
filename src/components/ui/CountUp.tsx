'use client';

import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  separator?: boolean;
  prefix?: string; // 접두사 (예: "$", "₩")
  suffix?: string; // 접미사 (예: "+", "%", "명")
  className?: string;
}

export function CountUp({
  end,
  start = 0,
  duration = 8,
  decimals = 0,
  separator = true,
  prefix = '',
  suffix = '',
  className = '',
}: CountUpProps) {
  const countRef = useCountUp({ end, start, duration, decimals, separator });

  return (
    <span className={className}>
      {prefix}
      <span ref={countRef}>{start}</span>
      {suffix}
    </span>
  );
}
