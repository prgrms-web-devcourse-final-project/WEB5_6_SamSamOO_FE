import { Metadata } from 'next';

import LawSearchResults from '@/components/features/search/LawSearchResults';
import SetTotalElementsAndPages from '@/components/features/search/SetTotalElementsAndPages';
import { getLawSearchResults } from '@/api/search/getLawSearchResults';

export const metadata: Metadata = {
  title: '바로 | 법령 검색',
  description: '바로 BaLaw 판례 검색 페이지입니다',
};

type SearchParams = {
  search_query?: string;
  lawField?: string;
  ministry?: string;
  promulgationDateStart?: string;
  promulgationDateEnd?: string;
  enforcementDateStart?: string;
  enforcementDateEnd?: string;
  pageNumber: number;
  pageSize: number;
};

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const searchList = await searchParams;
  const { search_query } = searchList;

  const response = await getLawSearchResults({
    lawName: search_query ?? null,
    ...searchList,
    pageSize: 10,
  });
  const payload = await response;

  return (
    <>
      <LawSearchResults content={payload.content} />
      <SetTotalElementsAndPages
        category="법령"
        lawTotalElements={payload.totalElements}
        lawTotalPages={payload.totalPages}
      />
    </>
  );
}
export default Page;
