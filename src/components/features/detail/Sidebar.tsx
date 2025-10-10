'use client';
import Hamburger from '@/assets/icons/hamburger.svg';
import MetadataGrid from './MetadataGrid';
import Toc from './Toc';
import { Metadata, TableOfContent } from '@/types/detail';
import { useLayoutEffect, useRef, useState } from 'react';
import { debounce } from '@/utils/debounce';
interface Props {
  toc: TableOfContent;
  metadata: Metadata;
  category: string;
}

function Sidebar({ toc, metadata, category }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [sidebarWith, setSidebarWith] = useState<number>(0);
  const sideRef = useRef<HTMLElement>(null);

  const calcSideWidth = () => {
    if (!sideRef.current) return;
    const target = sideRef.current;
    setSidebarWith(target.clientWidth);
  };

  useLayoutEffect(() => {
    calcSideWidth();

    const observer = new ResizeObserver(() => {
      calcSideWidth();
    });
    if (sideRef.current) observer.observe(sideRef.current);
    const handleResize = debounce(calcSideWidth, 200);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [isOpen]);

  return (
    <div className="relative flex">
      <>
        <button
          hidden={isOpen}
          type="button"
          className="sticky top-[calc(50%-90px)] text-[16px] w-8 h-40 px-1 bg-brand-primary dark:bg-brand-accent rounded-r-2xl font-light text-primary-white dark:font-medium"
          style={{ left: isOpen ? `calc(${sidebarWith}px + 20px)` : 0 }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {category === '법령' ? (
            <>
              <p>법</p>
              <p>령</p>
              <p>목</p>
              <p>차</p>
            </>
          ) : (
            <>
              <p>판</p>
              <p>례</p>
              <p>목</p>
              <p>차</p>
            </>
          )}
        </button>
        {isOpen && (
          <div className="sticky left-0 top-0 flex h-dvh">
            <section
              ref={sideRef}
              className="overflow-x-hidden w-[366px] flex-col text-primary-gray2 dark:text-primary-white border-r"
            >
              <h2 className="sr-only">네비게이션</h2>
              <div className="w-full flex gap-2 items-center py-10 mb-12 px-8 border-b">
                <Hamburger className="dark:text-primary-white w-8 h-4" />
                <p className="font-bold text-3xl">
                  {category === '법령' ? '법령 목차' : '판례 목차'}
                </p>
              </div>
              <div className="flex-1 h-[calc(100dvh-460px)] overflow-y-scroll overflow-x-hidden">
                <Toc toc={toc} />
              </div>
              <div className="w-full px-8 py-10">
                <MetadataGrid metadata={metadata} />
              </div>
            </section>
            <button
              type="button"
              className="absolute top-[calc(50%-157px)] text-[16px] w-8 h-40 px-1 bg-brand-primary dark:bg-brand-accent rounded-r-2xl font-light text-primary-white dark:font-medium"
              style={{ left: isOpen ? `${sidebarWith}px` : 0 }}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {category === '법령' ? (
                <>
                  <p>법</p>
                  <p>령</p>
                  <p>목</p>
                  <p>차</p>
                </>
              ) : (
                <>
                  <p>판</p>
                  <p>례</p>
                  <p>목</p>
                  <p>차</p>
                </>
              )}
            </button>
          </div>
        )}
      </>
    </div>
  );
}
export default Sidebar;
