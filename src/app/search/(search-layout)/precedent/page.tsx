import { Metadata } from 'next';

import PrecedentSearchResults from '@/components/features/search/PrecedentSearchResults';
import SetTotalElementsAndPages from '@/components/features/search/SetTotalElementsAndPages';
import { getPrecedentSearchResults } from '@/api/search/getPrecedentSearchResults';

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

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const searchList = await searchParams;
  const { search_query } = searchList;

  const payload = await getPrecedentSearchResults({
    keyword: search_query ?? null,
    ...searchList,
    pageNumber: searchList.pageNumber ?? 0,
    pageSize: 10,
  });

  if (!payload || payload.content.length === 0) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold mb-3">검색 결과가 없습니다.</h1>
          <p className="text-gray-500">입력하신 조건에 맞는 판례가 존재하지 않습니다.</p>
        </div>
        <SetTotalElementsAndPages
          category="판례"
          precedentTotalElements={0}
          precedentTotalPages={0}
        />
      </>
    );
  }

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
