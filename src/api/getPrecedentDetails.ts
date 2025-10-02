import { PrecedentDetailsResponse } from '@/types/precedent';

export const getPrecedentDetails = async (id: string | number) => {
  const queryID = String(id);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/precedent/${queryID}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as PrecedentDetailsResponse;
  } catch (error) {
    console.error('판례 상세결과 패치에러: ', error);
    throw error;
  }
};
