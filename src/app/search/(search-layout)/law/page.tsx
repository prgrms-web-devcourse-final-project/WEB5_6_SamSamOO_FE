import { Metadata } from 'next';

import LawSearchResults from '@/components/features/search/LawSearchResults';

import { getLawSearchResults } from '@/api/getLawSearchResults';

export const metadata: Metadata = {
  title: '바로 | 법령 검색',
  description: '바로 BaLaw 판례 검색 페이지입니다',
};

async function Page({ searchParams }: { searchParams: Promise<{ search_query?: string }> }) {
  console.log(searchParams);
  const { search_query } = await searchParams;
  const getData = async () => {
    const response = await getLawSearchResults({
      lawName: search_query ?? null,
      pageNumber: 0,
      pageSize: 10,
    });
    return response;
  };
  const payload = await getData();
  console.log(payload);

  return (
    <>
      <LawSearchResults content={payload.content} />
    </>
  );
}
export default Page;
