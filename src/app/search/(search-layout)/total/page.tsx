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
  console.log(searchList);

  const getLawData = async () => {
    const response = await getLawSearchResults({
      lawName: search_query ?? null,
      lawField,
      ministry,
      promulgationDateStart,
      promulgationDateEnd,
      enforcementDateStart,
      enforcementDateEnd,
      pageNumber,
      pageSize: 5,
    });
    return response;
  };
  const lawPayload = await getLawData();
  console.log('법령 개수 : ', lawPayload.totalElements);

  const getPrecedentData = async () => {
    const response = await getPrecedentSearchResults({
      keyword: search_query ?? null,
      sentencingDateStart,
      sentencingDateEnd,
      pageNumber,
      pageSize: 5,
    });
    return response;
  };
  const precedentPayload = await getPrecedentData();
  console.log('판례 개수 : ', precedentPayload.totalElements);

  return (
    <div>
      <LawSearchResults
        content={lawPayload.content}
        showTag={true}
        totalElements={lawPayload.totalElements}
        totalPages={lawPayload.totalPages}
      />
      <PrecedentSearchResults
        content={precedentPayload.content}
        showTag={true}
        totalElements={precedentPayload.totalElements}
        totalPages={precedentPayload.totalPages}
      />
    </div>
  );
}
export default Page;
