import 'server-only';
import { cookies } from 'next/headers';
import { fetchUser } from '@/api/account/fetchUserProfile';
import { User } from '@/types/User';

/**
 * SSR 환경에서 HttpOnly 쿠키(`accessToken`, `refreshToken`)를 확인하고,
 * 유효한 경우 백엔드 `/auth/me` 엔드포인트를 호출하여
 * 현재 로그인된 유저 프로필을 반환하는 함수.
 *
 * - 서버 전용(`server-only`) 함수로, 클라이언트 컴포넌트에서는 호출할 수 없음
 * - 쿠키가 모두 없으면 `null` 반환
 * - 쿠키가 있으면 모든 쿠키를 직렬화하여 `fetchUser` 호출에 전달
 * - 백엔드가 쿠키를 검증해 유저 프로필을 반환하지 못하면 `null` 반환
 *
 * @returns {Promise<User | null>}
 *   - 성공 시: 유저 프로필 객체
 *   - 실패/비로그인 시: `null`
 *
 * @example
 * // 서버 컴포넌트에서 유저 확인
 * import { getUserFromCookies } from '@/utils/getUserFromCookies';
 *
 * export default async function Page() {
 *   const user = await getUserFromCookies();
 *   if (user) {
 *     return <p>로그인된 사용자: {user.name}</p>;
 *   }
 *   return <p>비로그인 상태입니다.</p>;
 * }
 */

export async function getUserFromCookies(): Promise<User | null> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  if (!accessToken && !refreshToken) {
    return null;
  }

  const cookieString = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return await fetchUser(cookieString);
}
