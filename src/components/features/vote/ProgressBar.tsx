// src/components/features/vote/ProgressBar.tsx
'use client';

import * as Progress from '@radix-ui/react-progress';
import Select from '@/assets/icons/select.svg';
import { calPercent } from '@/utils/calPercent';
import tw from '@/utils/tw';

interface Props {
  label: string;
  isSelected: boolean;
  currentVotes: number;
  totalVotes: number;
  onSelect?: () => void;
  disabled?: boolean;
  variant?: 'ongoing' | 'closed1' | 'closed2';
}

export default function ProgressBar({
  label,
  isSelected,
  currentVotes,
  totalVotes,
  onSelect,
  disabled = false,
  variant = 'ongoing',
}: Props) {
  const percent = calPercent(currentVotes, totalVotes);
  const handleClick = () => !disabled && onSelect?.();

  const bg =
    variant === 'closed2'
      ? 'bg-[#AFCFFF] dark:bg-[#DBD3D3]'
      : 'bg-brand-primary dark:bg-brand-accent';

  const outerText =
    variant === 'closed2'
      ? 'text-brand-primary dark:text-primary-white'
      : 'text-zinc-900 dark:text-primary-white';

  const innerText =
    variant === 'closed2'
      ? 'text-brand-primary dark:text-primary-black'
      : 'text-white dark:text-primary-white';

  const iconOuter =
    variant === 'closed2'
      ? 'text-brand-primary fill-brand-primary dark:text-primary-white dark:fill-primary-white'
      : 'text-white fill-white dark:text-primary-white dark:fill-primary-white';

  const iconInner =
    variant === 'closed2'
      ? 'text-brand-primary fill-brand-primary dark:text-primary-black dark:fill-primary-black'
      : 'text-white fill-white dark:text-primary-white dark:fill-primary-white';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={tw(
        'relative w-full text-left rounded-[20px] overflow-hidden select-none transition-transform focus:outline-none',
        disabled
          ? 'cursor-not-allowed pointer-events-none'
          : 'hover:scale-[1.01] active:scale-[0.99]',
      )}
    >
      <Progress.Root
        className="relative h-12 overflow-hidden rounded-[22px] bg-[#f4f4f4] dark:bg-zinc-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] dark:shadow-[inset_0_0_0_1px_#a3a3a3]"
        value={percent}
        max={100}
      >
        <Progress.Indicator
          className={tw('h-full transition-transform duration-500 ease-out rounded-[20px]', bg)}
          style={{ transform: `translateX(-${100 - percent}%)` }}
        />

        <div
          className={tw(
            'absolute inset-0 flex justify-between items-center px-3 text-md',
            outerText,
          )}
        >
          <div className="flex items-center gap-2">
            {isSelected && <Select className={tw('size-6 shrink-0', iconOuter)} />}
            <p className={tw('truncate', !isSelected && 'pl-2')}>{label}</p>
          </div>
          <div className="flex items-end gap-3 leading-tight">
            <p>{percent}%</p>
            <p>{currentVotes.toLocaleString()}표</p>
          </div>
        </div>

        <div
          className={tw(
            'pointer-events-none absolute inset-0 flex justify-between items-center px-3 text-md transition-[clip-path] duration-500 ease-out',
            innerText,
          )}
          style={{ clipPath: `inset(0 calc(100% - ${percent}%) 0 0)` }}
        >
          <div className="flex items-center gap-2">
            {isSelected && <Select className={tw('size-6 shrink-0', iconInner)} />}
            <p className={tw('truncate', !isSelected && 'pl-2')}>{label}</p>
          </div>
          <div className="flex items-end gap-3 leading-tight">
            <p>{percent}%</p>
            <p>{currentVotes.toLocaleString()}표</p>
          </div>
        </div>
      </Progress.Root>
    </button>
  );
}
