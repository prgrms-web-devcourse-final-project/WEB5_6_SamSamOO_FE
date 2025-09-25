'use client';
function SearchInput() {
  return (
    <label className="gap-2 flex items-center justify-between w-full shadow-[0_3px_12.9px_0_rgba(0,0,0,0.25)_inset] rounded-l-[20px] rounded-r-modal">
      <input
        type="search"
        id="search"
        placeholder="검색어를 입력하세요"
        className="px-4 py-3 w-full"
      />
      <button type="submit" className="w-6 h-6 mr-4">
        <img src="/icons/search.svg" alt="search" />
      </button>
    </label>
  );
}
export default SearchInput;
