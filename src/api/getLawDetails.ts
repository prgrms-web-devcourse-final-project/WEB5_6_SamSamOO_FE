import { LawDetailsResponse } from '@/types/law';

export const getLawDetails = async (id: string | number) => {
  const queryID = String(id);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/law/${queryID}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as LawDetailsResponse;
  } catch (error) {
    console.error('법령 상세결과 패치에러: ', error);
    throw error;
  }
};
