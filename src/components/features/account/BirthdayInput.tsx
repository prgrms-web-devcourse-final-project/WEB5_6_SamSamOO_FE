'use client';

import { useState, useEffect } from 'react';
import { formatDate } from '@/utils/date';

type BirthdayInputProps = {
  value?: string;
  onChange?: (birthday: string) => void;
};

export default function BirthdayInput({ value, onChange }: BirthdayInputProps) {
  const [digits, setDigits] = useState('');

  useEffect(() => {
    if (value !== undefined) {
      const digitsFromValue = value.replace(/\D/g, '');
      setDigits(digitsFromValue);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newDigits = inputValue.replace(/\D/g, '');

    let updatedDigits = '';
    if (newDigits.length >= digits.length) {
      updatedDigits = newDigits.slice(0, 8);
    } else {
      updatedDigits = digits.slice(0, -1);
    }

    setDigits(updatedDigits);

    const formattedValue = formatDate(updatedDigits);
    onChange?.(formattedValue);
  };

  const displayValue = formatDate(digits);

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder="YYYY - MM - DD"
      inputMode="numeric"
      maxLength={10}
      className="flex-1 h-13 rounded-full bg-[#F4F4F4] pl-6 placeholder-primary-black shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] outline-none"
    />
  );
}
