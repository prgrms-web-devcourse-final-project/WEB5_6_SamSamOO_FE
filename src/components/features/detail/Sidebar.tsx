'use client';

import { useState, useRef, useEffect } from 'react';

import MetadataGrid from './MetadataGrid';
import Toc from './Toc';

import tw from '@/utils/tw';
import NavArrow from '@/assets/icons/navArrow.svg';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { Metadata, TableOfContent } from '@/types/detail';

interface Props {
  toc: TableOfContent;
  metadata: Metadata;
  category: string;
}

function Sidebar({ toc, metadata, category }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isMobile = useMobileDetection(768);
  const sideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      // document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      // document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile]);

  return (
    <>
      {/* 토글 버튼 */}
      {isMobile && (
        <header
          className={tw(
            'fixed z-10 flex items-center top-15 w-full h-18 border-b border-b-filter-outline1',
            isOpen
              ? 'bg-[rgba(255,255,255)] dark:bg-[rgba(0,0,0)]'
              : 'bg-[rgba(255,255,255,0.89)] dark:bg-[rgba(0,0,0,0.89)]',
          )}
        >
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center pl-8"
          >
            <NavArrow className="dark:text-primary-white w-6 h-6" />
            <p className="font-bold text-xl pt-0.5">
              {category === '법령' ? '법령 목차' : '판례 목차'}
            </p>
          </button>
        </header>
      )}
      {/* 768 사이드바 오버레이 */}
      {isMobile && isOpen && (
        <section
          ref={sideRef}
          className="fixed inset-0 z-10 left-0 top-33 bottom-0 p-8 flex bg-background-white dark:bg-primary-black shadow-lg "
        >
          <div className="relative h-[calc(100%-225px)] flex-1 overflow-y-scroll">
            <Toc toc={toc} />
          </div>
          <div className="absolute w-[88%] bottom-0 pb-6">
            <MetadataGrid metadata={metadata} />
          </div>
        </section>
      )}

      <div className="relative">
        {/* 1024 사이드바 fixed*/}
        <section
          className={tw(
            'hidden sticky md:flex flex-col top-0 h-dvh w-[366px] border-r border-border-gray1 bg-background-white dark:bg-background-black1',
          )}
        >
          <div className="w-full flex items-center py-10 mb-12 px-8 border-b">
            <NavArrow className="dark:text-primary-white text-primary-gray2 w-9 h-9" />
            <p className="font-bold text-3xl text-primary-gray2 dark:text-primary-white pt-1.5">
              {category === '법령' ? '법령 목차' : '판례 목차'}
            </p>
          </div>
          <div className="flex-1 overflow-y-scroll overflow-x-hidden">
            <Toc toc={toc} />
          </div>
          <div className="w-full px-8 py-10">
            <MetadataGrid metadata={metadata} />
          </div>
        </section>
      </div>
    </>
  );
}

export default Sidebar;
