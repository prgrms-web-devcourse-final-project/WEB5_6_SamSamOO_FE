'use client';

import { ReactNode, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { User } from '@/types/User';

interface UserProviderProps {
  initialUser: User | null;
  children: ReactNode;
}

/**
 * SSR 단계에서 내려온 유저 데이터를 zustand 전역 store에 하이드레이션하는 Provider
 *
 * - 서버컴포넌트(ServerUserProvider)가 initialUser를 내려줌
 * - 클라이언트 진입 시 zustand store에 초기화
 * - 단, `initialUser`가 null일 경우에는 기존 상태를 덮어씌우지 않음
 *
 * @example
 * <UserProvider initialUser={user}>
 *   <Header />
 *   <main>{children}</main>
 * </UserProvider>
 */
export default function UserProvider({ initialUser, children }: UserProviderProps) {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (!user && initialUser) {
      console.log(initialUser, 'UserProvider.tsx에서 초기값을 하이드레이션합니다');
      setUser(initialUser);
    }
  }, [initialUser, user, setUser]);

  return <>{children}</>;
}
