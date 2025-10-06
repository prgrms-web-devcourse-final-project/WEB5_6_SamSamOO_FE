/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from 'next/headers';

type ParsedCookie = {
  name: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  domain?: string;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
  expires?: Date | undefined;
  // 원본 문자열 보관(디버깅용)
  raw?: string;
};

/**
 * 쿠키의 토큰의 API헤더의 형식에 맞게 가공하는 함수
 * @returns
 */
export async function getCookieString() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    return null;
  }

  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');
}

/**
 * 갱신된 토큰을 웹 브라우저 쿠키에 저장하는 함수
 * @param headers
 * @returns
 */
export async function setCookieBrowser(headers: Headers) {
  if (!headers) return null;
  const cookieHeaders: string[] = [];
  headers.forEach((key, value) => {
    if (key.toLowerCase() === 'set-cookie') {
      cookieHeaders.push(value);
    }
  });

  if (cookieHeaders.length === 0) return null;

  const parsed: ParsedCookie[] = cookieHeaders
    .map((val) => parseSetCookieString(val))
    .filter(Boolean) as ParsedCookie[];
  try {
    // nextCookies()는 server 환경(서버 액션/route handler)에서만 동작
    const cookieStore = await cookies();

    parsed.forEach((p) => {
      console.log('Setting cookie:', p.name, {
        httpOnly: p.httpOnly,
        secure: p.secure,
        path: p.path,
        sameSite: p.sameSite,
      });
      // next/headers cookies().set은 다음 옵션들을 사용
      // Domain은 보통 브라우저에서 무시/제한될 수 있으므로 따로 처리하지 않음
      cookieStore.set({
        name: p.name,
        value: p.value,
        httpOnly: !!p.httpOnly,
        secure: !!p.secure,
        path: p.path ?? '/',
        sameSite: p.sameSite ?? 'lax',
        // next/headers는 expires / maxAge 옵션을 Object에 맞추어 전달
        ...(p.maxAge ? { maxAge: p.maxAge } : {}),
        ...(p.expires ? { expires: p.expires } : {}),
      } as any);
    });
  } catch (e) {
    // cookies()가 사용 불가한 컨텍스트라면 에러 발생할 수 있음 -> 무시하고 로그 처리
    console.warn(
      'Could not sync cookies to response (not running in server action/route handler?)',
      e,
    );
  }
}

/**
 * API 응답 헤더에 있는 토큰 정보를 웹브라우저에 맞게 가공하는 함수
 * @param setCookie
 * @returns
 */
export function parseSetCookieString(setCookie: string): ParsedCookie | null {
  if (!setCookie) return null;
  const parts = setCookie.split(';').map((p) => p.trim());
  const [nameValue, ...attrs] = parts;
  const idx = nameValue.indexOf('=');
  if (idx === -1) return null;
  const name = nameValue.slice(0, idx).trim();
  const value = nameValue.slice(idx + 1).trim();

  const cookie: ParsedCookie = { name, value, raw: setCookie };

  for (const attr of attrs) {
    const [kRaw, vRaw] = attr.split('=');
    const key = kRaw.toLowerCase().trim();
    const val = vRaw ? vRaw.trim() : undefined;

    if (key === 'httponly') cookie.httpOnly = true;
    else if (key === 'secure') cookie.secure = true;
    else if (key === 'path' && val) cookie.path = val;
    else if (key === 'domain' && val) cookie.domain = val;
    else if (key === 'samesite' && val) {
      const s = val.toLowerCase();
      if (s === 'lax' || s === 'strict' || s === 'none') cookie.sameSite = s;
    } else if (key === 'max-age' && val) {
      const n = parseInt(val, 10);
      if (!Number.isNaN(n)) cookie.maxAge = n;
    } else if (key === 'expires' && val) {
      const d = new Date(val);
      if (!Number.isNaN(d.getTime())) cookie.expires = d;
    }
  }

  return cookie;
}
