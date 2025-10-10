import DetailContentSkeleton from '@/components/features/detail/DetailContentSkeleton';
import SidebarSkeleton from '@/components/features/detail/SidebarSkeleton';

function Loading() {
  return (
    <div className="flex flex-row bg-background-white dark:bg-background-black1 h-full">
      <SidebarSkeleton />
      <DetailContentSkeleton />
    </div>
  );
}
export default Loading;
