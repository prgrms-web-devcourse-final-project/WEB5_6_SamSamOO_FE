import { Metadata } from 'next';

import LawSearchResults from '@/components/features/search/LawSearchResults';

import { getLawSearchResults } from '@/api/getLawSearchResults';

export const metadata: Metadata = {
  title: '바로 | 법령 검색',
  description: '바로 BaLaw 판례 검색 페이지입니다',
};

type searchParams = {
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

async function Page({ searchParams }: { searchParams: Promise<searchParams> }) {
  const searchList = await searchParams;
  const { search_query } = searchList;

  const getData = async () => {
    const response = await getLawSearchResults({
      lawName: search_query ?? null,
      ...searchList,
      pageSize: 10,
    });
    return response;
  };
  const payload = await getData();
  console.log(payload);

  return (
    <>
      <LawSearchResults
        content={payload.content}
        totalElements={payload.totalElements}
        totalPages={payload.pageNumber}
      />
    </>
  );
}
export default Page;
