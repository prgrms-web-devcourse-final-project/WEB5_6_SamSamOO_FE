'use client';
import { useSearch } from '@/context/SearchContext';
import Pagination from './Pagination';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function PaginationWrapper() {
  const pathname = usePathname();
  const [totalElements, setTotalElements] = useState<number>(0);
  const { totalLawElements, totalPrecedentElements } = useSearch();

  useEffect(() => {
    if (pathname === '/search/total') {
      setTotalElements(totalLawElements + totalPrecedentElements);
    } else if (pathname === '/search/law') {
      setTotalElements(totalLawElements);
    } else if (pathname === '/search/precedent') {
      setTotalElements(totalPrecedentElements);
    }
  }, [pathname, totalLawElements, totalPrecedentElements]);

  return (
    <div className="flex flex-col items-center pb-6 gap-2">
      <Pagination end={Math.ceil(totalElements / 10)} />
      <p className="font-light text-sm">검색결과 : 총 {totalElements}건</p>
    </div>
  );
}
export default PaginationWrapper;
