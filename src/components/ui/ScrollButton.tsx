'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import tw from '@/utils/tw';

interface Props {
  direction?: string;
}

function ScrollButton({ direction = 'top' }: Props) {
  const [showVisible, setShowVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleShowScrollButton = () => {
      const scroll = window.pageYOffset;
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;

      if (direction === 'top') {
        setShowVisible(scroll > 200);
      } else {
        if (doc.scrollHeight > window.innerHeight) {
          setShowVisible(scroll < maxScroll - 200);
        } else {
          setShowVisible(false);
        }
      }
    };
    window.addEventListener('scroll', handleShowScrollButton);
    return () => window.removeEventListener('scroll', handleShowScrollButton);
  }, []);

  const handleClick = () => {
    if (direction === 'top') {
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scroll({
        top: document.documentElement.scrollHeight - window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <button
      type="button"
      title="최상단 이동"
      className={tw(
        'fixed right-24 bottom-22 opacity-0 transition-opacity ease-in-out pointer-events-none',
        showVisible && 'opacity-100 pointer-events-auto',
      )}
      onClick={handleClick}
    >
      <Image
        className={tw(
          'drop-shadow-[var(--shadow-floating)]',
          direction === 'bottom' ? 'rotate-180' : '',
        )}
        src="/icons/floatingUpButton.svg"
        width={50}
        height={50}
        alt="최상단"
      />
    </button>
  );
}
export default ScrollButton;
