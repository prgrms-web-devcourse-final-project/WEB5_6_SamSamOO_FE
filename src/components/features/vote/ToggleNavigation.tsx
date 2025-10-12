'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import tw from '@/utils/tw';

interface ToggleNavigationProps {
  options?: string[];
  initialValue?: number;
  className?: string;
}

export default function ToggleNavigation({
  options = ['진행 중인 투표', '마감된 투표', '내 투표'],
  initialValue = 0,
  className = '',
}: ToggleNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    if (pathname.includes('/ongoing')) setSelected(0);
    else if (pathname.includes('/closed')) setSelected(1);
    else if (pathname.includes('/participated')) setSelected(2);
  }, [pathname]);

  const handleSwitch = (index: number) => {
    setSelected(index);
    const routes = ['/vote/ongoing', '/vote/closed', '/vote/participated'];
    router.push(routes[index] ?? '/vote/ongoing');
  };

  const sectionWidth = 100 / options.length;

  return (
    <div
      className={tw(
        'relative w-full max-w-md rounded-full bg-[#f5f5f5] shadow-[inset_0_0_10px_rgba(0,0,0,0.25)] p-1.5 dark:bg-background-black2 dark:border-1 dark:border-primary-gray2',
        className,
      )}
    >
      <div className="relative flex items-center justify-between rounded-full overflow-hidden">
        {/* 슬라이더 */}
        <motion.div
          className="absolute inset-y-0 rounded-full bg-brand-primary dark:bg-brand-accent"
          initial={false}
          animate={{
            left: `${sectionWidth * selected}%`,
            width: `${sectionWidth}%`,
          }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        />

        {/* 버튼 */}
        {options.map((option, index) => (
          <button
            key={option}
            onClick={() => handleSwitch(index)}
            className={tw(
              'relative z-10 flex-1 py-2 text-lg font-medium transition-colors duration-200',
              selected === index
                ? 'text-primary-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
