'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import tw from '@/utils/tw';

type NavigationItem = {
  href?: string;
  label?: string;
  test?: string;
};

interface Props {
  items: NavigationItem[];
  paddingX?: number;
  paddingY?: number;
  parentStyle?: string;
  highlightStyle?: string;
  activeTextStyle?: string;
  inactiveTextStyle?: string;
}

const defaultParentStyle =
  'px-8 py-3 gap-[83px] bg-[#0D1846] rounded-full text-xl text-primary-white dark:bg-primary-black dark:border dark:border-border-gray1';
const defaultHighlightStyle = 'bg-primary-white rounded-4xl';
const defaultActiveTextStyle = 'text-primary-black';
const defaultInactiveTextStyle = 'text-primary-white';

function ToggleSwitchNavigation({
  items,
  paddingX,
  paddingY,
  parentStyle = defaultParentStyle,
  highlightStyle = defaultHighlightStyle,
  activeTextStyle = defaultActiveTextStyle,
  inactiveTextStyle = defaultInactiveTextStyle,
}: Props) {
  const pathname = usePathname();
  const parentRef = useRef<HTMLUListElement | null>(null);
  const categoryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeX, setActiveX] = useState<number | null>(null);
  const [activeHeight, setActiveHeight] = useState<number | null>(null);
  const [activeWidth, setActiveWidth] = useState<number | null>(null);

  useEffect(() => {
    const idx = items.findIndex((item) => item.href === pathname);
    setActiveIndex(idx);
  }, [pathname]);

  const measure = useCallback(() => {
    const activeCategory = categoryRefs.current[activeIndex];
    const parent = parentRef.current;
    // console.log('활성화된 카테고리 : ', activeCategory);

    if (activeCategory && parent) {
      const categoryRect = activeCategory.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();

      setActiveX(Math.floor(categoryRect.x - parentRect.x - (paddingX ?? 0)));
      setActiveHeight(Math.floor(categoryRect.height + (paddingY ?? 0) * 2));
      setActiveWidth(Math.floor(categoryRect.width + (paddingX ?? 0) * 2));
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    // measure();
    const ul = parentRef.current;
    if (!ul) return;

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });

    resizeObserver.observe(ul, { box: 'border-box' });
    return () => resizeObserver.disconnect();
  }, [activeIndex, measure]);

  return (
    <ul ref={parentRef} className={tw('relative flex items-center justify-center', parentStyle)}>
      {items.map(({ href, label }, index) => (
        <li
          ref={(el) => {
            if (el) {
              categoryRefs.current[index] = el;
            }
          }}
          key={href}
          className="z-10"
        >
          <Link
            href={href ?? '/'}
            className={pathname.includes(href ?? '/') ? activeTextStyle : inactiveTextStyle}
          >
            {label}
          </Link>
        </li>
      ))}
      <li
        aria-hidden="true"
        role="presentation"
        className={tw(
          'absolute transition-[left,width,height] duration-300 ease-out',
          highlightStyle,
        )}
        style={{ left: activeX ?? 0, width: activeWidth ?? 0, height: activeHeight ?? 0 }}
      ></li>
    </ul>
  );
}
export default ToggleSwitchNavigation;
