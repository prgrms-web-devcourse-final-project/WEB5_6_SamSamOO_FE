'use client';
import { useSearch } from '@/context/SearchContext';
import Pagination from './Pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

function PaginationWrapper() {
  const pathname = usePathname();
  const params = useSearchParams();
  const currentPage = Number(params.get('pageNumber')) + 1;
  const [totalElements, setTotalElements] = useState<number>(0);
  const { totalLawElements, totalPrecedentElements } = useSearch();
  const [pageSize, setPageSize] = useState<number>(1);
  const [fixedTotalElements, setFixedTotalElements] = useState<number | null>(null);

  const prevFilter = useRef<string>('');

  useEffect(() => {
    if (pathname !== '/search/total') return;

    const cloned = new URLSearchParams(Array.from(params.entries()));
    cloned.delete('pageNumber');
    const currentFilter = cloned.toString();

    const calcTotalElements = totalLawElements + totalPrecedentElements;

    if (fixedTotalElements === null && calcTotalElements > 0) {
      setFixedTotalElements(calcTotalElements);
      prevFilter.current = currentFilter;
      return;
    }

    if (prevFilter.current !== currentFilter) {
      setFixedTotalElements(calcTotalElements);
      prevFilter.current = currentFilter;
    }
  }, [pathname, totalLawElements, totalPrecedentElements, fixedTotalElements]);

  console.log('통합검색결과수 : ', fixedTotalElements);
  useEffect(() => {
    if (pathname === '/search/total') {
      setTotalElements(fixedTotalElements ?? totalLawElements + totalPrecedentElements);
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
    </div>
  );
}
export default PaginationWrapper;
