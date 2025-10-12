'use client';

import { useEffect } from 'react';

export default function OauthFailurePage() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage({ type: 'OAUTH_FAILURE' }, window.location.origin);
    }

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#D32F2F',
        fontSize: '1.1rem',
        textAlign: 'center',
      }}
    >
      <p>❌ 소셜 로그인에 실패했습니다.</p>
      <p>창이 곧 닫힙니다...</p>
    </div>
  );
}
