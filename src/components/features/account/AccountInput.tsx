import React from 'react';
import tw from '@/utils/tw';

interface Props {
  name: string;
  placeholder: string;
  type: 'text' | 'password';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const STYLE = tw(
  'h-13 w-full rounded-full px-6 outline-none',
  'bg-[#F4F4F4] placeholder-primary-black shadow-[inset_0_4px_10px_0_rgba(0,0,0,0.3)]',
  'dark:caret-primary-black',
);

function AccountInput({ name, placeholder, type, onChange, value }: Props) {
  return (
    <input
      className={STYLE}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
export default AccountInput;
