function SearchSkeleton() {
  return (
    <ul className="px-5 animate-pulse">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="mb-10 w-full">
          {/* 제목 영역 */}
          <section className="flex items-center space-x-2 mb-2">
            <div className="h-5 w-10 bg-gray-300 dark:bg-stone-800 rounded-full" />
            <div className="h-5 w-28 bg-gray-300 dark:bg-stone-800 rounded" />
            <div className="h-5 w-2/3 bg-gray-200 dark:bg-stone-700 rounded" />
          </section>

          {/* 본문 요약 */}
          <p className="h-4 w-full bg-gray-200 dark:bg-stone-800 rounded mb-2" />
          <p className="h-4 w-5/6 bg-gray-200 dark:bg-stone-800 rounded mb-3" />

          {/* 날짜 영역 */}
          <section className="flex gap-2">
            <div className="h-3 w-32 bg-gray-200 dark:bg-stone-800 rounded" />
          </section>
        </li>
      ))}
    </ul>
  );
}
export default SearchSkeleton;
