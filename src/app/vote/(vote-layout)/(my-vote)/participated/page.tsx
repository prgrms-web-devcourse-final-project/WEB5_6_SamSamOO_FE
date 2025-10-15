'use client';

import VoteCard from '@/components/features/vote/VoteCard';
import GraphWrapper from '@/components/features/vote/GraphWrapper';
import { useParticipatedVotes } from '@/hooks/useParticipatedVotes';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

/**
 * ParticipatedPage
 * - 내가 참여한 투표 목록 페이지
 * - 진행중 + 마감 투표 혼합
 * - 반응형: 모바일에서는 간격 축소, 여백 줄임
 * - 무한스크롤 지원
 */
export default function ParticipatedPage() {
  const {
    data: votes = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useParticipatedVotes();

  // Intersection Observer로 다음 페이지 로딩
  const loadMoreRef = useIntersectionObserver(
    () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    !!hasNextPage,
    '200px',
  );

  // 로딩 상태
  if (status === 'pending')
    return <div className="py-32 sm:py-40 text-center text-base sm:text-lg">불러오는 중...</div>;

  // 오류 처리
  if (status === 'error')
    return (
      <div className="center-col py-32 sm:py-40 gap-3 text-center">
        <p className="text-red-500 font-bold text-base sm:text-lg">서버 오류가 발생했습니다.</p>
        <button
          onClick={() => refetch()}
          className="btn-primary text-sm sm:text-base px-4 py-2 rounded-full"
        >
          다시 시도
        </button>
      </div>
    );

  // 빈 목록 처리
  if (!votes.length)
    return (
      <div className="center-col py-32 sm:py-40 text-center">
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
          참여한 투표가 없습니다.
        </p>
      </div>
    );

  // 메인 렌더링
  return (
    <div className="center-col gap-15 pb-20 pt-10">
      {votes.map((post, index) => {
        const isSecondLast = index === votes.length - 2;

        return (
          <VoteCard key={post.id} ref={isSecondLast ? loadMoreRef : undefined} status={post.status}>
            {/* 제목 + 본문 */}
            <VoteCard.HeaderBody {...post} />

            {/* 마감된 투표만 그래프 표시 */}
            {post.status === 'closed' && (
              <VoteCard.Graph status={post.status}>
                <GraphWrapper pollId={post.id} />
              </VoteCard.Graph>
            )}

            {/* 투표 옵션 */}
            <VoteCard.Options
              pollId={post.id}
              options={post.options}
              totalVotes={post.participants}
              status={post.status}
            />
          </VoteCard>
        );
      })}

      {/* 페이지 하단 로더 */}
      <div className="h-10 sm:h-12 flex items-center justify-center">
        {isFetchingNextPage && (
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">불러오는 중...</p>
        )}
        {!hasNextPage && (
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            모든 투표를 불러왔습니다.
          </p>
        )}
      </div>
    </div>
  );
}
