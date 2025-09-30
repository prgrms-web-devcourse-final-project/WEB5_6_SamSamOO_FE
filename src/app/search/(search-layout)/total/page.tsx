import { Metadata } from 'next';

import LawSearchResults from '@/components/features/search/LawSearchResults';
import PrecedentSearchResults from '@/components/features/search/PrecedentSearchResults';
import { getPrecedentSearchResults } from '@/api/getPrecedentSearchResults';
import { getLawSearchResults } from '@/api/getLawSearchResults';

export const metadata: Metadata = {
  title: '바로 | 통합 검색',
  description: '바로 BaLaw 법령 판례 검색 페이지입니다',
};
// 통신해서 데이터 가져오기
// 통합에서는 어떤 기준으로 렌더링할지..?
async function Page({ searchParams }: { searchParams: Promise<{ search_query?: string }> }) {
  const { search_query } = await searchParams;
  console.log(search_query);
  const getLawData = async () => {
    const response = await getLawSearchResults({
      lawName: search_query ?? null,
      pageNumber: 0,
      pageSize: 5,
    });
    return response;
  };
  const lawPayload = await getLawData();
  const getPrecedentData = async () => {
    const response = await getPrecedentSearchResults({
      keyword: search_query ?? null,
      pageNumber: 0,
      pageSize: 5,
    });
    return response;
  };
  const precedentPayload = await getPrecedentData();

  return (
    <div>
      <LawSearchResults content={lawPayload.content} showTag={true} />
      <PrecedentSearchResults content={precedentPayload.content} showTag={true} />
    </div>
  );
}
export default Page;
