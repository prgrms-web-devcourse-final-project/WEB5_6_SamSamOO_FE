import { LawRequest, LawResponse } from '@/types/law';

export const getLawSearchResults = async (body: LawRequest) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/law/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as LawResponse;
  } catch (error) {
    console.error('법령 검색결과 패치에러: ', error);
    throw error;
  }
};
