'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

/**
 * MyVoteLayout
 * - 탭은 항상 한 줄 유지
 * - 모바일일 때 간격·폰트 크기만 축소
 */
export default function MyVoteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { href: '/vote/participated', label: '내가 참여한 투표' },
    { href: '/vote/created', label: '내가 생성한 투표' },
  ];

  return (
    <section className="w-full max-w-3xl mx-auto mt-8">
      {/* 탭 네비게이션 */}
      <nav
        className="
          flex 
          justify-between 
          divide-x-2 divide-primary-gray1 
          text-center
        "
      >
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                flex-1 
                py-2 sm:py-3 
                text-base sm:text-lg 
                font-bold 
                transition-colors 
                ${
                  isActive
                    ? 'text-brand-accent'
                    : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-primary-white'
                }
              `}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {children}
    </section>
  );
}
