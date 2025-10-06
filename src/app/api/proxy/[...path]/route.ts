/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

async function handler(method: string, request: NextRequest, params: { path: string[] }) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const endpoint = params.path.join('/');

    // ✅ 쿠키 읽기 - 3가지 방법 모두 시도
    console.log('=== 쿠키 디버깅 ===');

    // 방법 1: cookies()
    const cookieStore = await cookies();
    const cookiesFromStore = cookieStore.getAll();
    console.log('1. cookies():', cookiesFromStore);

    // 방법 2: request.headers
    const cookieHeader = request.headers.get('cookie');
    console.log('2. request.headers.get("cookie"):', cookieHeader);

    // 방법 3: request.cookies
    const cookiesFromRequest = request.cookies.getAll();
    console.log('3. request.cookies:', cookiesFromRequest);

    // ✅ 쿠키 문자열 만들기 (우선순위: request.headers > cookies())
    let cookieString = cookieHeader || '';

    if (!cookieString && cookiesFromStore.length > 0) {
      cookieString = cookiesFromStore.map((c) => `${c.name}=${c.value}`).join('; ');
    }

    console.log('최종 쿠키 문자열:', cookieString);

    const body = !['GET', 'HEAD'].includes(method) ? await request.text() : undefined;

    console.log('백엔드 호출:', `${apiUrl}/api/${endpoint}`);
    console.log('백엔드 바디:', body);

    // 백엔드 API 호출
    const response = await fetch(`${apiUrl}/api/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(cookieString ? { Cookie: cookieString } : {}),
      },
      body,
    });

    console.log('백엔드 응답:', response);
    console.log('백엔드 응답 상태:', response.status);

    // // ✅ 쿠키 설정 (API Route에서는 항상 가능!)
    // const setCookieHeader = response.headers.get('set-cookie');
    // if (setCookieHeader) {
    //   console.log('백엔드에서 받은 Set-Cookie:', setCookieHeader);

    //   const [cookieContent] = setCookieHeader.split(';');
    //   const [name, value] = cookieContent.split('=');

    //   if (name && value) {
    //     cookieStore.set(name.trim(), value.trim(), {
    //       httpOnly: true,
    //       secure: process.env.NODE_ENV === 'production',
    //       sameSite: 'lax',
    //       path: '/',
    //     });
    //     console.log('쿠키 설정 완료:', name.trim());
    //   }
    // }
    // console.log('cookieStore', cookieStore);
    const data = await response.json();
    console.log('data', data);
    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });
    // return Response.json(data, { status: response.status });
    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders.length > 0) {
      console.log('백엔드 Set-Cookie:', setCookieHeaders);

      setCookieHeaders.forEach((cookieString) => {
        // Set-Cookie 문자열 파싱
        const parsed = parseCookie(cookieString);

        // ✅ NextResponse.cookies.set() 사용
        nextResponse.cookies.set(parsed.name, parsed.value, parsed.options);

        console.log(`✅ 쿠키 설정: ${parsed.name}=${parsed.value}`);
      });
    }
    return nextResponse;
  } catch (error) {
    console.error('=== 에러 발생 ===');
    console.error(error);

    return Response.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// Set-Cookie 문자열 파싱 함수
function parseCookie(cookieString: string) {
  const parts = cookieString.split(';').map((p) => p.trim());
  const [nameValue] = parts;
  const [name, value] = nameValue.split('=');
  //
  const options: any = {};

  parts.slice(1).forEach((part) => {
    const lower = part.toLowerCase();

    if (lower === 'httponly') {
      options.httpOnly = true;
    } else if (lower === 'secure') {
      options.secure = true;
    } else if (lower.startsWith('path=')) {
      options.path = part.split('=')[1];
    } else if (lower.startsWith('max-age=')) {
      options.maxAge = parseInt(part.split('=')[1]);
    } else if (lower.startsWith('samesite=')) {
      options.sameSite = part.split('=')[1].toLowerCase();
    } else if (lower.startsWith('domain=')) {
      options.domain = part.split('=')[1];
    }
  });
  console.log('options', options);
  return { name: name.trim(), value: value.trim(), options };
}

export const GET = (req: NextRequest, ctx: any) => handler('GET', req, ctx.params);
export const POST = (req: NextRequest, ctx: any) => handler('POST', req, ctx.params);
export const PUT = (req: NextRequest, ctx: any) => handler('PUT', req, ctx.params);
export const DELETE = (req: NextRequest, ctx: any) => handler('DELETE', req, ctx.params);
