'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import tw from '@/utils/tw';

function ScrollToTopButton() {
  const [showVisible, setShowVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleShowScrollButton = () => {
      const scroll = window.pageYOffset;
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;

      setShowVisible(scroll > 200 && scroll < maxScroll - 200);
    };
    window.addEventListener('scroll', handleShowScrollButton);
    return () => window.removeEventListener('scroll', handleShowScrollButton);
  }, []);

  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
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
        className={tw('drop-shadow-[var(--shadow-floating)]')}
        src="/icons/floatingUpButton.svg"
        width={50}
        height={50}
        alt="최상단"
      />
    </button>
  );
}
export default ScrollToTopButton;
