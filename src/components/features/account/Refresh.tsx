'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TokenRefresh } from '@/api/TokenRefreshApi';
import { toast } from 'sonner';

/**
 * Refresh 컴포넌트
 *
 * 마운트 시 토큰을 재발급받고, 성공 시 지정된 경로로 리다이렉트합니다.
 * 실패 시 로그인 페이지로 이동합니다.
 *
 * @param redirectPath 재발급 완료 후 이동할 경로 (예: "/dashboard")
 */
interface Props {
  redirectPath: string;
}

export default function Refresh({ redirectPath }: Props) {
  const router = useRouter();

  useEffect(() => {
    const refresh = async () => {
      try {
        await TokenRefresh();
        toast.success('세션이 갱신되었습니다.');
        router.replace(redirectPath);
      } catch (error) {
        console.error('토큰 재발급 실패:', error);
        toast.error('세션이 만료되었습니다. 다시 로그인해주세요.');
        // 나중에 그냥 로그아웃 상태로 만 전환하고 그대로 이동
      }
    };

    refresh();
  }, [router, redirectPath]);

  return (
    <div className="flex h-screen items-center justify-center text-gray-700">
      <div className="text-center">
        <p className="text-lg font-medium">세션을 갱신 중입니다...</p>
        <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요.</p>
      </div>
    </div>
  );
}
