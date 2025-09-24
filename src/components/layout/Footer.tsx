'use client';

import Image from 'next/image';

import tw from '@/utils/tw';

function Footer() {
  const darkStyle =
    'dark:text-primary-white dark:bg-[rgba(0,0,0,0.89)] dark:[0_-1px_2px_0_rgba(194,194,194,0.25)]';

  return (
    <footer
      className={tw(
        'h-[50px] px-8 flex items-center justify-between text-primary-black font-light bg-[rgba(255,255,255,0.89)] shadow-[0_-3px_14.2px_0_rgba(0,0,0,0.25)]',
        darkStyle,
      )}
    >
      <p>Copyright &copy; 2025 BaLaw. All Rights Reserved</p>
      <div className="flex gap-4">
        <a
          href="https://github.com/prgrms-web-devcourse-final-project/WEB5_6_SamSamOO_FE"
          target="_blank"
          rel="noreferrer"
          type="button"
          title="슬라이도 피드백 남기기"
        >
          <Image
            className="w-7 h-auto"
            src="/icons/slido.svg"
            alt="슬라이도"
            width={28}
            height={28}
            unoptimized
          />
        </a>
        <a
          href="https://github.com/prgrms-web-devcourse-final-project/WEB5_6_SamSamOO_FE"
          target="_blank"
          rel="noreferrer"
          type="button"
          title="깃허브 바로가기"
          className="flex"
        >
          <Image
            className="block dark:hidden w-7 h-auto"
            src="/icons/githubLight.svg"
            alt="깃허브"
            width={28}
            height={28}
          />
          <Image
            className="hidden dark:block w-7 h-auto"
            src="/icons/githubDark.svg"
            alt="깃허브"
            width={28}
            height={28}
          />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
