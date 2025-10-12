'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import tw from '@/utils/tw';

function ToggleThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(() => (resolvedTheme === 'dark' ? true : false));
  const [animation, setAnimation] = useState<null | 'toDark' | 'toLight'>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isDark) {
      setTheme('dark');
      setAnimation('toDark');
    } else {
      setAnimation('toLight');
      setTheme('light');
    }
  }, [isDark]);

  if (!mounted) {
    return (
      <div
        className={tw('flex items-center w-[72px] h-[36px] rounded-[67px] p-1 bg-transparent')}
      ></div>
    );
  }

  const iconStyle = 'w-[28px] h-[26px] flex items-center justify-center bg-white rounded-full';

  return (
    <button
      type="button"
      className={tw(
        'flex items-center w-[60px] h-[32px] rounded-[67px] p-1 bg-[#E5E5E5] ',
        isDark && 'bg-[#404040]',
      )}
      onClick={() => {
        setIsDark((prev) => !prev);
      }}
    >
      <div
        className={tw(iconStyle, animation === 'toLight' ? 'animate-toLight' : 'animate-toDark')}
      >
        <Image
          src={isDark ? '/icons/dark.svg' : '/icons/light.svg'}
          width={20}
          height={20}
          alt={isDark ? '다크 모드' : '라이트 모드'}
        />
      </div>
    </button>
  );
}
export default ToggleThemeButton;
