'use client';
import { useSearch } from '@/context/SearchContext';
import Pagination from './Pagination';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

function PaginationWrapper() {
  const pathname = usePathname();
  const params = useSearchParams();
  const paramPage = params.get('pageNumber');
  const currentPage =
    paramPage !== null && !Number.isNaN(Number(paramPage)) ? Number(paramPage) + 1 : 0;
  const [pageSize, setPageSize] = useState<number>(1);
  const prevFilter = useRef<string>('');
  const filterChanged = useRef<boolean>(false);
  const resetAfterCategoryChange = useRef<boolean>(false);
  const {
    totalLawElements,
    totalPrecedentElements,
    totalElements,
    initTotalElements,
    fixedTotalElements,
    setFixedTotalElements,
  } = useSearch();
  // console.log('totalLaw : ', totalLawElements);

  const filterKey = useMemo(() => {
    const cloned = new URLSearchParams(Array.from(params.entries()));
    cloned.delete('pageNumber');
    return cloned.toString();
  }, [params.toString()]);

  // 필터가 아예없는 상태일때 초기값 기록해두기
  useEffect(() => {
    if (pathname !== '/search/total') return;

    if (filterKey.length === 0 && totalElements > 0) {
      initTotalElements.current = totalElements;
    }
  }, [filterKey, totalElements]);

  // 카테고리 이동할 때 초기값으로 리셋
  useEffect(() => {
    if (pathname !== '/search/total') {
      setFixedTotalElements(initTotalElements.current);
      prevFilter.current = '';
      filterChanged.current = false;
      resetAfterCategoryChange.current = true;
    } else if (resetAfterCategoryChange.current) {
      resetAfterCategoryChange.current = false;
      prevFilter.current = filterKey;
    }
  }, [pathname, totalElements, filterKey]);

  // 필터가 변경됐는지(페이지 번호 제외)
  useEffect(() => {
    if (pathname !== '/search/total') return;
    if (resetAfterCategoryChange.current) return;

    // 초기 진입 시
    if (fixedTotalElements === null && totalElements > 0) {
      setFixedTotalElements(totalElements);
      prevFilter.current = filterKey;
      return;
    }

    // 필터 변경 시
    if (prevFilter.current !== filterKey) {
      prevFilter.current = filterKey;
      filterChanged.current = true;
    }
  }, [filterKey, pathname, totalElements]);

  // 필터가 변경된 경우 고정 값을 totalElements 값으로 최신화
  useEffect(() => {
    if (pathname !== '/search/total') return;
    if (!filterChanged.current) return;
    if (totalElements === 0) return;

    setFixedTotalElements(totalElements);
    filterChanged.current = false;
  }, [totalElements, pathname]);

  // 디버깅
  // useEffect(() => {
  //   console.log({
  //     pathname,
  //     fixedTotalElements,
  //     totalElements,
  //     init: initTotalElements.current,
  //     filterKey,
  //     prevFilter: prevFilter.current,
  //     filterChanged: filterChanged.current,
  //   });
  // }, [fixedTotalElements, totalElements, filterKey]);

  // 카테고리별 페이지 수
  useEffect(() => {
    if (pathname === '/search/total') {
      setPageSize(Math.max(totalLawElements, totalPrecedentElements));
    } else if (pathname === '/search/law') {
      setPageSize(totalLawElements);
    } else if (pathname === '/search/precedent') {
      setPageSize(totalPrecedentElements);
    }
  }, [pathname, totalLawElements, totalPrecedentElements]);

  // 카테고리별 총 결과수
  const total =
    pathname === '/search/total'
      ? (fixedTotalElements ?? totalElements)
      : pathname === '/search/law'
        ? totalLawElements
        : totalPrecedentElements;

  return (
    <div className="flex flex-col items-center pb-28 gap-2">
      <Pagination end={Math.ceil(pageSize / 10)} currentPage={currentPage} />
      <p className="font-light text-xs sm:text-sm">검색 결과 : 총 {total ?? 0}건</p>
    </div>
  );
}

export default PaginationWrapper;
