import { Metadata } from 'next';

import LawSearchResults from '@/components/features/search/LawSearchResults';
import PrecedentSearchResults from '@/components/features/search/PrecedentSearchResults';
import { getPrecedentSearchResults } from '@/api/getPrecedentSearchResults';
import { getLawSearchResults } from '@/api/getLawSearchResults';
import SetTotalElementsAndPages from '@/components/features/search/SetTotalElementsAndPages';

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
    // law,
    // precedent,
  } = searchList;
  // const PAGE_SIZE = law === 'false' || precedent === 'false' ? 10 : 5;
  const PAGE_SIZE = 5;
  // console.log(searchList);

  const getLawData = async () => {
    // if (law === 'false') return { content: [], totalElements: 0, totalPages: 0 };
    const response = await getLawSearchResults({
      lawName: search_query ?? null,
      lawField,
      ministry,
      promulgationDateStart,
      promulgationDateEnd,
      enforcementDateStart,
      enforcementDateEnd,
      pageNumber,
      pageSize: PAGE_SIZE,
    });
    return response;
  };

  const lawPayload = await getLawData();
  // console.log('법령 개수 : ', lawPayload.totalElements);
  // console.log('법령 페이지 수 : ', lawPayload.totalPages);

  const getPrecedentData = async () => {
    // if (precedent === 'false') return { content: [], totalElements: 0, totalPages: 0 };
    const response = await getPrecedentSearchResults({
      keyword: search_query ?? null,
      sentencingDateStart,
      sentencingDateEnd,
      pageNumber,
      pageSize: PAGE_SIZE,
    });
    return response;
  };
  const precedentPayload = await getPrecedentData();

  // console.log('판례 개수 : ', precedentPayload.totalElements);
  // console.log('판례 페이지 수 : ', precedentPayload.totalPages);

  return (
    <div>
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
