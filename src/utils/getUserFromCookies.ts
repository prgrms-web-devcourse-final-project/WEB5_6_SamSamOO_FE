import 'server-only';
import { cookies } from 'next/headers';
import { fetchUser } from '@/api/account/fetchUserProfile';
import { User } from '@/types/User';

/**
 * SSR 환경에서 HttpOnly 쿠키(`access_token`)를 확인하고,
 * 유효한 경우 백엔드 `/auth/me` 엔드포인트를 호출하여
 * 현재 로그인된 유저 프로필을 가져오는 함수.
 *
 * @returns {Promise<User | null>} 유저 프로필 객체 또는 `null` (비로그인/만료)
 *
 * @example
 * const user = await getUserFromCookies();
 * if (user) {
 *   console.log(`로그인된 사용자: ${user.name}`);
 * } else {
 *   console.log("비로그인 상태");
 * }
 */
export async function getUserFromCookies(): Promise<User | null> {
  const cookieStore = await cookies();
  console.log(cookieStore.getAll(), '서버에서 보이는 쿠키 전체');
  const token = cookieStore.get('accessToken');

  if (!token) {
    return null;
  }

  return await fetchUser();
}
