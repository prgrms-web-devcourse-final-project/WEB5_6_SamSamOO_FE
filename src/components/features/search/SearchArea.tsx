'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import AppliedFilter from '@/components/features/search/AppliedFilter';
import { categoryItems } from './navigationItems';
import SearchInput from './SearchInput';
import SearchFilter from './SearchFilter';
import { useState } from 'react';
import makeSearchUrl from '@/utils/makeSearchUrl';

function SearchArea() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newParams = new URLSearchParams(searchParams);
  newParams.delete('pageNumber');
  const [appliedFilterText, setAppliedFilterText] = useState<string>('');
  const category = categoryItems.filter((item) => pathname.includes(item.href))[0].label;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector<HTMLInputElement>('#search')!;
    const keyword = input.value.trim();
    console.log(keyword);

    const url = makeSearchUrl(pathname, newParams, { search_query: keyword });
    router.push(url);
    input.value = '';
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-5 pl-7 pr-2 py-2 mb-4 flex gap-2 items-center justify-between text-lg shadow-[0_4px_10.8px_0_rgba(0,0,0,0.25)] rounded-modal dark:bg-primary-black dark:border dark:border-border-gray1 dark:shadow-[0_4px_10.8px_0_rgba(0,0,0,0.97)]"
      >
        {/* 필터 */}
        <SearchFilter category={category} setAppliedFilterText={setAppliedFilterText} />
        <SearchInput />
      </form>
      <AppliedFilter appliedFilterText={appliedFilterText} />
    </>
  );
}
export default SearchArea;
