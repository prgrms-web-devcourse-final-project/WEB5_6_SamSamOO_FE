'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils/cn';

interface TimeSliderProps {
  className?: string;
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

/**
 * TimeSlider (반응형 개선)
 * - 모바일: 손잡이 크기 확대
 * - 데스크탑: 기존 유지
 */
export function TimeSlider({
  className,
  defaultValue = [1],
  min = 1,
  max = 168,
  step = 1,
  onChange,
}: TimeSliderProps) {
  const [value, setValue] = React.useState<number[]>(defaultValue);

  const handleValueChange = (v: number[]) => {
    setValue(v);
    onChange?.(v[0]);
  };

  return (
    <SliderPrimitive.Root
      value={value}
      min={min}
      max={max}
      step={step}
      onValueChange={handleValueChange}
      className={cn(
        'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50',
        className,
      )}
    >
      <SliderPrimitive.Track className="bg-[#d9d9d9] relative grow overflow-hidden rounded-full h-1 sm:h-1.5">
        <SliderPrimitive.Range className="bg-brand-primary absolute h-full dark:bg-brand-accent" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        data-slot="slider-thumb"
        className="ring-ring/50 block size-5 sm:size-4 shrink-0 rounded-full border bg-brand-primary shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:bg-brand-accent"
      />
    </SliderPrimitive.Root>
  );
}
