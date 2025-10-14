import { Metadata } from 'next';

import LawSearchResults from '@/components/features/search/LawSearchResults';
import PrecedentSearchResults from '@/components/features/search/PrecedentSearchResults';
import { getPrecedentSearchResults } from '@/api/search/getPrecedentSearchResults';
import { getLawSearchResults } from '@/api/search/getLawSearchResults';
import SetTotalElementsAndPages from '@/components/features/search/SetTotalElementsAndPages';
// import LawSearchResultsClient from '@/components/features/search/LawSearchResultsClient';
// import PrecedentDetailResult from '@/components/features/detail/PrecedentDetailResult';
// import PrecedentSearchResultsClient from '@/components/features/search/PrecedentSerarchResultsClient';

export const metadata: Metadata = {
  title: '바로 | 통합 검색',
  description: '바로 BaLaw 법령 판례 검색 페이지입니다',
};

type SearchParams = {
  search_query?: string;

  lawField?: string;
  ministry?: string;
  promulgationDateStart?: string;
  promulgationDateEnd?: string;
  enforcementDateStart?: string;
  enforcementDateEnd?: string;

  sentencingDateStart?: string;
  sentencingDateEnd?: string;

  pageNumber: number;
  pageSize: number;

  law?: string;
  precedent?: string;
};

async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const searchList = await searchParams;
  const {
    search_query,
    lawField,
    ministry,
    promulgationDateStart,
    promulgationDateEnd,
    enforcementDateStart,
    enforcementDateEnd,
    sentencingDateStart,
    sentencingDateEnd,
    pageNumber,
  } = searchList;
  const PAGE_SIZE = 5;

  const getLawData = async () => {
    const response = await getLawSearchResults({
      lawName: search_query ?? null,
      lawField,
      ministry,
      promulgationDateStart,
      promulgationDateEnd,
      enforcementDateStart,
      enforcementDateEnd,
      pageNumber: pageNumber ?? 0,
      pageSize: PAGE_SIZE,
    });
    // console.log('통합 법령 : ', response);
    return response;
  };

  // console.log('법령 개수 : ', lawPayload.totalElements);
  // console.log('법령 페이지 수 : ', lawPayload.totalPages);

  const getPrecedentData = async () => {
    const response = await getPrecedentSearchResults({
      keyword: search_query ?? null,
      sentencingDateStart,
      sentencingDateEnd,
      pageNumber: pageNumber ?? 0,
      pageSize: PAGE_SIZE,
    });
    // console.log('판례 법령 : ', response);
    return response;
  };
  // console.time('서버 패칭 전체');
  const [lawPayload, precedentPayload] = await Promise.all([getLawData(), getPrecedentData()]);
  // console.timeEnd('서버 패칭 전체');

  // console.log('판례 개수 : ', precedentPayload.totalElements);
  // console.log('판례 페이지 수 : ', precedentPayload.totalPages);

  if (
    (!lawPayload && !precedentPayload) ||
    (lawPayload.content.length === 0 && precedentPayload.content.length === 0)
  ) {
    return (
      <>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold mb-3">검색 결과가 없습니다.</h1>
          <p className="text-gray-500">입력하신 조건에 맞는 결과가 존재하지 않습니다.</p>
        </div>
        <SetTotalElementsAndPages
          category="통합"
          lawTotalElements={0}
          lawTotalPages={0}
          precedentTotalElements={0}
          precedentTotalPages={0}
        />
      </>
    );
  }

  return (
    <div>
      {/* <LawSearchResultsClient content={lawPayload.content} showTag={true} /> */}
      {/* <PrecedentSearchResultsClient content={precedentPayload.content} showTag={true} /> */}
      <LawSearchResults content={lawPayload.content} showTag={true} />
      <PrecedentSearchResults content={precedentPayload.content} showTag={true} />
      <SetTotalElementsAndPages
        category="통합"
        lawTotalElements={lawPayload.totalElements}
        lawTotalPages={lawPayload.totalPages}
        precedentTotalElements={precedentPayload.totalElements}
        precedentTotalPages={precedentPayload.totalPages}
      />
    </div>
  );
}
export default Page;
