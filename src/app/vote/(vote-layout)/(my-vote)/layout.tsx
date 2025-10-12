'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function MyVoteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { href: '/vote/participated', label: '내가 참여한 투표' },
    { href: '/vote/created', label: '내가 생성한 투표' },
  ];

  return (
    <section className="w-full max-w-xl mx-auto mt-8">
      <nav className="flex divide-x-2 divide-primary-gray1">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 text-center py-3 text-lg font-bold transition-colors ${
                isActive ? 'text-brand-accent' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col items-center ">{children}</div>
    </section>
  );
}
