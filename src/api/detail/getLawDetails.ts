import { LawDetailsResponse } from '@/types/law';

export const getLawDetails = async (id: string | number) => {
  const queryID = String(id);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/law/${queryID}`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });
  //   if (response.status === 401) throw { status: 401 };
  //   if (!response.ok) throw new Error(`법령 데이터 패치 오류 : HTTP ${response.status}`);

  if (response.status === 401 || !response.ok) return null;

  return (await response.json()) as LawDetailsResponse;
};
