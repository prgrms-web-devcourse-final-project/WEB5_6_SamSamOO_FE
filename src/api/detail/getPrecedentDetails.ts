import { PrecedentDetailsResponse } from '@/types/precedent';

export const getPrecedentDetails = async (id: string | number) => {
  const queryID = String(id);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/precedent/${queryID}`, {
    method: 'GET',
    next: { revalidate: 3600 },
  });
  if (response.status === 401) throw { status: 401 };
  if (!response.ok) throw new Error(`판례 데이터 패치 오류 : HTTP ${response.status}`);
  return (await response.json()) as PrecedentDetailsResponse;
};
