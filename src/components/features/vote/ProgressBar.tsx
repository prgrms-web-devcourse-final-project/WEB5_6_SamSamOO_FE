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
  onSelect?: () => void;
  disabled?: boolean;
}

export default function ProgressBar({
  label,
  isSelected,
  currentVotes,
  totalVotes,
  onSelect,
  disabled = false,
}: Props) {
  const percent = calPercent(currentVotes, totalVotes);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`
        relative w-full text-left rounded-[20px] overflow-hidden select-none
        transition-transform focus:outline-none
        ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.99]'}
      `}
    >
      <Progress.Root
        className="relative h-12 overflow-hidden rounded-[20px] bg-[#f4f4f4] dark:bg-zinc-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_0_1px_#a3a3a3]"
        value={percent}
        max={100}
      >
        {/* 채워진 영역 */}
        <Progress.Indicator
          className="h-full bg-brand-primary dark:bg-brand-accent transition-transform duration-500 ease-out rounded-[20px]"
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />

        {/* 중앙 텍스트 */}
        <div
          className="
            absolute inset-0 flex justify-between items-center px-5 text-md font-bold
            text-brand-primary dark:text-primary-white
            mix-blend-difference dark:mix-blend-normal
          "
          style={{
            color: '#fff',
          }}
        >
          <div className="flex items-center gap-2">
            {isSelected && <Select className="size-6 shrink-0" />}
            <p className="truncate">{label}</p>
          </div>
          <div className="flex items-end leading-tight gap-3">
            <p>{percent}%</p>
            <p>{currentVotes.toLocaleString()}표</p>
          </div>
        </div>
      </Progress.Root>
    </button>
  );
}
