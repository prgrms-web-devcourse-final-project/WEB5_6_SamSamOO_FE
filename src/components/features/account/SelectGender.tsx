/* eslint-disable @next/next/no-img-element */
'use client';

import * as Select from '@radix-ui/react-select';
import tw from '@/utils/tw';

type SelectGenderProps = {
  className?: string;
  value?: 'MALE' | 'FEMALE';
  onChange?: (value: 'MALE' | 'FEMALE') => void;
};

const genderOptions = [
  { label: '남성', value: 'MALE' },
  { label: '여성', value: 'FEMALE' },
];

function SelectGender({ className, value, onChange }: SelectGenderProps) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        aria-label="성별 선택"
        className={tw(
          'flex h-13 w-full items-center justify-between rounded-full bg-[#F4F4F4] px-5 text-sm shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] outline-none dark:text-primary-black sm:px-6 sm:text-base',
          className,
        )}
      >
        <Select.Value
          placeholder="성별"
          className="flex items-center text-primary-black data-[placeholder]:text-primary-black"
        />
        <Select.Icon>
          <img src="/icons/selectDown.svg" alt="성별 " />
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
          {genderOptions.map((option) => (
            <Select.Item
              key={option.value}
              value={option.value}
              className="flex h-10 cursor-pointer select-none items-center rounded-[18px] px-3 text-primary-black outline-none hover:bg-[#f7f7f7]"
            >
              <Select.ItemText>{option.label}</Select.ItemText>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}

export default SelectGender;
