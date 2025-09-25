'use client';
import { usePathname, useRouter } from 'next/navigation';

import { categoryItems } from './navigationItems';
import SearchInput from './SearchInput';
import SearchFilter from './SearchFilter';

function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const category = categoryItems.filter((item) => item.href === pathname)[0].label;
  // console.log(category);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector<HTMLInputElement>('#search')!;
    const keyword = input.value.trim();
    console.log(keyword);

    router.push(`${pathname}?q=${keyword}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pl-7 pr-2 py-2 mb-4  flex w-full gap-2 items-center justify-between text-lg shadow-[0_4px_10.8px_0_rgba(0,0,0,0.25)] rounded-modal dark:bg-primary-black dark:border dark:border-border-gray1 dark:shadow-[0_4px_10.8px_0_rgba(0,0,0,0.97)]"
    >
      {/* 필터 */}
      <SearchFilter category={category} />
      <SearchInput />
    </form>
  );
}
export default SearchForm;
