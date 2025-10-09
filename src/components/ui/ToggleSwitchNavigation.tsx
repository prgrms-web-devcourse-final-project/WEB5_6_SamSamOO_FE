'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import tw from '@/utils/tw';
import { NavigationItem } from '@/types/navigationItems';

import { categoryItems } from '../features/search/navigationItems';

interface Props {
  items?: NavigationItem[];
  paddingX?: number;
  paddingY?: number;
  parentStyle?: string;
  activeBlockStyle?: string;
  activeTextStyle?: string;
  inactiveTextStyle?: string;
}

const defaultParentStyle =
  'px-8 py-3 gap-[83px] bg-[#0D1846] rounded-full font-medium text-xl text-primary-white dark:bg-primary-black dark:border dark:border-border-gray1';
const defaultActiveBlockStyle = 'bg-background-white rounded-4xl';
const defaultActiveTextStyle = 'text-primary-black';
const defaultInactiveTextStyle = 'text-primary-white';

function ToggleSwitchNavigation({
  items = categoryItems,
  paddingX,
  paddingY,
  parentStyle = defaultParentStyle,
  activeBlockStyle = defaultActiveBlockStyle,
  activeTextStyle = defaultActiveTextStyle,
  inactiveTextStyle = defaultInactiveTextStyle,
}: Props) {
  const pathname = usePathname();
  const parentRef = useRef<HTMLUListElement | null>(null);
  const categoryRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeLeft, setActiveLeft] = useState<number | null>(null);
  const [activeHeight, setActiveHeight] = useState<number | null>(null);
  const [activeWidth, setActiveWidth] = useState<number | null>(null);

  useEffect(() => {
    // const idx = items.findIndex((item) => item.href === pathname);
    const idx = items.findIndex((item) => pathname.includes(item.href!));
    setActiveIndex(idx);
  }, [pathname, items]);

  const measure = useCallback(() => {
    const activeCategory = categoryRefs.current[activeIndex];
    const parent = parentRef.current;

    if (activeCategory && parent) {
      const categoryRect = activeCategory.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const activeBlockLeft = Math.floor(categoryRect.x - parentRect.x - (paddingX ?? 0));
      const activeBlockHeight = Math.floor(categoryRect.height + (paddingY ?? 0) * 2);
      const activeBlockWidth = Math.floor(categoryRect.width + (paddingX ?? 0) * 2);

      setActiveLeft(activeBlockLeft);
      setActiveHeight(activeBlockHeight);
      setActiveWidth(activeBlockWidth);
    }
  }, [activeIndex, paddingX, paddingY]);

  useLayoutEffect(() => {
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
        className={tw('absolute transition-[left] duration-300 ease-out', activeBlockStyle)}
        style={{ left: activeLeft ?? 0, width: activeWidth ?? 0, height: activeHeight ?? 0 }}
      ></li>
    </ul>
  );
}
export default ToggleSwitchNavigation;
