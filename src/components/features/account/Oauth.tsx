'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  mode?: 'login' | 'signup';
}

export default function Oauth({ mode = 'login' }: Props) {
  const router = useRouter();

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
        console.log('[OAuth] 로그인 성공 메시지 수신');
        // 로그인 성공 → 메인 페이지 이동
        router.push('/');
      }

      if (event.data?.type === 'OAUTH_FAILURE') {
        console.error('[OAuth] 로그인 실패');
        alert('소셜 로그인에 실패했습니다. 다시 시도해주세요.');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  return (
    <div className="mb-6 flex w-full gap-6">
      <button
        type="button"
        className="h-13 flex-1 rounded-sm bg-[#03C75A] px-9 text-primary-white"
        onClick={() => handleOauthPopup('naver')}
      >
        {naverText}
      </button>
      <button
        type="button"
        className="h-13 flex-1 rounded-sm bg-[#FEE500] px-9 text-primary-black"
        onClick={() => handleOauthPopup('kakao')}
      >
        {kakaoText}
      </button>
    </div>
  );
}
