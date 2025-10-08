'use client';
import { clamp } from '@/utils/date';
import makeSearchUrl from '@/utils/makeSearchUrl';
import tw from '@/utils/tw';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SkipPage from '@/assets/icons/skipPage.svg';
import MovePage from '@/assets/icons/movePage.svg';

interface Props {
  showCount?: number;
  end?: number;
  currentPage?: number;
}

// 첫 끝 페이지일때 prev,next 버튼 스타일 흐리기
function Pagination({ showCount = 5, end = 10, currentPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [activePageNumber, setActivePageNumber] = useState<number>(1);
  showCount = showCount > end ? end : showCount;
  const maxStart = Math.max(1, end - showCount + 1);
  const half = Math.floor(showCount / 2);
  const start = clamp(activePageNumber - half, 1, maxStart);

  useEffect(() => {
    setActivePageNumber(currentPage ?? 1);
  }, [currentPage]);

  const getPage = (index: number) => {
    setActivePageNumber(index);
  };

  useEffect(() => {
    const url = makeSearchUrl(pathname, params, { pageNumber: String(activePageNumber - 1) });
    router.push(url);
  }, [activePageNumber]);

  const prevPage = Math.max(1, activePageNumber - 1);
  const nextPage = Math.min(end, activePageNumber + 1);

  return (
    <section>
      <h2 className="sr-only">페이지네이션</h2>
      <ul className="flex items-center gap-4">
        <button
          type="button"
          title="첫 페이지로 이동"
          inert={activePageNumber === 1}
          onClick={() => getPage(1)}
        >
          <SkipPage className="relative bottom-0.5" />
        </button>
        <button
          type="button"
          title="이전 페이지로 이동"
          inert={activePageNumber === 1}
          className={tw('inset')}
          onClick={() => getPage(prevPage)}
        >
          <MovePage className="relative bottom-0.5 w-2 h-[10]" />
        </button>
        {Array(showCount)
          .fill(null)
          .map((_, index) => (
            <li key={index}>
              <button
                type="button"
                className={tw(
                  'w-6 hover:bg-stone-100 rounded-full ',
                  activePageNumber === start + index ? 'text-brand-accent' : '',
                )}
                onClick={() => getPage(start + index)}
              >
                <p className="relative top-0.5">{start + index}</p>
              </button>
            </li>
          ))}
        <button
          type="button"
          title="다음 페이지로 이동"
          inert={activePageNumber === end}
          onClick={() => getPage(nextPage)}
        >
          <MovePage className="relative bottom-0.5 -scale-x-100 w-2 h-[10]" />
        </button>
        <button
          type="button"
          title="마지막 페이지로 이동"
          inert={activePageNumber === end}
          onClick={() => getPage(end)}
        >
          <SkipPage className="relative bottom-0.5 -scale-x-100" />
        </button>
      </ul>
    </section>
  );
}
export default Pagination;
