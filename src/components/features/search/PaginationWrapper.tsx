'use client';
import { useSearch } from '@/context/SearchContext';
import Pagination from './Pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function PaginationWrapper() {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentPage = Number(params.get('pageNumber')) + 1;
  const [totalElements, setTotalElements] = useState<number>(0);
  const { totalLawElements, totalPrecedentElements } = useSearch();
  const [pageSize, setPageSize] = useState<number>(1);
  const [fixedTotalElements, setFixedTotalElements] = useState<number | null>(null);
  const [observerParams, setObserverParams] = useState<URLSearchParams | null>(null);

  // const totalResult = totalElements;
  useEffect(() => {
    const cloned = new URLSearchParams(params);
    cloned.delete('pageNumber');
    setObserverParams(cloned);
  }, [params]);

  console.log(params);
  useEffect(() => {
    if (pathname !== '/search/total') return;
    const calcTotalElements = totalLawElements + totalPrecedentElements;
    if (fixedTotalElements === null && calcTotalElements > 0) {
      setFixedTotalElements(calcTotalElements);
    }
  }, [totalPrecedentElements, totalLawElements, pathname, observerParams?.toString()]);

  useEffect(() => {
    if (pathname === '/search/total') {
      setTotalElements(fixedTotalElements ?? totalLawElements + totalPrecedentElements);
      // setTotalElements(totalLawElements + totalPrecedentElements);
      setPageSize(Math.max(totalLawElements, totalPrecedentElements));
    } else if (pathname === '/search/law') {
      setTotalElements(totalLawElements);
      setPageSize(totalLawElements);
    } else if (pathname === '/search/precedent') {
      setTotalElements(totalPrecedentElements);
      setPageSize(totalPrecedentElements);
    }
  }, [pathname, totalLawElements, totalPrecedentElements, fixedTotalElements]);

  return (
    <div className="flex flex-col items-center pb-6 gap-2">
      <Pagination end={Math.ceil(pageSize / 10)} currentPage={currentPage} />
      <p className="font-light text-sm">검색결과 : 총 {totalElements}건</p>
      {/* <p className="font-light text-sm">검색결과 : 총 {totalResult}건</p> */}
    </div>
  );
}
export default PaginationWrapper;
