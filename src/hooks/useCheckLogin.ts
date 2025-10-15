import { useUserStore } from '@/store/useUserStore';
import { showErrorToast } from '@/utils/showToast';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';

export function useCheckLogin() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isLoading = useUserStore((state) => state.isLoading);
  const pathname = usePathname();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    console.log(isLoading, 'isLoading)');
    console.log(isAuthenticated, 'isAuthenticated');
    // 로딩 중이면 아무것도 하지 않음
    if (isLoading) return;

    if (!isAuthenticated) {
      showErrorToast('로그인이 필요한 서비스입니다.');
      router.push(`/login`);
    }
  }, [isAuthenticated, router, isLoading, hydrated]);
}
