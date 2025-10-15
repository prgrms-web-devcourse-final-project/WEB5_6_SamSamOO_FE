'use client';
import Search from '@/assets/icons/search.svg';
function SearchInput() {
  return (
    <label className="gap-2 flex items-center justify-between w-full shadow-[0_3px_12.9px_0_rgba(0,0,0,0.25)_inset] outline-none rounded-l-[20px] rounded-r-modal dark:bg-primary-black dark:shadow-[0_4px_13px_0_rgba(0,0,0,0.84)_inset]">
      <input
        type="search"
        id="search"
        placeholder="검색어를 입력하세요"
        className="px-2 py-1.5 sm:px-4 sm:py-3 w-full text-sm sm:text-base"
      />
      <button type="submit" className="w-6 h-6 mr-4">
        <Search alt="검색" />
      </button>
    </label>
  );
}
export default SearchInput;
