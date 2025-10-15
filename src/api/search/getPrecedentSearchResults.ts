import { PrecedentRequest, PrecedentResponse } from '@/types/precedent';

export const getPrecedentSearchResults = async (body: PrecedentRequest) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/precedent/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    // console.log(response);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as PrecedentResponse;
  } catch (error) {
    console.error('판례 검색결과 패치에러: ', error);
    throw error;
  }
};
