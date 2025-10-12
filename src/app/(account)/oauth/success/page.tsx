'use client';

import { useEffect } from 'react';

export default function OauthSuccessPage() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'OAUTH_SUCCESS' }, window.location.origin);
    }

    // 약간의 지연 후 창 닫기 (postMessage 전송 후 안전하게 닫기)
    const timer = setTimeout(() => {
      window.close();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.1rem',
      }}
    >
      로그인 처리가 완료되었습니다. 잠시 후 창이 닫힙니다...
    </div>
  );
}
