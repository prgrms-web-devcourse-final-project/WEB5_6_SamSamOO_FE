'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

import KakaoIcon from '@/assets/icons/kakao.svg';
import NaverIcon from '@/assets/icons/naver.svg';
import { showErrorToast } from '@/utils/showToast';

interface Props {
  mode?: 'login' | 'signup';
  params?: { message?: string; from?: string };
}

export default function Oauth({ mode = 'login', params }: Props) {
  const router = useRouter();
  const setSession = useUserStore((state) => state.setSession);

  const kakaoText = `카카오 ${mode === 'signup' ? '회원가입' : '로그인'}`;
  const naverText = `네이버 ${mode === 'signup' ? '회원가입' : '로그인'}`;

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

        console.log('Params.from', params);
        if (params && params.from) {
          router.replace(params.from);
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
    <div className="mb-6 flex w-full gap-6">
      <button
        type="button"
        className="h-13 flex flex-1 items-center justify-center gap-3 rounded-sm bg-[#03C75A] px-9 text-primary-white"
        onClick={() => handleOauthPopup('naver')}
      >
        <NaverIcon width={18} height={18} />
        <span>{naverText}</span>
      </button>

      <button
        type="button"
        className="h-13 flex flex-1 items-center justify-center gap-3 rounded-sm bg-[#FEE500] px-9 text-primary-black"
        onClick={() => handleOauthPopup('kakao')}
      >
        <KakaoIcon width={20} height={20} />
        <span>{kakaoText}</span>
      </button>
    </div>
  );
}
