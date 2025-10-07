import 'server-only';
import { cookies } from 'next/headers';
import { SessionSnapshot } from '@/types/Session';

const UNVERIFIED_SESSION: SessionSnapshot = {
  isAuthenticated: false,
  user: null,
};

export async function getSession(): Promise<SessionSnapshot> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    return UNVERIFIED_SESSION;
  }

  /**
   * TODO: 백엔드 팀에서 서명 키(signing key) 정보를 공유받으면 활성화하기.
   *
   * import { jwtVerify } from 'jose';
   *
   * const secret = process.env.AUTH_JWT_SECRET;
   * if (!secret) {
   *   // 서명 키가 없으면 토큰을 검증할 수 없으므로,
   *   // 인증되지 않은 상태로 처리.
   *   return UNVERIFIED_SESSION;
   * }
   *
   * try {
   *   await jwtVerify(accessToken.value, new TextEncoder().encode(secret));
   * } catch {
   *   // 검증에 실패한 경우(만료 또는 변조 등),
   *   // 인증되지 않은 세션으로 간주.
   *   return UNVERIFIED_SESSION;
   * }
   */

  return {
    isAuthenticated: true,
    user: null,
  };
}
