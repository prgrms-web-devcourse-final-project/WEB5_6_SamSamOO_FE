'use client';

function SidebarSkeleton() {
  return (
    <aside className="hidden sm:flex flex-col w-[366px] border-r dark:border-border-gray1 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-3 py-10 mb-12 px-8 border-b">
        <div className="w-8 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* TOC skeleton */}
      <div className="flex-1 h-[calc(100dvh-460px)] overflow-y-scroll px-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3 mb-6">
            <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded ml-4" />
            <div className="h-3 w-2/5 bg-gray-200 dark:bg-gray-700 rounded ml-4" />
          </div>
        ))}
      </div>

      {/* MetadataGrid skeleton */}
      <div className="w-full px-8 py-10 border-t dark:border-border-gray1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between py-2">
            <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default SidebarSkeleton;
