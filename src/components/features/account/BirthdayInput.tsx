'use client';

import { useState } from 'react';

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(Math.max(n, lo), hi);
}

function formatDate(digits: string) {
  digits = digits.slice(0, 8);
  let result = '';

  if (digits.length > 0) {
    result = digits.slice(0, 4);
  }

  if (digits.length > 4) {
    let month = digits.slice(4, 6);
    if (month.length === 2) {
      const monthNum = clamp(parseInt(month, 10), 1, 12);
      month = monthNum.toString().padStart(2, '0');
    }
    result += '-' + month;
  }

  if (digits.length > 6) {
    let day = digits.slice(6, 8);
    if (day.length === 2) {
      const year = parseInt(digits.slice(0, 4), 10);
      const month = parseInt(digits.slice(4, 6), 10);

      if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
        const maxDays = daysInMonth(year, month);
        const dayNum = parseInt(day, 10);
        const dayNumClamped = clamp(dayNum, 1, maxDays);
        day = dayNumClamped.toString().padStart(2, '0');
      }
    }
    result += '-' + day;
  }

  return result;
}

export default function BirthdayInput() {
  const [digits, setDigits] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newDigits = inputValue.replace(/\D/g, '');

    if (newDigits.length >= digits.length) {
      setDigits(newDigits.slice(0, 8));
    } else {
      setDigits(digits.slice(0, -1));
    }
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
