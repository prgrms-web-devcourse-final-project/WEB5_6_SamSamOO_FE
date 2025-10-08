function Loading() {
  return (
    <div className="h-[80vh] w-full center-col gap-6 p-5">
      <div className="w-[80%] center-row overflow-y-auto">
        <div className="w-full flex h-[50vh] flex-col items-end">
          <div className="animate-pulse">
            {/* 스켈레톤 UI */}
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
      <div className="w-[80%] h-[50px] bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}
export default Loading;
