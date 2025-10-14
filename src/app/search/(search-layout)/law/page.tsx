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

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const searchList = await searchParams;
  const { search_query } = searchList;

  const payload = await getLawSearchResults({
    lawName: search_query ?? null,
    ...searchList,
    pageNumber: searchList.pageNumber ?? 0,
    pageSize: 10,
  });

  if (!payload || payload.content.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-bold mb-3">검색 결과가 없습니다.</h1>
          <p className="text-gray-500">입력하신 조건에 맞는 법령이 존재하지 않습니다.</p>
        </div>
        <SetTotalElementsAndPages
          category="법령"
          precedentTotalElements={0}
          precedentTotalPages={0}
        />
      </>
    );
  }

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
