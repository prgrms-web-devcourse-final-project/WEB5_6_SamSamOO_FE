import { ReactNode } from 'react';
import { getUserFromCookies } from '@/utils/getUserFromCookies';
import UserProvider from '@/components/provider/UserProvider';

/**
 * 서버 컴포넌트
 * - SSR 단계에서 쿠키를 읽고 유저 프로필을 조회
 * - 조회한 유저 데이터를 UserProvider(initialUser)에 전달
 */
export default async function ServerUserProvider({ children }: { children: ReactNode }) {
  const user = await getUserFromCookies();

  return <UserProvider initialUser={user}>{children}</UserProvider>;
}
