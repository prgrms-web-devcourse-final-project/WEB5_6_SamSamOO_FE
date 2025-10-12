'use client';

import * as Select from '@radix-ui/react-select';
import tw from '@/utils/tw';
import Gavel from '@/assets/icons/gavel.svg';
import SelectIcon from '@/assets/icons/select.svg';

export interface CategoryOption {
  label: string;
  value: string;
}

interface SelectCategoryProps {
  options: CategoryOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function SelectCategory({
  options,
  value,
  onChange,
  className,
  disabled,
}: SelectCategoryProps) {
  return (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger
        aria-label="카테고리 선택"
        className={tw(
          'flex h-10 items-center gap-2 justify-between rounded-full bg-brand-primary px-5 text-primary-white outline-none transition-all text-lg hover:brightness-110 hover:-translate-y-[1px] dark:bg-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent disabled:opacity-60 disabled:cursor-not-allowed',
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <Gavel className="w-5 h-5 text-primary-white" />
          <Select.Value placeholder="카테고리 선택" />
        </div>
      </Select.Trigger>

      <Select.Content
        position="popper"
        side="bottom"
        align="start"
        sideOffset={8}
        avoidCollisions={false}
        className="w-[var(--radix-select-trigger-width)] rounded-3xl border border-[#D2D2D2] bg-white dark:bg-background-black2 shadow-lg"
      >
        <Select.Viewport className="p-2.5 space-y-2">
          {options.map((option) => (
            <Select.Item
              key={option.value}
              value={option.value}
              className={tw(
                'flex h-10 cursor-pointer text-lg select-none items-center justify-between rounded-[18px] px-3 text-primary-black dark:text-primary-white outline-none transition-colors',
                'hover:bg-[#f7f7f7] hover:text-brand-primary',
                'data-[state=checked]:bg-[#f7f7f7] data-[state=checked]:text-brand-primary',
              )}
            >
              <Select.ItemText>{option.label}</Select.ItemText>
              <Select.ItemIndicator>
                <SelectIcon className="text-brand-primary scale-150" />
              </Select.ItemIndicator>
            </Select.Item>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
