'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import ToggleThemeButton from './ToggleThemeButton';
import { useUserStore } from '@/store/useUserStore';

const mainNavItems = [
  { href: '/ai', label: 'AI 상담' },
  { href: '/search', label: '법령ㆍ판례 검색' },
  { href: '/vote', label: '투표' },
];

const subNavItems = [
  { href: '/mypage', label: '마이페이지' },
  { href: '/login', label: '로그인' },
  // { href: '/register', label: '회원가입' },
];

function Header() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  return (
    <header className="fixed w-full grid grid-cols-[1fr_2fr_1fr] h-[70px] pl-[30px] pr-8 items-center justify-between text-2xl font-bold text-primary-black dark:text-primary-white bg-[rgba(255,255,255,0.89)] shadow-[0_4px_14.2px_0_rgba(0,0,0,0.25)] dark:bg-[rgba(0,0,0,0.89)] dark:shadow-[0_1px_2px_0_rgba(213,213,213,0.25)]">
      <div className="justify-self-start">
        <Link href="/">
          <>
            <Image
              className="block dark:hidden"
              src="/icons/balawLight.svg"
              width={60}
              height={34}
              alt="바로 BaLaw"
            />
            <Image
              className="hidden dark:block"
              src="/icons/balawDark.svg"
              width={60}
              height={34}
              alt="바로 BaLaw"
            />
          </>
        </Link>
      </div>
      <nav>
        <h2 className="sr-only">메인 메뉴</h2>
        <ul className="flex gap-4 justify-self-center">
          {mainNavItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? 'text-accent' : 'text-black dark:text-white'}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="flex gap-4 justify-self-end">
        <h2 className="sr-only">서브 메뉴</h2>
        <ToggleThemeButton />
        <ul className="flex gap-4">
          {user ? (
            <>
              {/* 로그인 상태 */}
              <li>
                <Link href="/mypage" className={pathname === '/mypage' ? 'text-accent' : ''}>
                  <Image
                    className="block dark:hidden"
                    src="/icons/profileLight.svg"
                    width={34}
                    height={34}
                    alt="마이페이지"
                  />
                  <Image
                    className="hidden dark:block"
                    src="/icons/profileDark.svg"
                    width={34}
                    height={34}
                    alt="마이페이지"
                  />
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    // TODO: 로그아웃 API 호출 + store.clearUser()
                  }}
                  className="hover:text-accent"
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              {/* 비로그인 상태 */}
              <li>
                <Link href="/login" className={pathname === '/login' ? 'text-accent' : ''}>
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
