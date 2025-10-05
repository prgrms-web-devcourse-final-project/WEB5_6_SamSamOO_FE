'use client';

import * as React from 'react';
import * as Progress from '@radix-ui/react-progress';
import Select from '@/assets/icons/select.svg';
import { calPercent } from '@/utils/calPercent';

interface Props {
  label: string;
  isSelected: boolean;
  currentVotes: number;
  totalVotes: number;
}

export default function ProgressBar({ label, isSelected, currentVotes, totalVotes }: Props) {
  const percent = calPercent(currentVotes, totalVotes);

  return (
    <div className="relative w-full">
      {/* Progress 바 */}
      <Progress.Root
        className="relative h-15 overflow-hidden rounded-3xl bg-[#f4f4f4] dark:bg-zinc-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.30)]"
        value={percent}
        max={100}
      >
        {/* 채워진 영역 */}
        <Progress.Indicator
          className="h-full bg-brand-primary transition-transform duration-500 ease-out rounded-3xl"
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />

        {/* 게이지 안쪽 흰색 텍스트 */}
        <div className="absolute inset-0 flex justify-between items-center px-5 text-md font-bold text-white">
          <div className="flex items-center gap-3">
            {isSelected && <Select className="size-6 shrink-0" />}
            <p className="truncate text-lg">{label}</p>
          </div>
          <div className="flex items-end leading-tight gap-3">
            <p className="text-lg">{percent}%</p>
            <p className="text-lg">{currentVotes.toLocaleString()}표</p>
          </div>
        </div>
      </Progress.Root>

      {/* 게이지 바깥쪽 텍스트 (검정) */}
      <div
        className="absolute inset-0 flex justify-between items-center px-5 text-md font-bold text-brand-primary pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
      >
        <div className="flex items-center gap-3">
          {isSelected && <Select className="size-6 shrink-0" />}
          <p className="truncate text-lg">{label}</p>
        </div>
        <div className="flex items-end leading-tight gap-3">
          <p className="text-lg">{percent}%</p>
          <p className="text-lg">{currentVotes.toLocaleString()}표</p>
        </div>
      </div>
    </div>
  );
}
