'use client';

function DetailContentSkeleton() {
  return (
    <section className="flex flex-1 justify-center sm:px-25 py-10 animate-pulse">
      <div className="w-full max-w-[1200px] px-8">
        {/* 제목 영역 */}
        <header className="pb-10">
          <div className="flex gap-3 items-center mb-5 flex-wrap">
            <div className="w-10 h-5 bg-gray-300 dark:bg-gray-700 rounded-2xl" />{' '}
            <div className="w-2/3 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="flex flex-wrap gap-5 text-xl font-normal">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 w-1/5 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </header>

        {/* 본문 */}
        <article className="space-y-10">
          {Array.from({ length: 10 }).map((_, sectionIdx) => (
            <div key={sectionIdx}>
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-4" />{' '}
              {Array.from({ length: 8 }).map((_, lineIdx) => (
                <div
                  key={lineIdx}
                  className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"
                />
              ))}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

export default DetailContentSkeleton;
