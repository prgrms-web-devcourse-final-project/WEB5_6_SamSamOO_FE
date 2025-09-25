/* eslint-disable @next/next/no-img-element */
'use client';

import * as Select from '@radix-ui/react-select';
import { useState } from 'react';
import tw from '@/utils/tw';

type SelectGenderProps = {
  className?: string;
};

function SelectGender({ className }: SelectGenderProps) {
  const [value, setValue] = useState<string>();

  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger
        aria-label="성별 선택"
        className={tw(
          'flex h-13 items-center justify-between rounded-full bg-[#F4F4F4] px-6 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] outline-none dark:text-primary-black',
          className,
        )}
      >
        <Select.Value
          placeholder="성별"
          className="flex items-center text-primary-black data-[placeholder]:text-primary-black"
        />
        <Select.Icon>
          <img src="/icons/selectDown.svg" alt="선택 아이콘" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Content
        position="popper"
        side="bottom"
        align="start"
        sideOffset={8}
        avoidCollisions={false}
        className="w-[var(--radix-select-trigger-width)] rounded-3xl border border-[#D2D2D2] bg-white shadow-lg"
      >
        <Select.Viewport className="p-2.5">
          {['남자', '여자'].map((label) => (
            <Select.Item
              key={label}
              value={label}
              className="flex h-10 cursor-pointer select-none items-center rounded-[18px] px-3 outline-none hover:bg-[#f7f7f7]"
            >
              <Select.ItemText>{label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}

export default SelectGender;
