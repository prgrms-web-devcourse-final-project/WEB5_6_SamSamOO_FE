'use client';
import VoteCard from '@/components/features/vote/VoteCard';
import { useOngoingVotes } from '@/hooks/useOngoingVotes';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function OngoingPage() {
  const {
    data: votes = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useOngoingVotes();

  const loadMoreRef = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    !!hasNextPage,
    '200px',
  );

  if (status === 'pending') return <div className="py-40 text-center">불러오는 중...</div>;

  if (status === 'error')
    return (
      <div className="center-col py-40 gap-3 text-center">
        <p className="text-red-500 font-bold">서버 오류가 발생했습니다.</p>
        <button onClick={() => refetch()} className="btn-primary">
          다시 시도
        </button>
      </div>
    );

  if (!votes.length)
    return (
      <div className="center-col py-40 text-center">
        <p>현재 진행 중인 투표가 없습니다.</p>
      </div>
    );

  return (
    <div className="center-col gap-15 pb-20 pt-10">
      {votes.map((post, index) => {
        const isSecondLast = index === votes.length - 2;

        return (
          <VoteCard key={post.id} ref={isSecondLast ? loadMoreRef : undefined} status={post.status}>
            <VoteCard.HeaderBody {...post} />

            <VoteCard.Options
              pollId={post.id}
              options={post.options}
              totalVotes={post.participants}
            />
          </VoteCard>
        );
      })}

      <div className="h-12 flex items-center justify-center">
        {isFetchingNextPage && <p>불러오는 중...</p>}
        {!hasNextPage && <p className="text-gray-500">모든 투표를 불러왔습니다.</p>}
      </div>
    </div>
  );
}
