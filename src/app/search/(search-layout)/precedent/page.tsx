import { Metadata } from 'next';

import PrecedentSearchResults from '@/components/features/search/PrecedentSearchResults';

import { getPrecedentSearchResults } from '@/api/getPrecedentSearchResults';

export const metadata: Metadata = {
  title: '바로 | 판례 검색',
  description: '바로 BaLaw 판례 검색 페이지입니다',
};

async function Page({ searchParams }: { searchParams: Promise<{ search_query?: string }> }) {
  const { search_query } = await searchParams;
  console.log(search_query);
  const getData = async () => {
    const response = await getPrecedentSearchResults({
      keyword: search_query ?? null,
      pageNumber: 0,
      pageSize: 10,
    });
    return response;
  };
  const payload = await getData();

  return (
    <>
      <PrecedentSearchResults content={payload.content} />
    </>
  );
}
export default Page;
