'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

import KakaoIcon from '@/assets/icons/kakao.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { showErrorToast } from '@/utils/showToast';
import { setSessionLogin } from '@/types/sessionStorage';

interface Props {
  mode?: 'login' | 'signup';
  params?: { message?: string; from?: string };
}

export default function Oauth({ mode = 'login', params }: Props) {
  const router = useRouter();
  const setSession = useUserStore((state) => state.setSession);

  const isSignup = mode === 'signup';
  const kakaoText = isSignup ? '카카오 회원가입' : '카카오 로그인';
  const naverText = isSignup ? '네이버 회원가입' : '네이버 로그인';

  const handleOauthPopup = (provider: 'kakao' | 'naver') => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/oauth2/${provider}?mode=${mode}`,
      `${provider}-oauth2`,
      `width=${width},height=${height},left=${left},top=${top},resizable=no`,
    );
  };

  // postMessage 수신
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === 'OAUTH_SUCCESS') {
        setSession({ isAuthenticated: true, user: null });
        setSessionLogin('social');
        if (params && params.from) {
          window.location.href = params.from;
        } else {
          router.replace('/');
        }
      }

      if (event.data?.type === 'OAUTH_FAILURE') {
        showErrorToast('소셜 로그인에 실패했습니다. 다시 시도해주세요.');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router, setSession]);

  return (
    <div className="mb-6 flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-sm bg-[#03C75A] px-6 py-3 text-primary-white sm:h-13 sm:flex-1 sm:px-9"
        onClick={() => handleOauthPopup('naver')}
      >
        <NaverIcon width={18} height={18} />
        <span className="whitespace-nowrap">{naverText}</span>
      </button>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-sm bg-[#FEE500] px-6 py-3 text-primary-black sm:h-13 sm:flex-1 sm:px-9"
        onClick={() => handleOauthPopup('kakao')}
      >
        <KakaoIcon width={20} height={20} />
        <span className="whitespace-nowrap">{kakaoText}</span>
      </button>
    </div>
  );
}
