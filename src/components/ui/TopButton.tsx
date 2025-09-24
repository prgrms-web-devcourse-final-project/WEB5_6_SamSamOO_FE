'use client';

import tw from '@/utils/tw';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function TopButton() {
  const [showVisible, setShowVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleShowTopButton = () => {
      const scrollTop = window.pageYOffset;
      setShowVisible(scrollTop > 200);
    };
    window.addEventListener('scroll', handleShowTopButton);
    return () => window.removeEventListener('scroll', handleShowTopButton);
  }, []);

  const handleClick = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      title="최상단 이동"
      className={tw(
        'fixed right-8 bottom-22 opacity-0 transition-opacity ease-in-out pointer-events-none',
        showVisible && 'opacity-100 pointer-events-auto',
      )}
      onClick={handleClick}
    >
      <Image
        className="drop-shadow-[var(--shadow-floating)]"
        src="/icons/floatingUpButton.svg"
        width={50}
        height={50}
        alt="최상단"
      />
    </button>
  );
}
export default TopButton;
