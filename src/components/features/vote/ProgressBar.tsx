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
        className="relative h-12 overflow-hidden rounded-[20px] bg-[#f4f4f4] dark:bg-zinc-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.30)] dark:shadow-[inset_0_0_0_1px_#a3a3a3]"
        value={percent}
        max={100}
      >
        {/* 채워진 영역 */}
        <Progress.Indicator
          className="h-full bg-brand-primary transition-transform duration-500 ease-out rounded-[20px] dark:bg-brand-accent"
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />

        {/* 게이지 안쪽 흰색 텍스트 */}
        <div className="absolute inset-0 flex justify-between items-center px-5 text-md font-bold text-white">
          <div className="flex items-center gap-2">
            {isSelected && <Select className="size-6 shrink-0" />}
            <p className="truncate">{label}</p>
          </div>
          <div className="flex items-end leading-tight gap-3">
            <p className="">{percent}%</p>
            <p className="">{currentVotes.toLocaleString()}표</p>
          </div>
        </div>
      </Progress.Root>

      {/* 게이지 바깥쪽 텍스트 (검정) */}
      <div
        className="absolute inset-0 flex justify-between items-center px-5 text-md font-bold text-brand-primary pointer-events-none dark:text-primary-white"
        style={{ clipPath: `inset(0 0 0 ${percent}%)` }}
      >
        <div className="flex items-center gap-2">
          {isSelected && <Select className="size-6 shrink-0" />}
          <p className="truncate">{label}</p>
        </div>
        <div className="flex items-end leading-tight gap-3">
          <p className="">{percent}%</p>
          <p className="">{currentVotes.toLocaleString()}표</p>
        </div>
      </div>
    </div>
  );
}
