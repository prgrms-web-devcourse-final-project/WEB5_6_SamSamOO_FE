'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Hamburger from '@/assets/icons/hamburger.svg';

import ToggleThemeButton from './ToggleThemeButton';
import { useUserStore } from '@/store/useUserStore';
import { logout } from '@/api/account/logout';
import { showErrorToast } from '@/utils/showToast';
import { useRef, useState } from 'react';
import tw from '@/utils/tw';
import useClosePopup from '@/hooks/useClosePopup';

const mainNavItems = [
  { href: '/advice', label: 'AI 상담' },
  { href: '/search/total', label: '법령ㆍ판례 검색' },
  { href: '/vote', label: '투표' },
];

function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const clearSession = useUserStore((state) => state.clearSession);
  const hamburgerRef = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout();
      clearSession();
      router.replace('/');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showErrorToast('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  };
  useClosePopup({ onClose: () => setIsOpen(false), isOpen, ref: hamburgerRef });

  return (
    <header
      className={tw(
        'fixed z-40 w-full grid grid-cols-[1fr_3fr_2.5fr] sm:grid-cols-[1fr_2fr_1fr] h-[60px] pl-[30px] pr-8 items-center justify-between text-xl font-bold text-primary-black dark:text-primary-white shadow-[0_4px_14.2px_0_rgba(0,0,0,0.25)]  dark:shadow-[0_1px_2px_0_rgba(213,213,213,0.25)]',
        isOpen
          ? 'bg-[rgba(255,255,255)] dark:bg-[rgba(0,0,0)]'
          : 'bg-[rgba(255,255,255,0.89)] dark:bg-[rgba(0,0,0,0.89)]',
      )}
    >
      <div className="justify-self-start">
        <Link href="/">
          <>
            <Image
              className="block dark:hidden"
              src="/images/balawLight.png"
              width={61}
              height={32}
              style={{ height: 'auto' }}
              alt="바로 BaLaw"
            />
            <Image
              className="hidden dark:block"
              src="/images/balawDark.png"
              width={61}
              height={32}
              style={{ height: 'auto' }}
              alt="바로 BaLaw"
            />
          </>
        </Link>
      </div>
      <nav>
        <h2 className="sr-only">메인 메뉴</h2>
        <button type="button" className="flex sm:hidden" onClick={() => setIsOpen((prev) => !prev)}>
          <Hamburger className="dark:text-primary-white w-8 h-4" />
        </button>
        {isOpen && (
          <ul
            ref={hamburgerRef}
            className="absolute bg-white dark:bg-black w-full left-0 top-15 flex sm:hidden gap-11 items-center justify-between px-18 py-20 shadow-[0_4px_6.2px_0_rgba(0,0,0,0.15)]  dark:shadow-[0_1px_2px_0_rgba(213,213,213,0.25)]"
          >
            {mainNavItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    pathname.includes(href.split('/')[1])
                      ? 'text-brand-accent'
                      : 'text-primary-black dark:text-primary-white'
                  }
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <ul className="hidden sm:flex gap-11 justify-self-center">
          {mainNavItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={
                  pathname.includes(href.split('/')[1])
                    ? 'text-brand-accent'
                    : 'text-primary-black dark:text-primary-white'
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="flex gap-4 justify-self-end items-center">
        <h2 className="sr-only">서브 메뉴</h2>
        <ToggleThemeButton />
        <ul className="flex gap-4">
          {isAuthenticated ? (
            <>
              {/* 로그인 상태 */}
              <li>
                <Link href="/mypage" className={pathname === '/mypage' ? 'text-brand-accent' : ''}>
                  <Image
                    className="block dark:hidden"
                    src="/images/profileLight.png"
                    width={34}
                    height={34}
                    alt="마이페이지"
                  />
                  <Image
                    className="hidden dark:block"
                    src="/images/profileDark.png"
                    width={34}
                    height={34}
                    alt="마이페이지"
                  />
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-brand-accent">
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              {/* 비로그인 상태 */}
              <li>
                <Link href="/login" className={pathname === '/login' ? 'text-brand-accent' : ''}>
                  로그인
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
