// import { LawRequest, LawResponse } from '@/types/law';

// export const getLawSearchResults = async (body: LawRequest) => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/law/search`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'no-store',
//       body: JSON.stringify(body),
//     });
//     console.log(response);
//     if (!response.ok) throw new Error(`HTTP ${response.status}`);
//     return (await response.json()) as LawResponse;
//   } catch (error) {
//     console.error('법령 검색결과 패치에러: ', error);
//     throw error;
//   }
// };
import { LawRequest, LawResponse } from '@/types/law';

export const getLawSearchResults = async (body: LawRequest) => {
  console.group('[법령 검색 요청]');
  console.log('요청 URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/law/search`);
  console.log('요청 Body:', body);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/law/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(body),
    });

    console.log('HTTP 상태 코드:', response.status);

    const data = await response.json().catch(() => {
      console.warn('⚠️ 응답을 JSON으로 파싱하지 못했습니다.');
      return null;
    });

    if (!response.ok) {
      console.error('❌ 요청 실패:', {
        status: response.status,
        statusText: response.statusText,
        responseBody: data,
      });
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log('✅ 요청 성공:', data);
    return data as LawResponse;
  } catch (error) {
    console.error('🚨 법령 검색결과 패치 에러:', error);
    throw error;
  } finally {
    console.groupEnd();
  }
};
