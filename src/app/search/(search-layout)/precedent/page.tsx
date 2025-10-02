import { Metadata } from 'next';

import PrecedentSearchResults from '@/components/features/search/PrecedentSearchResults';

import { getPrecedentSearchResults } from '@/api/getPrecedentSearchResults';
import SetTotalElementsAndPages from '@/components/features/search/SetTotalElementsAndPages';

export const metadata: Metadata = {
  title: '바로 | 판례 검색',
  description: '바로 BaLaw 판례 검색 페이지입니다',
};

type SearchParams = {
  search_query?: string;
  sentencingDateStart?: string;
  sentencingDateEnd?: string;
  pageNumber: number;
  pageSize: number;
};

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const searchList = await searchParams;
  const { search_query } = searchList;

  const getData = async () => {
    const response = await getPrecedentSearchResults({
      keyword: search_query ?? null,
      ...searchList,
      pageSize: 10,
    });
    return response;
  };
  const payload = await getData();

  return (
    <>
      <PrecedentSearchResults content={payload.content} />
      <SetTotalElementsAndPages
        category="판례"
        precedentTotalElements={payload.totalElements}
        precedentTotalPages={payload.totalPages}
      />
    </>
  );
}
export default Page;
