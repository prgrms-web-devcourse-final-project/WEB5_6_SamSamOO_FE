'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import tw from '@/utils/tw';
import * as Select from '@radix-ui/react-select';
import { MenuItem } from '@/types/filter';

interface SelectMenuProps {
  field?: string;
  itemList?: MenuItem[];
  triggerStyle?: string;
  valueStyle?: string;
  contentStyle?: string;
  itemStyle?: string;

  aria?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

function SelectMenu({
  field,
  itemList,
  triggerStyle,
  valueStyle,
  contentStyle,
  itemStyle,
  aria = '전체',
  value,
  disabled,
  placeholder,
  onValueChange,
}: SelectMenuProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Select.Root value={value} onValueChange={(value) => onValueChange?.(value)}>
      <Select.Trigger
        id={field}
        disabled={disabled}
        aria-label={`${aria} 선택`}
        className={tw(
          'py-2 px-6 w-fit flex gap-3 items-center justify-between rounded-full bg-background-white  outline-none border border-filter-outline1 text-primary-gray2 focus:shadow-filter-light-active dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2 data-[state=open]:shadow-filter-light-active dark:data-[state=open]:shadow-filter-dark-active',
          triggerStyle,
        )}
      >
        <Select.Value
          placeholder={placeholder ?? aria}
          className={tw(
            'flex items-center text-primary-black data-[placeholder]:text-primary-black',
            valueStyle,
          )}
        />
        <Select.Icon>
          <svg
            width="18"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.18211 1.18211C1.23969 1.12438 1.30809 1.07858 1.38339 1.04733C1.4587 1.01608 1.53943 1 1.62096 1C1.7025 1 1.78323 1.01608 1.85853 1.04733C1.93384 1.07858 2.00224 1.12438 2.05982 1.18211L9.05923 8.18275L16.0586 1.18211C16.1163 1.12447 16.1847 1.07876 16.26 1.04757C16.3353 1.01638 16.416 1.00032 16.4975 1.00032C16.579 1.00032 16.6597 1.01638 16.735 1.04757C16.8103 1.07876 16.8787 1.12447 16.9364 1.18211C16.994 1.23974 17.0397 1.30816 17.0709 1.38345C17.1021 1.45875 17.1181 1.53946 17.1181 1.62096C17.1181 1.70247 17.1021 1.78317 17.0709 1.85847C17.0397 1.93377 16.994 2.00219 16.9364 2.05982L9.49809 9.49809C9.44051 9.55581 9.37211 9.60161 9.2968 9.63286C9.22149 9.66411 9.14076 9.68019 9.05923 9.68019C8.9777 9.68019 8.89697 9.66411 8.82166 9.63286C8.74635 9.60161 8.67795 9.55581 8.62037 9.49809L1.18211 2.05982C1.12438 2.00224 1.07858 1.93384 1.04733 1.85853C1.01609 1.78323 1 1.7025 1 1.62096C1 1.53943 1.01609 1.4587 1.04733 1.38339C1.07858 1.30809 1.12438 1.23968 1.18211 1.18211Z"
              fill={isDark ? '#737373' : '#6E6E6E '}
              stroke="none"
            />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Content
        position="popper"
        side="bottom"
        align="start"
        sideOffset={8}
        avoidCollisions={false}
        className={tw(
          'w-[var(--radix-select-trigger-width)] max-h-[var(--radix-select-content-available-height)] rounded-3xl border border-[#D2D2D2] bg-white shadow-filter dark:bg-primary-gray3 dark:text-primary-white dark:border-filter-outline2',
          contentStyle,
        )}
      >
        <Select.Viewport className="p-2.5 space-y-2 gap-2 overflow-auto">
          {itemList &&
            itemList.map(({ label }) => (
              <Select.Item
                key={label}
                value={label}
                className={tw(
                  'flex h-10 cursor-pointer select-none items-center justify-between rounded-[18px] px-3 outline-none hover:bg-[#f7f7f7] dark:hover:text-primary-black',
                  value === label ? 'bg-[#f7f7f7] dark:text-primary-black' : '',
                  itemStyle,
                )}
              >
                <Select.ItemText>{label}</Select.ItemText>
                {value === label && (
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 0C5.6075 0 0 5.6075 0 12.5C0 19.3925 5.6075 25 12.5 25C19.3925 25 25 19.3925 25 12.5C25 5.6075 19.3925 0 12.5 0ZM10.0013 18.0163L5.36 13.385L7.125 11.615L9.99875 14.4837L16.6163 7.86625L18.3838 9.63375L10.0013 18.0163Z"
                      fill={isDark ? '#1a1a1a' : '#0D1846 '}
                    />
                  </svg>
                )}
              </Select.Item>
            ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
export default SelectMenu;
