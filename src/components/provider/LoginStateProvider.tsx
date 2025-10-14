'use client';
import { useUserStore } from '@/store/useUserStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginStateProvider({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const pathname = usePathname();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isRedirecting) return;

    if (!isAuthenticated) {
      setIsRedirecting(true);
      const params = new URLSearchParams({
        message: 'login-required',
        from: pathname,
      });
      router.push(`/login?${params.toString()}`);
    }
  }, [isAuthenticated, pathname, router, isRedirecting]);

  if (!isAuthenticated || isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>로그인 페이지로 이동 중...</div>
      </div>
    );
  }

  return <>{children}</>;
}
