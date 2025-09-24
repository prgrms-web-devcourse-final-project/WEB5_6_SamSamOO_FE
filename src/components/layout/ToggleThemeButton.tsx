'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import tw from '@/utils/tw';

function ToggleThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [animation, setAnimation] = useState<null | 'toDark' | 'toLight'>(null);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 시스템값이 다크일때 컬러 변경 필요
    return (
      <div className="flex items-center w-[72px] h-[36px] rounded-[67px] p-1 bg-[#E5E5E5]"></div>
    );
  }

  const iconStyle = 'w-[28px] h-[26px] flex items-center justify-center bg-white rounded-full';

  // 시스템 값으로만 변경할때 다크모드 아이콘 표시 위치 변경 필요
  return (
    <div
      className={tw(
        'flex items-center w-[72px] h-[32px] rounded-[67px] p-1 bg-[#E5E5E5]',
        isDark && 'bg-[#404040]',
      )}
    >
      <button
        className={tw(iconStyle, isDark && 'hidden', animation === 'toLight' && 'animate-toLight')}
        type="button"
        onClick={() => {
          setTheme('dark');
          setAnimation('toDark');
        }}
      >
        <Image src="/icons/light.svg" width={20} height={20} alt="라이트 모드" />
      </button>
      <button
        className={tw(iconStyle, !isDark && 'hidden', animation === 'toDark' && 'animate-toDark')}
        type="button"
        onClick={() => {
          setTheme('light');
          setAnimation('toLight');
        }}
      >
        <Image src="/icons/dark.svg" width={20} height={20} alt="다크 모드" />
      </button>
    </div>
  );
}
export default ToggleThemeButton;
